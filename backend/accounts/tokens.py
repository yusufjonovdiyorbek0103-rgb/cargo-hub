"""Email verification and password reset token helpers."""
from django.contrib.auth.tokens import default_token_generator
from django.core.signing import BadSignature, SignatureExpired, TimestampSigner
from django.utils.encoding import force_bytes, force_str
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode

from .models import User


signer = TimestampSigner()


def generate_email_verification_token(user: User) -> str:
    """Return a signed token for email verification."""
    value = f"{user.id}:{user.email}"
    return signer.sign(value)


def verify_email_verification_token(token: str, max_age_seconds: int = 60 * 60 * 24 * 3) -> User | None:
    """
    Verify token and return user or None.
    max_age_seconds defaults to 3 days.
    """
    try:
        value = signer.unsign(token, max_age=max_age_seconds)
    except (BadSignature, SignatureExpired):
        return None

    try:
        user_id_str, email = value.split(":", 1)
        user_id = int(user_id_str)
    except (ValueError, TypeError):
        return None

    try:
        return User.objects.get(id=user_id, email=email)
    except User.DoesNotExist:
        return None


def generate_password_reset_token(user: User) -> tuple[str, str]:
    """Return (uid, token) for password reset."""
    uid = urlsafe_base64_encode(force_bytes(user.pk))
    token = default_token_generator.make_token(user)
    return uid, token


def verify_password_reset_token(uid: str, token: str) -> User | None:
    """Verify uid+token and return user or None."""
    try:
        user_id = force_str(urlsafe_base64_decode(uid))
        user = User.objects.get(pk=user_id)
    except (TypeError, ValueError, OverflowError, User.DoesNotExist):
        return None
    if default_token_generator.check_token(user, token):
        return user
    return None


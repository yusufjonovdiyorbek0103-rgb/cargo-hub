"""Account and auth views."""
from django.conf import settings
from django.core.mail import send_mail
from rest_framework import generics, status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.views import APIView

from .models import User
from .serializers import SignupSerializer, UserSerializer
from .tokens import (
    generate_email_verification_token,
    generate_password_reset_token,
    verify_email_verification_token,
    verify_password_reset_token,
)
from notifications.services import queue_email_verification, queue_profile_updated


class SignupView(generics.CreateAPIView):
    """POST /api/auth/signup - Create new user account."""

    permission_classes = [AllowAny]
    serializer_class = SignupSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        is_console_email = "console" in settings.EMAIL_BACKEND
        if is_console_email:
            user.is_email_verified = True
            user.save(update_fields=["is_email_verified"])
        else:
            token = generate_email_verification_token(user)
            frontend_url = getattr(settings, "FRONTEND_URL", request.build_absolute_uri("/")).rstrip("/")
            verification_url = f"{frontend_url}/verify-email?token={token}"
            queue_email_verification(user.id, user.email, verification_url)

        return Response(
            {
                "id": user.id,
                "email": user.email,
                "full_name": user.full_name,
                "roles": user.roles,
                "reviewer_status": user.reviewer_status,
                "editor_status": user.editor_status,
                "message": "Account created." if is_console_email else "Account created. Check your email to verify your address.",
            },
            status=status.HTTP_201_CREATED,
        )


class MeView(generics.RetrieveUpdateAPIView):
    """GET /api/me - Retrieve current user. PATCH /api/me - Update profile."""

    permission_classes = [IsAuthenticated]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user

    def perform_update(self, serializer):
        user = self.request.user
        tracked_fields = ["full_name", "affiliation", "country", "orcid_id", "google_scholar_url"]
        before = {field: getattr(user, field, "") for field in tracked_fields}

        serializer.save()

        changed_fields = []
        for field in tracked_fields:
            old_value = (before.get(field) or "").strip() if isinstance(before.get(field), str) else before.get(field)
            new_raw = getattr(user, field, "")
            new_value = (new_raw or "").strip() if isinstance(new_raw, str) else new_raw
            if old_value != new_value:
                changed_fields.append(field)

        if changed_fields:
            queue_profile_updated(
                user_id=user.id,
                to_email=user.email,
                roles=user.roles or [],
                changed_fields=changed_fields,
            )


class VerifyEmailView(APIView):
    """Verify email address (supports GET with query or POST with body)."""

    permission_classes = [AllowAny]

    def _handle(self, token: str | None):
        if not token:
            return Response(
                {"detail": "Missing token."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        user = verify_email_verification_token(token)
        if not user:
            return Response(
                {"detail": "Invalid or expired token."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if not user.is_email_verified:
            user.is_email_verified = True
            user.save(update_fields=["is_email_verified"])

        return Response(
            {
                "message": "Email verified successfully.",
                "email": user.email,
            },
            status=status.HTTP_200_OK,
        )

    def get(self, request, *args, **kwargs):
        """GET /api/auth/verify-email?token=..."""
        token = request.query_params.get("token")
        return self._handle(token)

    def post(self, request, *args, **kwargs):
        """POST /api/auth/verify-email with JSON body {\"token\": \"...\"}."""
        token = request.data.get("token")
        return self._handle(token)


class ResendVerificationEmailView(APIView):
    """POST /api/auth/resend-verification - resend verification email."""

    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        email = request.data.get("email", "").strip().lower()
        if not email:
            return Response(
                {"detail": "Email is required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            user = User.objects.get(email__iexact=email)
        except User.DoesNotExist:
            # Do not reveal whether email exists
            return Response(
                {"message": "If an account exists for this email, a verification message has been sent."},
                status=status.HTTP_200_OK,
            )

        if user.is_email_verified:
            return Response(
                {"message": "Email is already verified."},
                status=status.HTTP_200_OK,
            )

        token = generate_email_verification_token(user)
        frontend_url = getattr(settings, "FRONTEND_URL", request.build_absolute_uri("/")).rstrip("/")
        verification_url = f"{frontend_url}/verify-email?token={token}"
        queue_email_verification(user.id, user.email, verification_url)

        return Response(
            {"message": "Verification email sent."},
            status=status.HTTP_200_OK,
        )


class PasswordResetRequestView(APIView):
    """POST /api/auth/password-reset - Request password reset email."""

    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        email = (request.data.get("email") or "").strip().lower()
        if not email:
            return Response(
                {"detail": "Email is required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        response_msg = {"message": "If an account exists for this email, a password reset link has been sent."}

        try:
            user = User.objects.get(email__iexact=email)
        except User.DoesNotExist:
            return Response(response_msg, status=status.HTTP_200_OK)

        uid, token = generate_password_reset_token(user)
        frontend_url = getattr(settings, "FRONTEND_URL", request.build_absolute_uri("/")).rstrip("/")
        reset_url = f"{frontend_url}/reset-password?uid={uid}&token={token}"

        send_mail(
            subject="Password Reset - CAJAIDT",
            message=(
                f"Hello {user.full_name},\n\n"
                f"You requested a password reset. Click the link below to set a new password:\n\n"
                f"{reset_url}\n\n"
                f"This link expires in 24 hours. If you did not request this, ignore this email.\n\n"
                f"Best regards,\nCAJAIDT Editorial Office"
            ),
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[user.email],
            fail_silently=True,
        )

        return Response(response_msg, status=status.HTTP_200_OK)


class PasswordResetConfirmView(APIView):
    """POST /api/auth/password-reset-confirm - Set new password with token."""

    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        uid = request.data.get("uid", "")
        token = request.data.get("token", "")
        new_password = request.data.get("new_password", "")

        if not uid or not token or not new_password:
            return Response(
                {"detail": "uid, token, and new_password are required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        user = verify_password_reset_token(uid, token)
        if not user:
            return Response(
                {"detail": "Invalid or expired reset link."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        from django.contrib.auth.password_validation import validate_password
        from django.core.exceptions import ValidationError as DjangoValidationError
        try:
            validate_password(new_password, user=user)
        except DjangoValidationError as e:
            return Response(
                {"detail": " ".join(e.messages)},
                status=status.HTTP_400_BAD_REQUEST,
            )

        user.set_password(new_password)
        user.save(update_fields=["password"])

        return Response(
            {"message": "Password has been reset successfully. You can now log in."},
            status=status.HTTP_200_OK,
        )


class ChangePasswordView(APIView):
    """POST /api/auth/change-password - Change password for authenticated user."""

    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        current_password = request.data.get("current_password", "")
        new_password = request.data.get("new_password", "")

        if not current_password or not new_password:
            return Response(
                {"detail": "current_password and new_password are required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if not request.user.check_password(current_password):
            return Response(
                {"detail": "Current password is incorrect."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        from django.contrib.auth.password_validation import validate_password
        from django.core.exceptions import ValidationError as DjangoValidationError
        try:
            validate_password(new_password, user=request.user)
        except DjangoValidationError as e:
            return Response(
                {"detail": " ".join(e.messages)},
                status=status.HTTP_400_BAD_REQUEST,
            )

        request.user.set_password(new_password)
        request.user.save(update_fields=["password"])
        return Response({"detail": "Password changed successfully."})


# Re-export JWT views for URL wiring
LoginView = TokenObtainPairView
RefreshView = TokenRefreshView

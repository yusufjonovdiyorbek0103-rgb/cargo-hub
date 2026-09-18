"""Account and auth URL routes."""
from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from .jwt_serializers import CustomTokenObtainPairSerializer
from .views import (
    ChangePasswordView,
    MeView,
    PasswordResetConfirmView,
    PasswordResetRequestView,
    SignupView,
    VerifyEmailView,
    ResendVerificationEmailView,
)


class CustomTokenObtainPairView(TokenObtainPairView):
    """Login view with custom token payload (user_id, roles)."""
    serializer_class = CustomTokenObtainPairSerializer


urlpatterns = [
    path("auth/signup", SignupView.as_view(), name="auth-signup"),
    path("auth/login", CustomTokenObtainPairView.as_view(), name="auth-login"),
    path("auth/refresh", TokenRefreshView.as_view(), name="auth-refresh"),
    path("auth/verify-email", VerifyEmailView.as_view(), name="auth-verify-email"),
    path("auth/resend-verification", ResendVerificationEmailView.as_view(), name="auth-resend-verification"),
    path("auth/password-reset", PasswordResetRequestView.as_view(), name="auth-password-reset"),
    path("auth/password-reset-confirm", PasswordResetConfirmView.as_view(), name="auth-password-reset-confirm"),
    path("auth/change-password", ChangePasswordView.as_view(), name="auth-change-password"),
    path("me", MeView.as_view(), name="me"),
]

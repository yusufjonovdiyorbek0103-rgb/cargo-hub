"""
API URL routes.
"""
from django.core.mail import send_mail
from django.conf import settings
from django.http import JsonResponse
from django.urls import path, include
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView


def api_root(request):
    """API root."""
    return JsonResponse({"message": "CAJAIDT API", "version": "1.0"})


class ContactFormView(APIView):
    """POST /api/contact/ - Public contact form."""
    permission_classes = [AllowAny]

    def post(self, request):
        name = (request.data.get("name") or "").strip()
        email = (request.data.get("email") or "").strip()
        subject = (request.data.get("subject") or "").strip()
        message = (request.data.get("message") or "").strip()

        if not name or not email or not message:
            return Response(
                {"detail": "Name, email, and message are required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            send_mail(
                subject=f"[CAJAIDT Contact] {subject or 'General Inquiry'}",
                message=f"From: {name} <{email}>\n\n{message}",
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[settings.DEFAULT_FROM_EMAIL],
                fail_silently=True,
            )
        except Exception:
            pass

        return Response({"detail": "Message received. We will get back to you soon."})


urlpatterns = [
    path("", api_root),
    path("", include("accounts.urls")),
    path("", include("integrations.urls")),
    path("", include("submissions.urls")),
    path("contact/", ContactFormView.as_view(), name="contact-form"),
    path("certificates/", include("notifications.urls")),
    path("reviewer/", include("reviews.urls")),
    path("editor/", include("editorial.urls")),
    path("editorial-board/", include("editorial_board.urls")),
    path("admin/", include("accounts.admin_urls")),
]

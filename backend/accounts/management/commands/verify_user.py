"""Management command to verify a user's email."""
from django.core.management.base import BaseCommand

from accounts.models import User


class Command(BaseCommand):
    help = "Mark a user's email as verified so they can log in."

    def add_arguments(self, parser):
        parser.add_argument("email", type=str)

    def handle(self, *args, **options):
        email = options["email"]
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            self.stderr.write(f"No user with email {email}")
            return

        if user.is_email_verified:
            self.stdout.write(f"{email} is already verified.")
            return

        user.is_email_verified = True
        user.save(update_fields=["is_email_verified"])
        self.stdout.write(f"Verified {email} successfully.")

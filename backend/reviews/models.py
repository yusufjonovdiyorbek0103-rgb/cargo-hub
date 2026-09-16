"""Review models."""
import secrets

from django.conf import settings
from django.db import models
from django.utils import timezone

from submissions.models import Submission, SubmissionVersion


STATUS_INVITED = "invited"
STATUS_ACCEPTED = "accepted"
STATUS_DECLINED = "declined"
STATUS_REVIEW_SUBMITTED = "review_submitted"
STATUS_EXPIRED = "expired"

ASSIGNMENT_STATUS_CHOICES = [
    (STATUS_INVITED, "Invited"),
    (STATUS_ACCEPTED, "Accepted"),
    (STATUS_DECLINED, "Declined"),
    (STATUS_REVIEW_SUBMITTED, "Review Submitted"),
    (STATUS_EXPIRED, "Expired"),
]

RECOMMENDATION_ACCEPT = "accept"
RECOMMENDATION_MINOR_REVISION = "minor_revision"
RECOMMENDATION_MAJOR_REVISION = "major_revision"
RECOMMENDATION_REJECT_RESUBMIT = "reject_resubmit"
RECOMMENDATION_REJECT = "reject"

RECOMMENDATION_CHOICES = [
    (RECOMMENDATION_ACCEPT, "Accept"),
    (RECOMMENDATION_MINOR_REVISION, "Accept with Minor Revisions"),
    (RECOMMENDATION_MAJOR_REVISION, "Major Revisions"),
    (RECOMMENDATION_REJECT_RESUBMIT, "Reject and Resubmit"),
    (RECOMMENDATION_REJECT, "Reject"),
]

RATING_CHOICES = [
    ("excellent", "Excellent"),
    ("good", "Good"),
    ("fair", "Fair"),
    ("poor", "Poor"),
    ("na", "N/A"),
]

CONFLICT_CHOICES = [
    ("none", "No conflict of interest"),
    ("potential", "Potential conflict exists"),
    ("yes", "Conflict of interest declared"),
]


def generate_invite_token():
    """Generate a secure token for email invite accept links."""
    return secrets.token_urlsafe(32)


class ReviewAssignment(models.Model):
    """Assignment of a reviewer to a submission (or invite by email)."""

    submission = models.ForeignKey(
        Submission,
        on_delete=models.CASCADE,
        related_name="review_assignments",
    )
    submission_version = models.ForeignKey(
        SubmissionVersion,
        on_delete=models.CASCADE,
        related_name="review_assignments",
    )
    reviewer = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="review_assignments",
    )
    invited_email = models.EmailField(blank=True)
    token = models.CharField(max_length=64, unique=True, default=generate_invite_token)

    status = models.CharField(
        max_length=20,
        choices=ASSIGNMENT_STATUS_CHOICES,
        default=STATUS_INVITED,
    )
    due_date = models.DateField(null=True, blank=True)
    invited_at = models.DateTimeField(auto_now_add=True)
    responded_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        db_table = "reviews_assignment"

    def __str__(self):
        reviewer_str = self.reviewer.email if self.reviewer else self.invited_email
        return f"{self.submission.title} <- {reviewer_str} ({self.status})"


def review_file_upload_path(instance, filename):
    return f"reviews/{instance.assignment_id}/{filename}"


class Review(models.Model):
    """Structured peer review with 10 evaluation criteria matching frontend form."""

    assignment = models.OneToOneField(
        ReviewAssignment,
        on_delete=models.CASCADE,
        related_name="review",
    )

    # Conflict of interest
    conflict_of_interest = models.CharField(max_length=20, choices=CONFLICT_CHOICES, default="none")
    conflict_details = models.TextField(blank=True)

    # 10 evaluation criteria
    relevance = models.CharField(max_length=10, choices=RATING_CHOICES, blank=True)
    originality = models.CharField(max_length=10, choices=RATING_CHOICES, blank=True)
    literature_review = models.CharField(max_length=10, choices=RATING_CHOICES, blank=True)
    methodology = models.CharField(max_length=10, choices=RATING_CHOICES, blank=True)
    results_validity = models.CharField(max_length=10, choices=RATING_CHOICES, blank=True)
    discussion_quality = models.CharField(max_length=10, choices=RATING_CHOICES, blank=True)
    ethical_compliance = models.CharField(max_length=10, choices=RATING_CHOICES, blank=True)
    reference_quality = models.CharField(max_length=10, choices=RATING_CHOICES, blank=True)
    writing_clarity = models.CharField(max_length=10, choices=RATING_CHOICES, blank=True)
    overall_merit = models.CharField(max_length=10, choices=RATING_CHOICES, blank=True)

    # Comments
    comments_to_authors = models.TextField(blank=True)
    strengths = models.TextField(blank=True)
    weaknesses = models.TextField(blank=True)
    suggestions = models.TextField(blank=True)
    confidential_to_editor = models.TextField(blank=True)

    recommendation = models.CharField(
        max_length=20,
        choices=RECOMMENDATION_CHOICES,
        blank=True,
    )

    review_file = models.FileField(upload_to=review_file_upload_path, blank=True, null=True)

    submitted_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "reviews_review"

    def __str__(self):
        return f"Review for {self.assignment.submission.title}"

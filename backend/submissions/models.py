"""Submission models."""
from django.conf import settings
from django.db import models


class TopicArea(models.Model):
    """Topic/field for manuscript categorization (e.g., AI, SWE)."""

    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)

    class Meta:
        db_table = "submissions_topic_area"

    def __str__(self):
        return self.name


# Submission status constants
STATUS_DRAFT = "draft"
STATUS_SUBMITTED = "submitted"
STATUS_SCREENING = "screening"
STATUS_DESK_REJECTED = "desk_rejected"
STATUS_UNDER_REVIEW = "under_review"
STATUS_REVISION_REQUIRED = "revision_required"
STATUS_RESUBMITTED = "resubmitted"
STATUS_DECISION_PENDING = "decision_pending"
STATUS_ACCEPTED = "accepted"
STATUS_REJECTED = "rejected"
STATUS_PUBLISHED = "published"
STATUS_WITHDRAWN = "withdrawn"

STATUS_CHOICES = [
    (STATUS_DRAFT, "Draft"),
    (STATUS_SUBMITTED, "Submitted"),
    (STATUS_SCREENING, "Screening"),
    (STATUS_DESK_REJECTED, "Desk Rejected"),
    (STATUS_UNDER_REVIEW, "Under Review"),
    (STATUS_REVISION_REQUIRED, "Revision Required"),
    (STATUS_RESUBMITTED, "Resubmitted"),
    (STATUS_DECISION_PENDING, "Decision Pending"),
    (STATUS_ACCEPTED, "Accepted"),
    (STATUS_REJECTED, "Rejected"),
    (STATUS_PUBLISHED, "Published"),
    (STATUS_WITHDRAWN, "Withdrawn"),
]

FINAL_STATUSES = [STATUS_DESK_REJECTED, STATUS_REJECTED, STATUS_PUBLISHED, STATUS_WITHDRAWN]

# DOI registration status constants
DOI_STATUS_PENDING = "pending"
DOI_STATUS_REGISTERED = "registered"
DOI_STATUS_FAILED = "failed"

DOI_STATUS_CHOICES = [
    (DOI_STATUS_PENDING, "Pending"),
    (DOI_STATUS_REGISTERED, "Registered"),
    (DOI_STATUS_FAILED, "Failed"),
]


def manuscript_upload_path(instance, filename):
    """Upload path for manuscript PDF."""
    pk = instance.pk or "temp"
    return f"submissions/{pk}/manuscripts/{filename}"


def supplementary_upload_path(instance, filename):
    """Upload path for supplementary files."""
    return f"submissions/{instance.submission_id}/supplementary/{filename}"


def issue_pdf_upload_path(instance, filename):
    """Upload path for generated full issue PDF."""
    return (
        f"issues/{instance.publication_year}/v{instance.volume}/"
        f"i{instance.issue_number}/{filename}"
    )


class JournalIssue(models.Model):
    """Published journal issue containing ordered articles."""

    title = models.CharField(max_length=255)
    volume = models.PositiveIntegerField()
    issue_number = models.PositiveIntegerField()
    publication_year = models.PositiveIntegerField()
    publication_date = models.DateField(null=True, blank=True)
    full_issue_pdf = models.FileField(
        upload_to=issue_pdf_upload_path,
        blank=True,
        null=True,
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "submissions_journal_issue"
        ordering = ["-publication_year", "-volume", "-issue_number"]
        unique_together = [("volume", "issue_number", "publication_year")]

    def __str__(self):
        return f"Vol. {self.volume}, Issue {self.issue_number} ({self.publication_year})"


ARTICLE_TYPE_CHOICES = [
    ("original_research", "Original Research Article"),
    ("review_article", "Review Article"),
    ("systematic_review", "Systematic Literature Review"),
    ("case_study", "Case Study"),
    ("technical_note", "Technical Note"),
    ("short_communication", "Short Communication"),
    ("perspective", "Perspective/Policy Paper"),
]

LANGUAGE_CHOICES = [
    ("en", "English"),
    ("ru", "Russian"),
    ("uz", "Uzbek"),
]


def title_page_upload_path(instance, filename):
    pk = instance.pk or "temp"
    return f"submissions/{pk}/title_page/{filename}"


def cover_letter_upload_path(instance, filename):
    pk = instance.pk or "temp"
    return f"submissions/{pk}/cover_letter/{filename}"


def ethics_approval_upload_path(instance, filename):
    pk = instance.pk or "temp"
    return f"submissions/{pk}/ethics/{filename}"


class Submission(models.Model):
    """Manuscript submission with step-by-step data matching the frontend wizard."""

    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="submissions",
    )
    status = models.CharField(max_length=30, choices=STATUS_CHOICES, default=STATUS_DRAFT)

    # Step 0: Article type & language
    article_type = models.CharField(max_length=30, choices=ARTICLE_TYPE_CHOICES, blank=True)
    language = models.CharField(max_length=5, choices=LANGUAGE_CHOICES, default="en")

    # Step 0: Confirmations / Agreements
    originality_confirmation = models.BooleanField(default=False)
    originality_confirmed_at = models.DateTimeField(null=True, blank=True)
    plagiarism_agreement = models.BooleanField(default=False)
    plagiarism_agreed_at = models.DateTimeField(null=True, blank=True)
    ethics_compliance = models.BooleanField(default=False)
    ethics_confirmed_at = models.DateTimeField(null=True, blank=True)
    copyright_agreement = models.BooleanField(default=False)
    copyright_agreed_at = models.DateTimeField(null=True, blank=True)

    # Step 1: Manuscript details
    title = models.CharField(max_length=500, blank=True)
    running_title = models.CharField(max_length=100, blank=True)
    abstract = models.TextField(blank=True)
    keywords = models.JSONField(default=list)
    topic_area = models.ForeignKey(
        TopicArea,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="submissions",
    )
    cover_letter_text = models.TextField(blank=True)

    # Step 2: File uploads
    manuscript_pdf = models.FileField(upload_to=manuscript_upload_path, blank=True, null=True)
    title_page = models.FileField(upload_to=title_page_upload_path, blank=True, null=True)
    cover_letter_file = models.FileField(upload_to=cover_letter_upload_path, blank=True, null=True)
    ethics_approval_file = models.FileField(upload_to=ethics_approval_upload_path, blank=True, null=True)

    # Step 3: Co-authors stored as JSON
    co_authors = models.JSONField(default=list, blank=True)

    # Step 4: Metadata (English translations, references, funding)
    english_title = models.CharField(max_length=500, blank=True)
    english_abstract = models.TextField(blank=True)
    english_keywords = models.JSONField(default=list, blank=True)
    references = models.TextField(blank=True)
    funding_info = models.TextField(blank=True)
    data_availability_statement = models.TextField(blank=True)

    # Step 5: Ethics declarations
    conflict_of_interest = models.TextField(blank=True)
    ai_use_disclosure = models.TextField(blank=True)
    ethics_approval_details = models.TextField(blank=True)

    # Editorial
    desk_reject_reason = models.TextField(blank=True)
    editorial_decision = models.CharField(max_length=30, blank=True)
    decision_letter = models.TextField(blank=True)
    issue = models.ForeignKey(
        JournalIssue,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="articles",
    )
    issue_order = models.PositiveIntegerField(null=True, blank=True)
    page_start = models.PositiveIntegerField(null=True, blank=True)
    page_end = models.PositiveIntegerField(null=True, blank=True)
    doi = models.CharField(max_length=128, unique=True, null=True, blank=True, db_index=True)
    doi_status = models.CharField(
        max_length=20,
        choices=DOI_STATUS_CHOICES,
        default=DOI_STATUS_PENDING,
    )

    # Manuscript ID (auto-generated, e.g. CAJAIDT-2027-001)
    manuscript_id = models.CharField(max_length=30, unique=True, null=True, blank=True, db_index=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "submissions_submission"

    def __str__(self):
        return f"{self.manuscript_id or self.title or '(Untitled)'} by {self.author.email}"

    def save(self, *args, **kwargs):
        if not self.manuscript_id:
            year = self.created_at.year if self.created_at else __import__("datetime").date.today().year
            last = Submission.objects.filter(
                manuscript_id__startswith=f"CAJAIDT-{year}-"
            ).order_by("-manuscript_id").first()
            if last and last.manuscript_id:
                seq = int(last.manuscript_id.split("-")[-1]) + 1
            else:
                seq = 1
            self.manuscript_id = f"CAJAIDT-{year}-{seq:03d}"
        super().save(*args, **kwargs)


class SubmissionSupplementaryFile(models.Model):
    """Supplementary file attached to a submission."""

    submission = models.ForeignKey(
        Submission,
        on_delete=models.CASCADE,
        related_name="supplementary_files",
    )
    file = models.FileField(upload_to=supplementary_upload_path)
    name = models.CharField(max_length=255, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "submissions_supplementary_file"


class SubmissionVersion(models.Model):
    """Version snapshot for each resubmission (links to manuscript + supplementary snapshot)."""

    submission = models.ForeignKey(
        Submission,
        on_delete=models.CASCADE,
        related_name="versions",
    )
    version_number = models.PositiveIntegerField()
    manuscript_pdf = models.FileField(upload_to="submissions/versions/manuscripts/")
    supplementary_files_snapshot = models.JSONField(default=list)  # [{"name": "...", "url": "..."}]
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "submissions_version"
        unique_together = [("submission", "version_number")]
        ordering = ["submission", "version_number"]

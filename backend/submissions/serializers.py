"""Submission serializers."""
from django.utils import timezone
from rest_framework import serializers

from notifications.serializers import (
    JournalPublicationCertificateSerializer,
    ReviewerRecognitionCertificateSerializer,
)
from .models import (
    JournalIssue,
    Submission,
    SubmissionSupplementaryFile,
    SubmissionVersion,
    TopicArea,
    STATUS_DESK_REJECTED,
    STATUS_REJECTED,
)


class TopicAreaSerializer(serializers.ModelSerializer):
    class Meta:
        model = TopicArea
        fields = ["id", "name", "slug"]


class JournalIssueSerializer(serializers.ModelSerializer):
    full_issue_pdf_url = serializers.SerializerMethodField()

    class Meta:
        model = JournalIssue
        fields = [
            "id", "title", "volume", "issue_number",
            "publication_year", "publication_date", "full_issue_pdf_url",
        ]

    def get_full_issue_pdf_url(self, obj):
        if not obj.full_issue_pdf:
            return None
        try:
            url = obj.full_issue_pdf.url
        except (ValueError, AttributeError):
            return None
        request = self.context.get("request")
        return request.build_absolute_uri(url) if request else url


class SubmissionSupplementaryFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubmissionSupplementaryFile
        fields = ["id", "file", "name", "created_at"]
        read_only_fields = ["created_at"]


class SubmissionSerializer(serializers.ModelSerializer):
    supplementary_files = SubmissionSupplementaryFileSerializer(many=True, read_only=True)
    topic_area = TopicAreaSerializer(read_only=True)
    issue = JournalIssueSerializer(read_only=True)
    reason = serializers.SerializerMethodField()
    topic_area_id = serializers.PrimaryKeyRelatedField(
        queryset=TopicArea.objects.all(),
        source="topic_area",
        write_only=True,
        required=False,
        allow_null=True,
    )
    manuscript_pdf = serializers.SerializerMethodField()
    title_page_url = serializers.SerializerMethodField()
    cover_letter_file_url = serializers.SerializerMethodField()
    ethics_approval_file_url = serializers.SerializerMethodField()
    author_name = serializers.CharField(source="author.full_name", read_only=True)
    author_email = serializers.CharField(source="author.email", read_only=True)
    certificates = ReviewerRecognitionCertificateSerializer(
        source="recognition_certificates", many=True, read_only=True
    )
    journal_certificates = JournalPublicationCertificateSerializer(
        source="journal_publication_certificates", many=True, read_only=True
    )

    class Meta:
        model = Submission
        fields = [
            "id",
            "manuscript_id",
            "status",
            "article_type",
            "language",
            "doi",
            "doi_status",
            "reason",
            "title",
            "running_title",
            "abstract",
            "keywords",
            "topic_area",
            "topic_area_id",
            "cover_letter_text",
            "originality_confirmation",
            "plagiarism_agreement",
            "ethics_compliance",
            "copyright_agreement",
            "manuscript_pdf",
            "title_page_url",
            "cover_letter_file_url",
            "ethics_approval_file_url",
            "supplementary_files",
            "co_authors",
            "english_title",
            "english_abstract",
            "english_keywords",
            "references",
            "funding_info",
            "data_availability_statement",
            "conflict_of_interest",
            "ai_use_disclosure",
            "ethics_approval_details",
            "issue",
            "issue_order",
            "page_start",
            "page_end",
            "author_name",
            "author_email",
            "certificates",
            "journal_certificates",
            "created_at",
            "updated_at",
        ]
        read_only_fields = [
            "id", "manuscript_id", "status", "doi", "doi_status",
            "reason", "supplementary_files", "author_name", "author_email",
            "created_at", "updated_at",
        ]

    def _file_url(self, file_field):
        if not file_field:
            return None
        try:
            url = file_field.url
        except (ValueError, AttributeError):
            return None
        request = self.context.get("request")
        return request.build_absolute_uri(url) if request else url

    def get_manuscript_pdf(self, obj):
        return self._file_url(obj.manuscript_pdf)

    def get_title_page_url(self, obj):
        return self._file_url(obj.title_page)

    def get_cover_letter_file_url(self, obj):
        return self._file_url(obj.cover_letter_file)

    def get_ethics_approval_file_url(self, obj):
        return self._file_url(obj.ethics_approval_file)

    def get_reason(self, obj):
        if obj.status == STATUS_DESK_REJECTED:
            return obj.desk_reject_reason or ""
        if obj.status == STATUS_REJECTED:
            return obj.decision_letter or ""
        return ""

    def validate_keywords(self, value):
        if value is None:
            return []
        if not isinstance(value, list):
            raise serializers.ValidationError("Keywords must be a list.")
        kw = [str(k).strip() for k in value if k]
        if len(kw) > 10:
            raise serializers.ValidationError("At most 10 keywords allowed.")
        return kw

    def create(self, validated_data):
        now = timezone.now()
        for field, ts_field in [
            ("originality_confirmation", "originality_confirmed_at"),
            ("plagiarism_agreement", "plagiarism_agreed_at"),
            ("ethics_compliance", "ethics_confirmed_at"),
            ("copyright_agreement", "copyright_agreed_at"),
        ]:
            if validated_data.get(field):
                validated_data[ts_field] = now
        return super().create(validated_data)

    def update(self, instance, validated_data):
        now = timezone.now()
        for field, ts_field in [
            ("originality_confirmation", "originality_confirmed_at"),
            ("plagiarism_agreement", "plagiarism_agreed_at"),
            ("ethics_compliance", "ethics_confirmed_at"),
            ("copyright_agreement", "copyright_agreed_at"),
        ]:
            if validated_data.get(field) and not getattr(instance, ts_field):
                setattr(instance, ts_field, now)
        return super().update(instance, validated_data)


class SubmissionCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Submission
        fields = []

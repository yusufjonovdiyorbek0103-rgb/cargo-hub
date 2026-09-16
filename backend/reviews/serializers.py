"""Review serializers."""
from rest_framework import serializers

from .models import (
    RECOMMENDATION_CHOICES,
    RATING_CHOICES,
    CONFLICT_CHOICES,
    Review,
    ReviewAssignment,
)

RATING_VALUES = [c[0] for c in RATING_CHOICES]
CONFLICT_VALUES = [c[0] for c in CONFLICT_CHOICES]


class SubmissionVersionMinimalSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    version_number = serializers.IntegerField()


class ReviewAssignmentSerializer(serializers.ModelSerializer):
    submission_title = serializers.CharField(source="submission.title", read_only=True)
    submission_abstract = serializers.CharField(source="submission.abstract", read_only=True)
    submission_topic_area = serializers.CharField(source="submission.topic_area.name", read_only=True)
    submission_manuscript_id = serializers.CharField(source="submission.manuscript_id", read_only=True)
    submission_article_type = serializers.CharField(source="submission.article_type", read_only=True)
    reviewer_email = serializers.SerializerMethodField()
    submission_version = SubmissionVersionMinimalSerializer(read_only=True)
    manuscript_url = serializers.SerializerMethodField()
    review = serializers.SerializerMethodField()

    class Meta:
        model = ReviewAssignment
        fields = [
            "id",
            "submission",
            "submission_title",
            "submission_abstract",
            "submission_topic_area",
            "submission_manuscript_id",
            "submission_article_type",
            "submission_version",
            "reviewer_email",
            "manuscript_url",
            "status",
            "due_date",
            "invited_at",
            "responded_at",
            "review",
        ]
        read_only_fields = fields

    def get_manuscript_url(self, obj):
        version = obj.submission_version
        if version and version.manuscript_pdf:
            request = self.context.get("request")
            if request:
                return request.build_absolute_uri(version.manuscript_pdf.url)
            return version.manuscript_pdf.url
        return None

    def get_reviewer_email(self, obj):
        return obj.reviewer.email if obj.reviewer else obj.invited_email

    def get_review(self, obj):
        review = getattr(obj, "review", None)
        if not review:
            return None
        return ReviewSerializer(review, context=self.context).data


class ReviewSerializer(serializers.ModelSerializer):
    review_file_url = serializers.SerializerMethodField()

    class Meta:
        model = Review
        fields = [
            "id",
            "conflict_of_interest",
            "conflict_details",
            "relevance",
            "originality",
            "literature_review",
            "methodology",
            "results_validity",
            "discussion_quality",
            "ethical_compliance",
            "reference_quality",
            "writing_clarity",
            "overall_merit",
            "comments_to_authors",
            "strengths",
            "weaknesses",
            "suggestions",
            "confidential_to_editor",
            "recommendation",
            "review_file_url",
            "submitted_at",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "review_file_url", "submitted_at", "created_at", "updated_at"]

    def get_review_file_url(self, obj):
        if not obj.review_file:
            return None
        try:
            url = obj.review_file.url
        except (ValueError, AttributeError):
            return None
        request = self.context.get("request")
        return request.build_absolute_uri(url) if request else url

    def validate_recommendation(self, value):
        if value and value not in dict(RECOMMENDATION_CHOICES):
            raise serializers.ValidationError("Invalid recommendation.")
        return value

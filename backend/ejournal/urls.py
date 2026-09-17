"""
URL configuration for ejournal project.
"""
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.http import FileResponse, Http404
from django.urls import path, include, re_path

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("ejournal.api_urls")),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

if settings.SERVE_FRONTEND:
    def _serve_spa(request, resource_path=""):
        dist = settings.FRONTEND_DIST_DIR
        if resource_path:
            file_path = dist / resource_path
            if file_path.is_file():
                content_types = {
                    ".js": "application/javascript",
                    ".css": "text/css",
                    ".png": "image/png",
                    ".jpg": "image/jpeg",
                    ".svg": "image/svg+xml",
                    ".ico": "image/x-icon",
                    ".woff": "font/woff",
                    ".woff2": "font/woff2",
                    ".json": "application/json",
                }
                ext = file_path.suffix.lower()
                ct = content_types.get(ext, "application/octet-stream")
                return FileResponse(open(file_path, "rb"), content_type=ct)
        index = dist / "index.html"
        if not index.is_file():
            raise Http404("Frontend not built")
        return FileResponse(open(index, "rb"), content_type="text/html")

    urlpatterns += [
        re_path(r"^(?!api/|admin/|media/)(?P<resource_path>.*)$", _serve_spa),
    ]

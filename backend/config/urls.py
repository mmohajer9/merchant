"""config URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.conf.urls import url
from django.urls.conf import re_path
from django.views.generic.base import TemplateView

from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

from dj_rest_auth.views import (
    PasswordResetConfirmView,
)


schema_view = get_schema_view(
    openapi.Info(
        title="Merchant API",
        default_version="v1",
        description="Merchant is a comprehensive E-Commerce Platform",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="info@merchant.com"),
        license=openapi.License(name="MIT License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)


urlpatterns = [
    # ? general purpose
    path("secret/", admin.site.urls),
    path("explorer/", include("explorer.urls")),
    path("admin/", include("admin_honeypot.urls", namespace="admin_honeypot")),
    # ------------------------------------------------------------------------------
    # ? local apps
    path("api/v1/accounts/", include("accounts.urls", namespace="v1-accounts")),
    path("api/v1/shop/", include("shop.urls" , namespace="v1-shop")),
    # ------------------------------------------------------------------------------
    # ? authentication
    # this url is used to generate email content
    path("api/rest-auth/", include("dj_rest_auth.urls")),
    path("api/rest-auth/registration/", include("dj_rest_auth.registration.urls")),
    path(
        "api/rest-auth/password/reset/confirm/<uidb64>/<token>/",
        PasswordResetConfirmView.as_view(),
        name="password_reset_confirm",
    ),
    # ------------------------------------------------------------------------------
    # ? api doc
    url(
        r"^api/doc(?P<format>\.json|\.yaml)$",
        schema_view.without_ui(cache_timeout=0),
        name="schema-json",
    ),
    url(
        r"^api/doc/$",
        schema_view.with_ui("swagger", cache_timeout=0),
        name="schema-swagger-ui",
    ),
    url(
        r"^api/redoc/$",
        schema_view.with_ui("redoc", cache_timeout=0),
        name="schema-redoc",
    ),
    # ------------------------------------------------------------------------------
]


if settings.DEBUG:
    import debug_toolbar

    urlpatterns += (path("__debug__/", include(debug_toolbar.urls)),)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# ? handler404 = a view for handling 404 not found page -> def view(request , Exception = None):
# ? handler500 = same as 404 ...

from django.urls import path, include

app_name = "accounts"

urlpatterns = [
    path("drf-auth/", include("rest_framework.urls")),
    path("rest-auth/", include("dj_rest_auth.urls")),
    path("rest-auth/registration/", include("dj_rest_auth.registration.urls")),
]

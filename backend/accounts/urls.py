from django.urls import path, include

app_name = "accounts"

urlpatterns = [
    # ? django's original authentication urls
    path("dj-auth/", include("django.contrib.auth.urls")),
    
    # ? this one overrides django default authentication urls and has nothing to do with DRF
    # path('allauth/', include('allauth.urls')),

    # ? dj-rest-auth urls
    path("rest-auth/", include("dj_rest_auth.urls")),
    path("rest-auth/registration/", include("dj_rest_auth.registration.urls")),
]

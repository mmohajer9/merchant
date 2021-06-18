from django.urls import path, include
from rest_framework import routers
# from .views import 

app_name = "shop"

router = routers.SimpleRouter()

# router.register("countries", CountryViewSet, basename="countries")


urlpatterns = [path("", include(router.urls))]

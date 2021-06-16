from django.urls import path, include
from rest_framework import routers
from .views import CountryViewSet, ProvinceViewSet , CityViewSet

app_name = "accounts"

router = routers.SimpleRouter()
router.register("countries", CountryViewSet , basename="countries")
router.register("provinces", ProvinceViewSet , basename="provinces")
router.register("cities", CityViewSet , basename="cities")

urlpatterns = [path("", include(router.urls))]

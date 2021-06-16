from django.urls import path, include
from rest_framework import routers
from .views import AddressViewSet, CountryViewSet, ProvinceViewSet, CityViewSet, SellerViewSet

app_name = "accounts"

router = routers.SimpleRouter()

# location apis
router.register("countries", CountryViewSet, basename="countries")
router.register("provinces", ProvinceViewSet, basename="provinces")
router.register("cities", CityViewSet, basename="cities")

# seller apis
router.register("sellers", SellerViewSet, basename="sellers")
router.register("addresses", AddressViewSet, basename="addresses")
# address apis

urlpatterns = [path("", include(router.urls))]

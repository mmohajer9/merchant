from django.urls import path, include
from rest_framework import routers
from .views import ProductViewSet

app_name = "shop"

router = routers.SimpleRouter()

router.register("products", ProductViewSet, basename="products")


urlpatterns = [path("", include(router.urls))]

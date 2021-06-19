from django.urls import path, include
from rest_framework import routers
from .views import OrderItemViewSet, ProductViewSet, OrderViewSet

app_name = "shop"

router = routers.SimpleRouter()

router.register("products", ProductViewSet, basename="products")
router.register("orders", OrderViewSet, basename="orders")
router.register("order_items", OrderItemViewSet, basename="order_items")

urlpatterns = [path("", include(router.urls))]

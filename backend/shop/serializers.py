from rest_framework.exceptions import ValidationError
from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.conf import settings
from drf_extra_fields.fields import HybridImageField


from .models import (
    Bookmark,
    CartItem,
    Category,
    Discount,
    Coupon,
    Order,
    OrderItem,
    Product,
    Subcategory,
)

UserModel = get_user_model()


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = (
            "id",
            "name",
            "slug",
            "description",
            "image",
            "price",
            "final_price",
            "quantity",
            "created_at",
            "updated_at",
            "subcategory",
            "discount",
            "seller_id",
        )


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = "__all__"
        read_only_fields = ["id", "order", "created_at", "updated_at"]

# TODO ino fixesh kon vase farda
class OrderSerializer(serializers.ModelSerializer):

    orderitem_set = OrderItemSerializer(many=True)

    class Meta:
        model = Order
        fields = (
            "id",
            "status",
            "created_at",
            "updated_at",
            "user_id",
            "orderitem_set",
        )

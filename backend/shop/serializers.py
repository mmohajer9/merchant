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
            "quantity",
            "created_at",
            "updated_at",
            "subcategory",
            "discount",
            "seller_id",
        )

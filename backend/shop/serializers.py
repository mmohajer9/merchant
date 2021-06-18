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

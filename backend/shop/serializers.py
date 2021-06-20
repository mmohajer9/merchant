from typing import OrderedDict
from rest_framework.exceptions import (
    ErrorDetail,
    ValidationError as RestValidationError,
)
from django.db.models import F
from django.db import IntegrityError
from django.core.exceptions import ValidationError
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
        read_only_fields = [
            "id",
            "order",
            "price",
            "product",
            "created_at",
            "updated_at",
        ]


class OrderProductSerializer(serializers.ModelSerializer):

    product_id = serializers.IntegerField()

    class Meta:
        model = Product
        fields = ("product_id", "quantity")


class OrderSerializer(serializers.ModelSerializer):

    orderitem_set = OrderItemSerializer(many=True, read_only=True)
    products = OrderProductSerializer(many=True, write_only=True, required=False)

    class Meta:
        model = Order
        fields = (
            "id",
            "status",
            "created_at",
            "updated_at",
            "user_id",
            "orderitem_set",
            "products",
        )

    def create(self, validated_data):
        products_data = validated_data.get("products", [])

        try:
            (order, created) = Order.objects.get_or_create(
                user=validated_data.pop("user"), status="pending"
            )
        except:
            order = Order.objects.filter(
                user=validated_data.pop("user"), status="pending"
            ).latest("updated_at")
        try:
            for product_data in products_data:
                properties = product_data.items()
                iterable = iter(properties)
                for item in iterable:
                    global product_id
                    global quantity
                    global order_items
                    order_items = []
                    product_id = item[1]
                    quantity = next(iterable)[1]
                    # --------------------------------------------------------------
                    product = Product.objects.get(pk=product_id)
                    order_item = order.orderitem_set.filter(
                        product__id=product_id
                    ).first()
                    # --------------------------------------------------------------
                    """
                        handle two common errors:
                        ordering more than stock item quantity
                        ordering when the product is not available (quantity = 0)
                        if there were also the same item that you want to add to the order
                        just update the quantity fields on the order items o/w add a new order item
                    """
                    if (
                        (not product.is_available)
                        or (product.quantity < quantity)
                        or (
                            order_item
                            and product.quantity < quantity + order_item.quantity
                        )
                    ):
                        raise Exception("not sufficient product in the stock")
                    elif order_item:
                        order_item.quantity += quantity
                        order_items.append(order_item)
                    else:
                        new_order_item = OrderItem.objects.create(
                            order=order,
                            product=product,
                            quantity=quantity,
                            price=product.final_price(),
                        )
                    # --------------------------------------------------------------

        except Exception as e:
            raise RestValidationError(
                {
                    "error": {
                        "product_id": product_id,
                        "message": e,
                    }
                }
            )

        try:
            [order_item.save() for order_item in order_items]
        except:
            pass

        return order

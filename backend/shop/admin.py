from django.contrib import admin
from django.utils.translation import ugettext_lazy as _
from imagekit.admin import AdminThumbnail

from simple_history.admin import SimpleHistoryAdmin

from .models import (
    Category,
    Discount,
    Coupon,
    Product,
    CartItem,
    Order,
    OrderItem,
    Bookmark,
)

# Register your models here.


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("name", "created_at", "updated_at")
    # list_filter = ["user", "title", "business_phone"]
    # search_fields = ('user__username','postal_code__startswith')
    # prepopulated_fields = {'slug': ('title',)}


@admin.register(Discount)
class DiscountAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "percent",
        "is_active",
        "valid_from",
        "valid_to",
        "created_at",
        # "updated_at",
        "is_valid",
        "period",
        "remaining_time",
    )
    # list_filter = ["user", "title", "business_phone"]
    # search_fields = ('user__username','postal_code__startswith')
    # prepopulated_fields = {'slug': ('title',)}


@admin.register(Coupon)
class CouponAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "code",
        "percent",
        "is_active",
        "valid_from",
        "valid_to",
        "created_at",
        "is_valid",
        "period",
        "remaining_time",
    )
    # list_filter = ["user", "title", "business_phone"]
    # search_fields = ('user__username','postal_code__startswith')
    # prepopulated_fields = {'slug': ('title',)}


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):

    thumbnail = AdminThumbnail(image_field="image_thumbnail")

    list_display = (
        "name",
        "category",
        "price",
        "quantity",
        "discount",
        "final_price",
        "thumbnail",
        "is_available",
    )
    # list_filter = ["user", "title", "business_phone"]
    # search_fields = ('user__username','postal_code__startswith')
    # prepopulated_fields = {'slug': ('title',)}


@admin.register(CartItem)
class CartItemAdmin(admin.ModelAdmin):
    list_display = ("user", "product", "quantity")
    # list_filter = ["user", "title", "business_phone"]
    # search_fields = ('user__username','postal_code__startswith')
    # prepopulated_fields = {'slug': ('title',)}


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ("user", "status", "created_at", "updated_at")
    # list_filter = ["user", "title", "business_phone"]
    # search_fields = ('user__username','postal_code__startswith')
    # prepopulated_fields = {'slug': ('title',)}


@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = ("order", "product", "quantity", "price")
    # list_filter = ["user", "title", "business_phone"]
    # search_fields = ('user__username','postal_code__startswith')
    # prepopulated_fields = {'slug': ('title',)}


@admin.register(Bookmark)
class BookmarkAdmin(admin.ModelAdmin):
    list_display = ("user", "product", "created_at")
    # list_filter = ["user", "title", "business_phone"]
    # search_fields = ('user__username','postal_code__startswith')
    # prepopulated_fields = {'slug': ('title',)}

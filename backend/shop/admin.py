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
    Subcategory,
)

# Register your models here.


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("name", "created_at", "updated_at")
    # list_filter = ["user", "title", "business_phone"]
    # search_fields = ('user__username','postal_code__startswith')
    # prepopulated_fields = {'slug': ('title',)}


@admin.register(Subcategory)
class SubcategoryAdmin(admin.ModelAdmin):
    list_display = ("category", "name", "created_at", "updated_at")
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
        "subcategory",
        "category",
        "price",
        "quantity",
        "discount",
        "discount_percent",
        "discount_active",
        "discount_valid",
        "final_price",
        "thumbnail",
        "is_available",
    )
    # list_filter = ["user", "title", "business_phone"]
    # search_fields = ('user__username','postal_code__startswith')
    # prepopulated_fields = {'slug': ('title',)}

    def category(self, obj):
        return obj.subcategory.category

    def discount_percent(self, obj):
        try:
            return obj.discount.percent
        except:
            return 0

    def discount_active(self, obj):
        try:
            return obj.discount.is_active
        except:
            return 0

    discount_active.boolean = True

    def discount_valid(self, obj):
        try:
            return obj.discount.is_valid()
        except:
            return 0

    discount_valid.boolean = True


@admin.register(CartItem)
class CartItemAdmin(admin.ModelAdmin):
    list_display = ("user", "product", "quantity")
    # list_filter = ["user", "title", "business_phone"]
    # search_fields = ('user__username','postal_code__startswith')
    # prepopulated_fields = {'slug': ('title',)}


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "status", "created_at", "updated_at")
    # list_filter = ["user", "title", "business_phone"]
    # search_fields = ('user__username','postal_code__startswith')
    # prepopulated_fields = {'slug': ('title',)}


@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = ("id", "order", "product", "quantity", "price")
    # list_filter = ["user", "title", "business_phone"]
    # search_fields = ('user__username','postal_code__startswith')
    # prepopulated_fields = {'slug': ('title',)}


@admin.register(Bookmark)
class BookmarkAdmin(admin.ModelAdmin):
    list_display = ("user", "product", "created_at")
    # list_filter = ["user", "title", "business_phone"]
    # search_fields = ('user__username','postal_code__startswith')
    # prepopulated_fields = {'slug': ('title',)}

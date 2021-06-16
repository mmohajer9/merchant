from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.utils.translation import ugettext_lazy as _
from imagekit.admin import AdminThumbnail

from simple_history.admin import SimpleHistoryAdmin

from .models import User, SellerProfile, Address, City, Country, Province

# Register your models here.

admin.site.site_header = _("Management Panel of Merchant E-Commerce Platform")


class MyUserAdmin(UserAdmin):

    thumbnail = AdminThumbnail(image_field="profile_pic_thumbnail")
    list_display = (
        "username",
        "nat_code",
        "email",
        "first_name",
        "last_name",
        "thumbnail",
        "is_superuser",
        "is_staff",
        "birth_date",
        "gender",
    )


MyUserAdmin.fieldsets += (
    (
        _("Critical Fields"),
        {
            "fields": (
                "birth_date",
                "mobile_phone",
                "nat_code",
                "telephone",
                "profile_pic",
                "gender",
            )
        },
    ),
)
admin.site.register(User, MyUserAdmin)


@admin.register(SellerProfile)
class SellerProfileAdmin(SimpleHistoryAdmin):
    list_display = ("user", "title", "business_phone")
    # list_filter = ["user", "title", "business_phone"]
    # search_fields = ('user__username','postal_code__startswith')
    # prepopulated_fields = {'slug': ('title',)}


@admin.register(Country)
class CountryAdmin(admin.ModelAdmin):
    list_display = ("name",)
    # list_filter = ["user", "title", "business_phone"]
    # search_fields = ('user__username','postal_code__startswith')
    # prepopulated_fields = {'slug': ('title',)}


@admin.register(Province)
class ProvinceAdmin(admin.ModelAdmin):
    list_display = ("name", "related_country")
    # list_filter = ["user", "title", "business_phone"]
    # search_fields = ('user__username','postal_code__startswith')
    # prepopulated_fields = {'slug': ('title',)}


@admin.register(City)
class CityAdmin(admin.ModelAdmin):
    list_display = ("name", "related_province", "country")
    # list_filter = ["user", "title", "business_phone"]
    # search_fields = ('user__username','postal_code__startswith')
    # prepopulated_fields = {'slug': ('title',)}

    def country(self, obj):
        return obj.related_province.related_country

    country.short_description = _("Country")


@admin.register(Address)
class AddressAdmin(admin.ModelAdmin):
    list_display = ("user", "country", "province", "city", "postal_code")
    # list_filter = ["user", "title", "business_phone"]
    # search_fields = ('user__username','postal_code__startswith')
    # prepopulated_fields = {'slug': ('title',)}

    def province(self, obj):
        return obj.city.related_province

    province.short_description = _("Province")

    def country(self, obj):
        return obj.city.related_province.related_country

    country.short_description = _("Country")

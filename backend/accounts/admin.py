from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.utils.translation import ugettext_lazy as _
from imagekit.admin import AdminThumbnail

from simple_history.admin import SimpleHistoryAdmin

from .models import User, SellerProfile

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


class SellerProfileAdmin(SimpleHistoryAdmin):
    list_display = ("user", "title", "business_phone")
    # list_filter = ["user", "title", "business_phone"]
    # search_fields = ('user__username','postal_code__startswith')
    # prepopulated_fields = {'slug': ('title',)}


admin.site.register(SellerProfile, SellerProfileAdmin)

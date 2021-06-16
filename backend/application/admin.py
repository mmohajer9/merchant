from django.contrib import admin
from .models import WebsiteConfiguration

# Register your models here.
@admin.register(WebsiteConfiguration)
class WebsiteConfigurationAdmin(admin.ModelAdmin):
    list_display = ("name", "description", "created_at", "updated_at")
    # list_filter = ["user", "title", "business_phone"]
    # search_fields = ('user__username','postal_code__startswith')
    # prepopulated_fields = {'slug': ('title',)}

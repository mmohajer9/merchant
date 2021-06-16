from autoslug.fields import AutoSlugField
from django.db import models
from django.utils.translation import ugettext_lazy as _
from django.utils import timezone
from django.core.validators import MinValueValidator, MaxValueValidator

# Create your models here.
class Category(models.Model):
    name = models.CharField(max_length=500, verbose_name=_("Name"))
    slug = AutoSlugField(populate_from='name' , unique=True, null=True)
    description = models.CharField(
        max_length=500, blank=True, null=True, verbose_name=_("Description")
    )
    created_at = models.DateTimeField(
        _("Created at"), auto_now_add=True, blank=True, null=True
    )
    updated_at = models.DateTimeField(
        _("Updated at"), auto_now=True, blank=True, null=True
    )

    def __str__(self):
        return self.name

    class Meta:
        # db_table = ''
        # managed = True
        verbose_name = "Category"
        verbose_name_plural = "Categorys"


class Discount(models.Model):

    name = models.CharField(max_length=500, verbose_name=_("Name"))
    slug = AutoSlugField(populate_from='name' , unique=True, null=True)
    description = models.CharField(
        max_length=500, blank=True, null=True, verbose_name=_("Description")
    )
    percent = models.IntegerField(
        _("Discount Percentage"),
        validators=[MinValueValidator(0), MaxValueValidator(100)],
    )

    valid_from = models.DateTimeField()
    valid_to = models.DateTimeField()

    created_at = models.DateTimeField(
        _("Created at"), auto_now_add=True, blank=True, null=True
    )
    updated_at = models.DateTimeField(
        _("Updated at"), auto_now=True, blank=True, null=True
    )

    def __str__(self):
        return self.name

    class Meta:
        # db_table = ''
        # managed = True
        verbose_name = "Discount"
        verbose_name_plural = "Discounts"


class Coupon(models.Model):

    name = models.CharField(max_length=500, verbose_name=_("Name"))
    slug = AutoSlugField(populate_from='name' , unique=True, null=True)
    description = models.CharField(
        max_length=500, blank=True, null=True, verbose_name=_("Description")
    )
    code = models.CharField(_("Coupon Code"), max_length=50, unique=True)
    is_active = models.BooleanField(_("Active"), default=False)
    percent = models.DecimalField(
        _("Coupon Percentage"), max_digits=4, decimal_places=2
    )

    valid_from = models.DateTimeField(_("Valid From"))
    valid_to = models.DateTimeField(_("Valid To"))

    created_at = models.DateTimeField(
        _("Created at"), auto_now_add=True, blank=True, null=True
    )
    updated_at = models.DateTimeField(
        _("Updated at"), auto_now=True, blank=True, null=True
    )

    def __str__(self):
        return self.name

    class Meta:
        # db_table = ''
        # managed = True
        verbose_name = "Coupon"
        verbose_name_plural = "Coupons"


def product_image_upload_to(self, filename):
    return f"products/{self.user.username}/{filename}"


class Product(models.Model):

    name = models.CharField(max_length=500, verbose_name=_("Name"))
    slug = AutoSlugField(populate_from='name' , unique=True, null=True)
    description = models.CharField(
        max_length=500, blank=True, null=True, verbose_name=_("Description")
    )
    image = models.ImageField(
        upload_to=product_image_upload_to, blank=True, verbose_name=_("Product Image")
    )
    category = models.ForeignKey(
        "Category", verbose_name=_("Category"), on_delete=models.CASCADE
    )
    price = models.DecimalField(max_digits=10, decimal_places=2)
    discount = models.ForeignKey(
        "Discount", verbose_name=_("Product Discount"), on_delete=models.CASCADE
    )
    is_available = models.BooleanField(default=True)
    created_at = models.DateTimeField(
        _("Created at"), auto_now_add=True, blank=True, null=True
    )
    updated_at = models.DateTimeField(
        _("Updated at"), auto_now=True, blank=True, null=True
    )

    def __str__(self):
        return self.name

    class Meta:
        # db_table = ''
        # managed = True
        verbose_name = "Product"
        verbose_name_plural = "Products"

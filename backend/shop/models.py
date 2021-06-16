from autoslug.fields import AutoSlugField
from django.db import models
from django.utils.translation import ugettext_lazy as _
from django.utils import timezone
from datetime import timedelta
from django.core.validators import MinValueValidator, MaxValueValidator
from django.contrib.auth import get_user_model

# Create your models here.
class Category(models.Model):
    name = models.CharField(max_length=500, verbose_name=_("Name"))
    slug = AutoSlugField(populate_from="name", unique=True, null=True)
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
    slug = AutoSlugField(populate_from="name", unique=True, null=True)
    description = models.CharField(
        max_length=500, blank=True, null=True, verbose_name=_("Description")
    )
    percent = models.IntegerField(
        _("Discount Percentage"),
        validators=[MinValueValidator(0), MaxValueValidator(100)],
    )
    is_active = models.BooleanField(_("Active"), default=False)
    valid_from = models.DateTimeField()
    valid_to = models.DateTimeField()

    created_at = models.DateTimeField(
        _("Created at"), auto_now_add=True, blank=True, null=True
    )
    updated_at = models.DateTimeField(
        _("Updated at"), auto_now=True, blank=True, null=True
    )

    def is_valid(self):
        now = timezone.now
        return bool(now < self.valid_to)

    is_valid.short_description = _("Valid")

    def period(self):
        delta = self.valid_to - self.valid_from
        result = self.days_hours_minutes(delta)
        return f"{result[0]} Days - {result[1]} Hours - {result[2]} Minutes"

    period.short_description = _("Period")

    def days_hours_minutes(td):
        return td.days, td.seconds // 3600, (td.seconds // 60) % 60

    def remaining_time(self):
        delta = self.valid_to - timezone.now()
        result = self.days_hours_minutes(delta)
        return f"{result[0]} Days - {result[1]} Hours - {result[2]} Minutes"

    remaining_time.short_description = _("Remaining Time")

    def __str__(self):
        return self.name

    class Meta:
        # db_table = ''
        # managed = True
        verbose_name = "Discount"
        verbose_name_plural = "Discounts"


class Coupon(models.Model):

    name = models.CharField(max_length=500, verbose_name=_("Name"))
    slug = AutoSlugField(populate_from="name", unique=True, null=True)
    description = models.CharField(
        max_length=500, blank=True, null=True, verbose_name=_("Description")
    )
    code = models.CharField(_("Coupon Code"), max_length=50, unique=True)
    percent = models.DecimalField(
        _("Coupon Percentage"), max_digits=4, decimal_places=2
    )

    is_active = models.BooleanField(_("Active"), default=False)
    valid_from = models.DateTimeField(_("Valid From"))
    valid_to = models.DateTimeField(_("Valid To"))

    created_at = models.DateTimeField(
        _("Created at"), auto_now_add=True, blank=True, null=True
    )
    updated_at = models.DateTimeField(
        _("Updated at"), auto_now=True, blank=True, null=True
    )

    def is_valid(self):
        now = timezone.now
        return bool(now < self.valid_to)

    is_valid.short_description = _("Valid")

    def period(self):
        delta = self.valid_to - self.valid_from
        result = self.days_hours_minutes(delta)
        return f"{result[0]} Days - {result[1]} Hours - {result[2]} Minutes"

    period.short_description = _("Period")

    def days_hours_minutes(td):
        return td.days, td.seconds // 3600, (td.seconds // 60) % 60

    def remaining_time(self):
        delta = self.valid_to - timezone.now()
        result = self.days_hours_minutes(delta)
        return f"{result[0]} Days - {result[1]} Hours - {result[2]} Minutes"

    remaining_time.short_description = _("Remaining Time")

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
    slug = AutoSlugField(populate_from="name", unique=True, null=True)
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

    def final_price(self):

        price = self.price
        discount = self.discount.percent if self.discount.is_valid else None

        final = price if not discount else (price * (100 - discount)) / 100

        return final

    final_price.short_description = _("Final Price")

    def __str__(self):
        return self.name

    class Meta:
        # db_table = ''
        # managed = True
        verbose_name = "Product"
        verbose_name_plural = "Products"


class CartItem(models.Model):
    user = models.ForeignKey(
        get_user_model(), on_delete=models.CASCADE, verbose_name=_("User")
    )
    product = models.ForeignKey(
        "Product", on_delete=models.CASCADE, verbose_name=_("Product")
    )
    quantity = models.IntegerField(verbose_name=_("Quantity of product"), default=1)
    created_at = models.DateTimeField(
        _("Created at"), auto_now_add=True, blank=True, null=True
    )
    updated_at = models.DateTimeField(
        _("Updated at"), auto_now=True, blank=True, null=True
    )

    def __str__(self):
        return self.user

    class Meta:
        # db_table = ''
        # managed = True
        verbose_name = "Cart Item"
        verbose_name_plural = "Cart Items"


class Order(models.Model):
    STATUS_CHOICES = [
        ("pending", "pending"),
        ("finished", "finished"),
        ("aborted", "aborted"),
    ]

    user = models.ForeignKey(
        get_user_model(), on_delete=models.CASCADE, verbose_name=_("User")
    )
    status = models.CharField(
        max_length=100,
        choices=STATUS_CHOICES,
        verbose_name=_("Status"),
        default="pending",
    )
    created_at = models.DateTimeField(
        _("Created at"), auto_now_add=True, blank=True, null=True
    )
    updated_at = models.DateTimeField(
        _("Updated at"), auto_now=True, blank=True, null=True
    )

    def __str__(self):
        return self.user

    class Meta:
        # db_table = ''
        # managed = True
        verbose_name = "Order"
        verbose_name_plural = "Orders"


class OrderItem(models.Model):
    order = models.ForeignKey(
        "Order", on_delete=models.CASCADE, verbose_name=_("Order")
    )
    product = models.ForeignKey(
        "Product", on_delete=models.CASCADE, verbose_name=_("Product")
    )
    quantity = models.IntegerField(default=1, verbose_name=_("Quantity"))
    price = models.DecimalField(
        max_digits=30, decimal_places=2, verbose_name=_("Order")
    )
    created_at = models.DateTimeField(
        _("Created at"), auto_now_add=True, blank=True, null=True
    )
    updated_at = models.DateTimeField(
        _("Updated at"), auto_now=True, blank=True, null=True
    )

    def __str__(self):
        return self.order

    class Meta:
        # db_table = ''
        # managed = True
        verbose_name = "Order Item"
        verbose_name_plural = "Order Items"


class Bookmark(models.Model):
    user = models.ForeignKey(
        get_user_model(), on_delete=models.CASCADE, verbose_name=_("User")
    )
    description = models.CharField(
        max_length=500, blank=True, null=True, verbose_name=_("Description")
    )
    product = models.ForeignKey(
        "Product", on_delete=models.CASCADE, verbose_name=_("Product")
    )
    created_at = models.DateTimeField(
        _("Created at"), auto_now_add=True, blank=True, null=True
    )
    updated_at = models.DateTimeField(
        _("Updated at"), auto_now=True, blank=True, null=True
    )

    def __str__(self):
        return self.user

    class Meta:
        # db_table = ''
        # managed = True
        verbose_name = "Bookmark"
        verbose_name_plural = "Bookmarks"

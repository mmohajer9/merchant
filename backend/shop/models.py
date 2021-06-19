from autoslug.fields import AutoSlugField
from django.db import models
from django.utils.translation import ugettext_lazy as _
from django.utils import timezone
from simple_history.models import HistoricalRecords
from django.core.validators import MinValueValidator, MaxValueValidator
from django.contrib.auth import get_user_model
from imagekit.models.fields import ImageSpecField
from pilkit.processors.resize import ResizeToFill

# Create your models here.

UserModel = get_user_model()


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
        verbose_name_plural = "Categories"


class Subcategory(models.Model):
    category = models.ForeignKey(
        "Category", verbose_name=_("Category"), on_delete=models.CASCADE
    )
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
        verbose_name = "Subcategory"
        verbose_name_plural = "Subcategories"


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
        now = timezone.now()
        return bool(now < self.valid_to)

    is_valid.boolean = True
    is_valid.short_description = _("Valid")

    def period(self):
        delta = self.valid_to - self.valid_from
        result = self.days_hours_minutes(delta)
        return f"{result[0]} Days - {result[1]} Hours - {result[2]} Minutes"

    period.short_description = _("Period")

    def days_hours_minutes(self, td):
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
    percent = models.IntegerField(
        _("Coupon Percentage"),
        validators=[MinValueValidator(0), MaxValueValidator(100)],
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
        now = timezone.now()
        return bool(now < self.valid_to)

    is_valid.boolean = True
    is_valid.short_description = _("Valid")

    def period(self):
        delta = self.valid_to - self.valid_from
        result = self.days_hours_minutes(delta)
        return f"{result[0]} Days - {result[1]} Hours - {result[2]} Minutes"

    period.short_description = _("Period")

    def days_hours_minutes(self, td):
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
    return f"products/{self.seller.user.username}/{filename}"


class Product(models.Model):

    seller = models.ForeignKey(
        "accounts.Seller", verbose_name=_("Seller"), on_delete=models.CASCADE, null=True
    )
    name = models.CharField(max_length=500, verbose_name=_("Name"))
    slug = AutoSlugField(populate_from="name", unique=True, null=True)
    description = models.CharField(
        max_length=500, blank=True, null=True, verbose_name=_("Description")
    )
    image = models.ImageField(
        upload_to=product_image_upload_to, blank=True, verbose_name=_("Product Image")
    )
    subcategory = models.ForeignKey(
        "Subcategory",
        verbose_name=_("Subcategory"),
        on_delete=models.CASCADE,
        blank=True,
        null=True,
    )
    price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.IntegerField(verbose_name=_("Quantity of product"), default=1)
    discount = models.ForeignKey(
        "Discount",
        verbose_name=_("Product Discount"),
        on_delete=models.CASCADE,
        blank=True,
        null=True,
    )
    is_available = models.BooleanField(default=True)
    created_at = models.DateTimeField(
        _("Created at"), auto_now_add=True, blank=True, null=True
    )
    updated_at = models.DateTimeField(
        _("Updated at"), auto_now=True, blank=True, null=True
    )
    history = HistoricalRecords()
    image_thumbnail = ImageSpecField(
        source="image",
        processors=[ResizeToFill(100, 100)],
        format="JPEG",
        options={"quality": 80},
    )
    image_thumbnail.short_description = _("Thumbnail")

    # is_available = models.BooleanField(default=True)
    def is_available(self):
        return self.quantity > 0

    is_available.short_description = _("Is Available")
    is_available.boolean = True

    def final_price(self):
        price = self.price
        discount = (
            self.discount.percent if (self.discount and self.discount.is_valid) else 0
        )
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
        UserModel, on_delete=models.CASCADE, verbose_name=_("User")
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
        UserModel, on_delete=models.CASCADE, verbose_name=_("User")
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
        UserModel, on_delete=models.CASCADE, verbose_name=_("User")
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

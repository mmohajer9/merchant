from django.db import models
from django.contrib.auth.models import (
    AbstractUser,
)
from autoslug import AutoSlugField
from django.contrib.auth import get_user_model
from django.utils.translation import ugettext_lazy as _
from simple_history.models import HistoricalRecords
from imagekit.models import ImageSpecField
from imagekit.processors import ResizeToFill

# Create your models here.


class Country(models.Model):
    name = models.CharField(_("Country Name"), max_length=50)
    slug = AutoSlugField(populate_from="name", unique=True, null=True)

    def __str__(self):
        return self.name

    class Meta:
        # db_table = ''
        # managed = True
        verbose_name = "Country"
        verbose_name_plural = "Countries"


class Province(models.Model):
    related_country = models.ForeignKey(
        "Country", verbose_name=_("Country"), on_delete=models.CASCADE
    )
    name = models.CharField(_("Province Name"), max_length=50)
    slug = AutoSlugField(populate_from="name", unique=True, null=True)

    def __str__(self):
        return self.name

    class Meta:
        # db_table = ''
        # managed = True
        verbose_name = "Province"
        verbose_name_plural = "Provinces"


class City(models.Model):
    related_province = models.ForeignKey(
        "Province", verbose_name=_("Province"), on_delete=models.CASCADE
    )
    name = models.CharField(_("City Name"), max_length=50)
    slug = AutoSlugField(populate_from="name", unique=True, null=True)

    def __str__(self):
        return self.name

    class Meta:
        # db_table = ''
        # managed = True
        verbose_name = "City"
        verbose_name_plural = "Cities"


def profile_pic_upload_to(self, filename):
    return f"accounts/{self.username}/profile_pics/{filename}"


class User(AbstractUser):

    GENDER_CHOICES = (
        ("male", _("Male")),
        ("female", _("Female")),
        (("ns"), _("Not Specified")),
    )

    nat_code = models.CharField(
        _("National Code"), max_length=15, blank=True, null=True
    )
    mobile_phone = models.CharField(
        _("Mobile Phone Number"), max_length=15, blank=True, null=True
    )
    telephone = models.CharField(
        blank=True, null=True, max_length=15, verbose_name=_("Telephone")
    )
    birth_date = models.DateField(_("Date of Birth"), blank=True, null=True)
    email = models.EmailField(_("Email Address"), blank=True, null=True)
    profile_pic = models.ImageField(
        upload_to=profile_pic_upload_to, blank=True, verbose_name=_("Profile Picture")
    )
    gender = models.CharField(
        max_length=10,
        choices=GENDER_CHOICES,
        default="ns",
        verbose_name=_("Gender"),
    )

    created_at = models.DateTimeField(
        _("Created at"), auto_now_add=True, blank=True, null=True
    )
    updated_at = models.DateTimeField(
        _("Updated at"), auto_now=True, blank=True, null=True
    )

    class Meta:
        # db_table = ''
        # managed = True
        verbose_name = _("User")
        verbose_name_plural = _("Users")
        # unique_together = ('email',)

    profile_pic_thumbnail = ImageSpecField(
        source="profile_pic",
        processors=[ResizeToFill(100, 100)],
        format="JPEG",
        options={"quality": 80},
    )
    profile_pic_thumbnail.short_description = _("Thumbnail")


class Seller(models.Model):
    user = models.OneToOneField(
        get_user_model(), on_delete=models.CASCADE, verbose_name=_("User")
    )
    title = models.CharField(max_length=500, verbose_name=_("Title"))
    slug = AutoSlugField(populate_from="title", unique=True, null=True)
    business_phone = models.CharField(
        blank=True, null=True, max_length=15, verbose_name=_("Business Phone Number")
    )
    description = models.CharField(
        max_length=500, blank=True, null=True, verbose_name=_("Description")
    )

    created_at = models.DateTimeField(
        _("Created at"), auto_now_add=True, blank=True, null=True
    )
    updated_at = models.DateTimeField(
        _("Updated at"), auto_now=True, blank=True, null=True
    )
    history = HistoricalRecords()

    def __str__(self):
        return self.user.username

    class Meta:
        # db_table = ""
        # managed = True
        verbose_name = "Seller"
        verbose_name_plural = "Sellers"


class Address(models.Model):
    user = models.ForeignKey(
        get_user_model(), verbose_name=_("User"), on_delete=models.CASCADE
    )
    city = models.ForeignKey("City", verbose_name=_("City"), on_delete=models.CASCADE)

    postal_code = models.CharField(max_length=20, verbose_name=_("Postal Code"))

    line1 = models.CharField(max_length=200, verbose_name=_("First Line of Address"))
    line2 = models.CharField(
        max_length=200, blank=True, null=True, verbose_name=_("Second Line of Address")
    )
    created_at = models.DateTimeField(
        _("Created at"), auto_now_add=True, blank=True, null=True
    )
    updated_at = models.DateTimeField(
        _("Updated at"), auto_now=True, blank=True, null=True
    )

    def __str__(self):
        return self.postal_code

    class Meta:
        # db_table = ''
        # managed = True
        verbose_name = "Address"
        verbose_name_plural = "Addresses"

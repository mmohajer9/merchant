from django.db import models
from django.utils import timezone
from django.contrib.auth.models import (
    AbstractUser,
)
from django.utils.translation import ugettext_lazy as _
from simple_history.models import HistoricalRecords
from imagekit.models import ImageSpecField
from imagekit.processors import ResizeToFill

# Create your models here.


def profile_pic_upload_to(self, filename):
    return f"accounts/{self.username}/profile_pics/{filename}"


class User(AbstractUser):

    GENDER_CHOICES = (
        ("male", _("Male")),
        ("female", _("Female")),
    )

    nat_code = models.CharField(
        _("National Code"), max_length=15, unique=True, blank=True, null=True
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
        blank=True,
        null=True,
        verbose_name=_("Gender"),
    )

    created_at = models.DateTimeField(
        _("Created at"), auto_now_add=True, blank=True, null=True
    )
    updated_at = models.DateTimeField(
        _("Updated at"), auto_now=True, blank=True, null=True
    )
    history = HistoricalRecords()

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


class SellerProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=500)
    business_phone = models.CharField(blank=True, null=True, max_length=15)

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
        verbose_name = "Seller Profile"
        verbose_name_plural = "Seller Profiles"

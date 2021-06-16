from django.db import models
from django.utils.translation import ugettext_lazy as _

# Create your models here.


class WebsiteConfiguration(models.Model):
    name = models.CharField(max_length=500, verbose_name=_("Name"))
    description = models.CharField(
        max_length=500, blank=True, null=True, verbose_name=_("Description")
    )
    # -------------------------------------------------------------------------

    # put your desired settings in here

    # -------------------------------------------------------------------------
    created_at = models.DateTimeField(
        _("Created at"), auto_now_add=True, blank=True, null=True
    )
    updated_at = models.DateTimeField(
        _("Updated at"), auto_now=True, blank=True, null=True
    )

    def __str__(self):
        return self.name

    class Meta:
        # db_table = ""
        # managed = True
        verbose_name = "Website Configuration"
        verbose_name_plural = "Website Configurations"

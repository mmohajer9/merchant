from django.db import models
from django.utils.translation import ugettext_lazy as _

# Create your models here.


class Role(models.Model):

    name = models.CharField(max_length=100, verbose_name=_("Role Name"), unique=True)
    is_admin = models.BooleanField(
        _("Management Role"),
        default=False,
        help_text=_(
            "If it is active, it means that it is used by officials, supervisors and management"
        ),
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
        verbose_name = _("Role")
        verbose_name_plural = _("Roles")

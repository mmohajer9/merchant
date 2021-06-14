from django.db import models
from django.utils import timezone
from django.contrib.auth.models import (
    AbstractUser,
)

# Create your models here.


class User(AbstractUser):
    nat_code = models.CharField(max_length=15, blank=True, null=True)
    mobile_phone = models.CharField(max_length=15, blank=True, null=True)
    date_of_birth = models.DateField(blank=True, null=True)

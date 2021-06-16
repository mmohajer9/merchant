# Generated by Django 3.2.4 on 2021-06-16 21:32

import autoslug.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0005_auto_20210616_1342'),
    ]

    operations = [
        migrations.AlterField(
            model_name='city',
            name='slug',
            field=autoslug.fields.AutoSlugField(editable=False, null=True, populate_from='name'),
        ),
        migrations.AlterField(
            model_name='country',
            name='name',
            field=models.CharField(max_length=50, unique=True, verbose_name='Country Name'),
        ),
        migrations.AlterField(
            model_name='province',
            name='slug',
            field=autoslug.fields.AutoSlugField(editable=False, null=True, populate_from='name'),
        ),
        migrations.AlterField(
            model_name='user',
            name='nat_code',
            field=models.CharField(blank=True, max_length=15, null=True, unique=True, verbose_name='National Code'),
        ),
    ]

# Generated by Django 3.2.4 on 2021-06-16 14:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0006_auto_20210616_1351'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='quantity',
            field=models.IntegerField(default=1, verbose_name='Quantity of product'),
        ),
    ]

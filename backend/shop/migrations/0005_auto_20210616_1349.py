# Generated by Django 3.2.4 on 2021-06-16 13:49

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0004_auto_20210616_1342'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='category',
            field=models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, to='shop.category', verbose_name='Category'),
        ),
        migrations.AlterField(
            model_name='product',
            name='discount',
            field=models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, to='shop.discount', verbose_name='Product Discount'),
        ),
    ]
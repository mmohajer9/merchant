# Generated by Django 3.2.4 on 2021-06-16 13:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0002_bookmark_cartitem_order_orderitem'),
    ]

    operations = [
        migrations.AddField(
            model_name='discount',
            name='is_active',
            field=models.BooleanField(default=False, verbose_name='Active'),
        ),
        migrations.AlterField(
            model_name='order',
            name='status',
            field=models.CharField(choices=[('pending', 'pending'), ('finished', 'finished'), ('aborted', 'aborted')], default='pending', max_length=100, verbose_name='Status'),
        ),
    ]

# Generated by Django 3.2.4 on 2021-06-16 10:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0002_auto_20210616_1024'),
    ]

    operations = [
        migrations.AddField(
            model_name='address',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, null=True, verbose_name='Created at'),
        ),
        migrations.AddField(
            model_name='address',
            name='updated_at',
            field=models.DateTimeField(auto_now=True, null=True, verbose_name='Updated at'),
        ),
    ]

# Generated by Django 4.2 on 2023-06-29 23:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0007_review_createdat'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='image',
            field=models.ImageField(blank=True, default='sample.png', null=True, upload_to=''),
        ),
    ]

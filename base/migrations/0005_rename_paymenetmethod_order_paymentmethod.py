# Generated by Django 4.2 on 2023-06-22 20:34

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0004_rename_numreivews_product_numreviews'),
    ]

    operations = [
        migrations.RenameField(
            model_name='order',
            old_name='paymenetMethod',
            new_name='paymentMethod',
        ),
    ]

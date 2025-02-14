# Generated by Django 5.1.3 on 2024-11-26 16:41

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0002_alter_userpreference_user_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='order',
            name='item',
        ),
        migrations.RemoveField(
            model_name='order',
            name='quantity',
        ),
        migrations.CreateModel(
            name='OrderFoodItem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantity', models.PositiveIntegerField()),
                ('food_item', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.fooditem')),
                ('order', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.order')),
            ],
            options={
                'unique_together': {('order', 'food_item')},
            },
        ),
    ]

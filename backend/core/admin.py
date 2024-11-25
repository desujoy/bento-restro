from django.contrib import admin
from .models import FoodItem, UserPreference, Order

# Register your models here.
admin.site.register(FoodItem)
admin.site.register(UserPreference)
admin.site.register(Order)

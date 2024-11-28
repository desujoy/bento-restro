from django.contrib import admin
from .models import (
    FoodItem,
    UserPreference,
    Order,
    FoodCategory,
    OrderFoodItem,
    Recipes,
)

# Register your models here.
admin.site.register(FoodItem)
admin.site.register(UserPreference)
admin.site.register(Order)
admin.site.register(FoodCategory)
admin.site.register(OrderFoodItem)
admin.site.register(Recipes)

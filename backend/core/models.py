from django.db import models
from django.contrib.auth.models import User


class FoodCategory(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class FoodItem(models.Model):
    name = models.CharField(max_length=100)
    category = models.ForeignKey(FoodCategory, on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=5, decimal_places=2)
    likes_count = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.name


class UserPreference(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    food_item = models.ForeignKey(FoodItem, on_delete=models.CASCADE)
    like = models.BooleanField()

    class Meta:
        unique_together = ("user", "food_item")


class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)


class OrderFoodItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    food_item = models.ForeignKey(FoodItem, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()

    class Meta:
        unique_together = ("order", "food_item")

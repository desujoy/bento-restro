from rest_framework import serializers
from .models import FoodItem, UserPreference, Order, FoodCategory


class FoodItemSerializer(serializers.ModelSerializer):
    category = serializers.StringRelatedField()

    class Meta:
        model = FoodItem
        fields = ["id", "name", "category", "price", "likes_count"]


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = FoodCategory
        fields = ["id", "name"]


class UserPreferenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserPreference
        fields = ["id", "user", "food_item", "like"]


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ["id", "user", "item", "quantity", "total_price", "timestamp"]

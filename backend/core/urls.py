from django.urls import path
from .views import FoodItemList, UserPreferenceCreate, OrderCreate, SignupView

urlpatterns = [
    path("food-items/", FoodItemList.as_view(), name="food-item-list"),
    path("preferences/", UserPreferenceCreate.as_view(), name="user-preference"),
    path("orders/", OrderCreate.as_view(), name="create-order"),
    path("signup/", SignupView.as_view(), name="signup"),
]

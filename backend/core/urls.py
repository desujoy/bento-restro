from django.urls import path
from .views import (
    FoodItemList,
    CategoryList,
    UserPreferenceCreate,
    OrderCreate,
    SignupView,
    SessionView,
)

urlpatterns = [
    path("categories/", CategoryList.as_view(), name="category-list"),
    path("food-items/", FoodItemList.as_view(), name="food-item-list"),
    path("preferences/", UserPreferenceCreate.as_view(), name="user-preference"),
    path("orders/", OrderCreate.as_view(), name="create-order"),
    path("signup/", SignupView.as_view(), name="signup"),
    path("session/", SessionView.as_view(), name="session"),
]

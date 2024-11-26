from rest_framework import generics, permissions, status
from .models import FoodItem, UserPreference, Order, FoodCategory
from .serializers import (
    FoodItemSerializer,
    UserPreferenceSerializer,
    OrderSerializer,
    CategorySerializer,
)
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
import re


class SignupView(APIView):
    def post(self, request):
        data = request.data
        username = data.get("username")
        password = data.get("password")
        confirmPassword = data.get("confirmPassword")
        email = data.get("email")

        if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
            return Response(
                {"error": "Invalid email address"}, status=status.HTTP_400_BAD_REQUEST
            )

        if password != confirmPassword:
            return Response(
                {"error": "Passwords do not match"}, status=status.HTTP_400_BAD_REQUEST
            )

        if User.objects.filter(username=username).exists():
            return Response(
                {"error": "Username already exists"}, status=status.HTTP_400_BAD_REQUEST
            )

        user = User.objects.create(
            username=username, email=email, password=make_password(password)
        )
        return Response(
            {"message": "User created successfully"}, status=status.HTTP_201_CREATED
        )


class CategoryList(generics.ListAPIView):
    queryset = FoodCategory.objects.all()
    serializer_class = CategorySerializer


class FoodItemList(generics.ListAPIView):
    queryset = FoodItem.objects.all().order_by("-likes_count")
    serializer_class = FoodItemSerializer

    def get_queryset(self):
        queryset = FoodItem.objects.all().order_by("-likes_count")
        category = self.request.query_params.get("category", None)
        if category is not None:
            queryset = queryset.filter(category=category)
        return queryset


class UserPreferenceCreate(generics.ListCreateAPIView, generics.UpdateAPIView):
    serializer_class = UserPreferenceSerializer
    permission_classes = [permissions.IsAuthenticated]
    queryset = UserPreference.objects.all()

    def get(self, request, *args, **kwargs):
        user = request.user
        if not user.is_authenticated:
            return Response(
                {"error": "User is not authenticated"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        user_preferences = UserPreference.objects.filter(user=user.id)
        return Response(
            UserPreferenceSerializer(user_preferences, many=True).data,
            status=status.HTTP_200_OK,
        )

    def post(self, request, *args, **kwargs):
        request.data["user"] = request.user.id
        userpreference = UserPreference.objects.filter(
            user=request.user.id, food_item=request.data["food_item"]
        )
        if userpreference.exists():
            userpreference.delete()
        like = request.data["like"]
        if like:
            FoodItem.objects.filter(id=request.data["food_item"]).update(
                likes_count=FoodItem.objects.get(
                    id=request.data["food_item"]
                ).likes_count
                + 1
            )
        else:
            FoodItem.objects.filter(id=request.data["food_item"]).update(
                likes_count=FoodItem.objects.get(
                    id=request.data["food_item"]
                ).likes_count
                - 1
            )
        return super().post(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        request.data["user"] = request.user.id
        return super().put(request, *args, **kwargs)


class OrderCreate(generics.CreateAPIView):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        request.data["user"] = request.user.id
        return super().post(request, *args, **kwargs)


class SessionView(APIView):
    def get(self, request):
        user = request.user
        if not user.is_authenticated:
            return Response(
                {"error": "User is not authenticated"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        return Response(
            {"username": user.username, "email": user.email}, status=status.HTTP_200_OK
        )

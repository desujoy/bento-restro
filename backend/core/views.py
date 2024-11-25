from rest_framework import generics, permissions, status
from .models import FoodItem, UserPreference, Order
from .serializers import FoodItemSerializer, UserPreferenceSerializer, OrderSerializer
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


class FoodItemList(generics.ListAPIView):
    queryset = FoodItem.objects.all().order_by("-likes_count")
    serializer_class = FoodItemSerializer

    def get_queryset(self):
        queryset = FoodItem.objects.all().order_by("-likes_count")
        category = self.request.query_params.get("category", None)
        if category is not None:
            queryset = queryset.filter(category=category)
        return queryset


class UserPreferenceCreate(generics.CreateAPIView, generics.UpdateAPIView):
    serializer_class = UserPreferenceSerializer
    permission_classes = [permissions.IsAuthenticated]
    queryset = UserPreference.objects.all()

    def post(self, request, *args, **kwargs):
        request.data["user"] = request.user.id
        if UserPreference.objects.filter(
            user=request.user.id, food_item=request.data["food_item"]
        ).exists():
            return Response(
                {"error": "UserPreference already exists"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        FoodItem.objects.filter(id=request.data["food_item"]).update(
            likes_count=FoodItem.objects.get(id=request.data["food_item"]).likes_count
            + 1
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

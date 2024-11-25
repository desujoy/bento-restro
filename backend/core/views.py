from rest_framework import generics, permissions, status
from .models import FoodItem, UserPreference, Order
from .serializers import FoodItemSerializer, UserPreferenceSerializer, OrderSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password


class SignupView(APIView):
    def post(self, request):
        data = request.data
        username = data.get("username")
        password = data.get("password")
        email = data.get("email")

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
    queryset = FoodItem.objects.all()
    serializer_class = FoodItemSerializer


class UserPreferenceCreate(generics.CreateAPIView):
    serializer_class = UserPreferenceSerializer
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        request.data["user"] = request.user.id
        return super().post(request, *args, **kwargs)


class OrderCreate(generics.CreateAPIView):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        request.data["user"] = request.user.id
        return super().post(request, *args, **kwargs)

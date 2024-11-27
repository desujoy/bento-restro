from rest_framework import generics, permissions, status
from .models import (
    FoodItem,
    UserPreference,
    Order,
    FoodCategory,
    OrderFoodItem,
    Recipes,
)
from .serializers import (
    FoodItemSerializer,
    UserPreferenceSerializer,
    CategorySerializer,
)
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from django.core.paginator import Paginator
import re
import yaml


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


class CategoryList(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        categories = FoodCategory.objects.all()
        return Response(
            CategorySerializer(categories, many=True).data, status=status.HTTP_200_OK
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


class OrderCreate(APIView):
    def post(self, request):
        user = request.user
        if not user.is_authenticated:
            return Response(
                {"error": "User is not authenticated"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        cart = request.data.get("cart")
        order = Order.objects.create(user=user)
        for item in cart:
            OrderFoodItem.objects.create(
                order=order,
                food_item=FoodItem.objects.get(id=item["id"]),
                quantity=item["quantity"],
            )
        return Response(
            {"message": "Order created successfully"}, status=status.HTTP_201_CREATED
        )


class OrderView(APIView):
    def get(self, request):
        user = request.user
        if not user.is_authenticated:
            return Response(
                {"error": "User is not authenticated"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        limit = request.query_params.get("limit", 5)
        offset = request.query_params.get("offset", 1)
        orders = Order.objects.filter(user=user).order_by("-timestamp")
        paginator = Paginator(orders, limit)
        page = paginator.get_page(offset)
        orders = page.object_list
        data = []
        for order in orders:
            items = OrderFoodItem.objects.filter(order=order)
            order_data = {"id": order.id, "items": []}
            total_price = 0
            for item in items:
                total_price += item.food_item.price * item.quantity
                order_data["items"].append(
                    {
                        "id": item.food_item.id,
                        "name": item.food_item.name,
                        "price": item.food_item.price,
                        "quantity": item.quantity,
                        "total": item.food_item.price * item.quantity,
                    }
                )
            order_data["total_price"] = total_price
            order_data["timestamp"] = order.timestamp
            data.append(order_data)
        return Response(data, status=status.HTTP_200_OK)


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


class RecipesView(APIView):
    def post(self, request):
        user = request.user
        if not user.is_authenticated:
            return Response(
                {"error": "User is not authenticated"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        recipe = request.data.get("recipe")
        if not recipe:
            return Response(
                {"error": "Recipe file is required"}, status=status.HTTP_400_BAD_REQUEST
            )
        recipe = yaml.safe_load(recipe)
        if not recipe:
            return Response(
                {"error": "Invalid recipe file"}, status=status.HTTP_400_BAD_REQUEST
            )
        Recipes.objects.create(user=user, recipe_file=recipe, status="pending")
        return Response(
            {"message": "Recipe created successfully"}, status=status.HTTP_201_CREATED
        )

    def get(self, request):
        user = request.user
        if not user.is_authenticated:
            return Response(
                {"error": "User is not authenticated"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        recipes = Recipes.objects.filter(user=user)
        data = []
        for recipe in recipes:
            data.append(recipe.recipe_file)
        return Response(data, status=status.HTTP_200_OK)

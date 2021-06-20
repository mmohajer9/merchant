from rest_framework.response import Response
from rest_framework.views import APIView
from shop.filters import ProductFilter
from django.db.models.query_utils import Q
from django.db.models import Sum, F
from rest_framework import status, viewsets
from rest_framework import permissions

from .serializers import OrderItemSerializer, OrderSerializer, ProductSerializer
from .pagination import CustomLimitOffsetPagination
from .generics import EnhancedModelViewSet
from .permissions import (
    HavePendingOrder,
    IsOrderOwner,
    IsOwner,
    IsNotSeller,
    Forbidden,
    IsSeller,
    IsSellerOwner,
)
from .models import Order, OrderItem, Product

# Create your views here.


class ProductViewSet(EnhancedModelViewSet):
    def get_queryset(self):
        return Product.objects.filter(~Q(seller__user=self.request.user.id))

    lookup_field = "slug"

    pagination_class = CustomLimitOffsetPagination
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    filterset_class = ProductFilter
    # search_fields = ["title", "business_phone", "description", "user__username"]
    ordering_fields = "__all__"
    ordering = ["-updated_at"]

    # override per action
    # action_serializers = {
    #     # "list": Serializer1,
    #     # "create": Serializer2,
    #     # "retrieve": SellerDetailSerializer,
    #     # "update": Serializer4,
    #     # "partial_update": Serializer5,
    #     # "destroy": Serializer6,
    # }

    # override per action
    action_permission_classes = {
        "list": [permissions.AllowAny],
        "create": [permissions.IsAuthenticated, IsSeller],
        "retrieve": [permissions.AllowAny],
        "update": [permissions.IsAuthenticated, IsSellerOwner],
        "partial_update": [permissions.IsAuthenticated, IsSellerOwner],
        "destroy": [permissions.IsAuthenticated, IsSellerOwner],
    }


class OrderViewSet(EnhancedModelViewSet):
    """
    [summary]
        Creating Order + OrderItems only with just one request to this api
        Choose your products and it will create Order and Order Items Automatically
        Sample:
            {
                "products": [
                    {
                        "product_id" : 1,
                        "quantity" : 3
                    },
                    {
                        "product_id" : 2,
                        "quantity" : 4
                    },
                    {
                        "product_id" : 3,
                        "quantity" : 5
                    }
                ]
            }
    """

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user.id)

    pagination_class = CustomLimitOffsetPagination
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwner]

    # override per action
    action_permission_classes = {
        "destroy": [Forbidden],
        "update": [Forbidden],
        "partial_update": [Forbidden],
    }

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class OrderItemViewSet(EnhancedModelViewSet):
    def get_queryset(self):
        return OrderItem.objects.filter(order__user=self.request.user.id)

    pagination_class = CustomLimitOffsetPagination
    serializer_class = OrderItemSerializer
    permission_classes = [permissions.IsAuthenticated, IsOrderOwner]

    action_permission_classes = {
        "create": [Forbidden],
    }


class CheckOut(APIView):
    def post(self, request, *args, **kwargs):
        try:
            user = request.user
            balance = user.balance
            order = Order.objects.filter(user=user, status="pending").latest(
                "updated_at"
            )
            total_price = order.orderitem_set.annotate(
                total_price=F("price") * F("quantity")
            ).aggregate(Sum("total_price"))["total_price__sum"]

            if balance < total_price:
                message = {"error": "Insufficient balance, Please charge your account"}
                return Response(message, status=status.HTTP_406_NOT_ACCEPTABLE)
            else:
                # modifications
                order.status = "finished"
                user.balance -= total_price
                order.save()
                user.save()
                # returning appropriate message
                message = {"message", "Your order is now completed and finished"}
                return Response(message, status=status.HTTP_202_ACCEPTED)
        except Exception as e:
            error = {"error": "Operation was Failed"}
            return Response(error, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, *args, **kwargs):
        try:
            user = request.user
            order = Order.objects.filter(user=user, status="pending").latest(
                "updated_at"
            )
            order.status = "aborted"
            order.save()
            message = {"message": "Your order is now aborted"}
            return Response(message, status=status.HTTP_202_ACCEPTED)
        except Exception as e:
            error = {"error": "Operation was Failed"}
            return Response(error, status=status.HTTP_400_BAD_REQUEST)

    permission_classes = [permissions.IsAuthenticated, HavePendingOrder]

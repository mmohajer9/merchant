from rest_framework.response import Response
from shop.filters import ProductFilter
from django.db.models.query_utils import Q
from rest_framework import status, viewsets
from rest_framework import permissions

from .serializers import OrderItemSerializer, OrderSerializer, ProductSerializer
from .pagination import CustomLimitOffsetPagination
from .generics import EnhancedModelViewSet
from .permissions import (
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
    def get_queryset(self):
        return Order.objects.filter(user=self.request.user.id)

    pagination_class = CustomLimitOffsetPagination
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwner]

    # override per action
    action_permission_classes = {
        "destroy": [Forbidden],
    }

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(
            serializer.data, status=status.HTTP_201_CREATED, headers=headers
        )

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


# class OrderItemViewSet(EnhancedModelViewSet):
#     def get_queryset(self):
#         return OrderItem.objects.filter(order__user=self.request.user.id)

#     pagination_class = CustomLimitOffsetPagination
#     serializer_class = OrderItemSerializer
#     permission_classes = [permissions.IsAuthenticated, IsOrderOwner]

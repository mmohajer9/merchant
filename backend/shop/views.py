from django.db.models.query_utils import Q
from rest_framework import viewsets
from rest_framework import permissions

from .serializers import ProductSerializer
from .pagination import CustomLimitOffsetPagination
from .generics import EnhancedModelViewSet
from .permissions import IsOwner, IsNotSeller, Forbidden, IsSeller, IsSellerOwner
from .models import Product

# Create your views here.


class ProductViewSet(EnhancedModelViewSet):
    def get_queryset(self):
        return Product.objects.filter(~Q(seller__user=self.request.user.id))

    lookup_field = "slug"

    pagination_class = CustomLimitOffsetPagination
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    # filterset_class = ProductFilter
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

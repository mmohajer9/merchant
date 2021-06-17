from rest_framework import viewsets
from rest_framework import permissions

# from rest_framework.response import Response
# from django.shortcuts import get_object_or_404

from .models import Country, Province, City, Seller, Address
from .serializers import (
    CountrySerializer,
    ProvinceSerializer,
    CitySerializer,
    SellerSerializer,
    SellerDetailSerializer,
    AddressSerializer,
)
from .generics import EnhancedModelViewSet
from .permissions import IsOwner, IsNotSeller, Forbidden
from .filters import SellerFilter

# Create your views here.


class CountryViewSet(viewsets.ReadOnlyModelViewSet):

    queryset = Country.objects.all()
    serializer_class = CountrySerializer
    permission_classes = [permissions.AllowAny]


class ProvinceViewSet(viewsets.ReadOnlyModelViewSet):

    queryset = Province.objects.all()
    serializer_class = ProvinceSerializer
    permission_classes = [permissions.AllowAny]


class CityViewSet(viewsets.ReadOnlyModelViewSet):

    queryset = City.objects.all()
    serializer_class = CitySerializer
    permission_classes = [permissions.AllowAny]


class SellerViewSet(EnhancedModelViewSet):

    queryset = Seller.objects.all()

    # default serializer and permission classes
    serializer_class = SellerSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwner]
    filterset_class = SellerFilter
    search_fields = ["title", "business_phone", "description", "user__username"]
    ordering_fields = '__all__'
    ordering = ["id"]

    # override per action
    action_serializers = {
        # "list": Serializer1,
        # "create": Serializer2,
        "retrieve": SellerDetailSerializer,
        # "update": Serializer4,
        # "partial_update": Serializer5,
        # "destroy": Serializer6,
    }

    # override per action
    action_permission_classes = {
        "list": [permissions.AllowAny],
        "create": [permissions.IsAuthenticated, IsNotSeller],
        "retrieve": [permissions.AllowAny],
        "update": [permissions.IsAuthenticated, IsOwner],
        "partial_update": [permissions.IsAuthenticated, IsOwner],
        "destroy": [permissions.IsAuthenticated, IsOwner],
    }

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    lookup_field = "user__username"


class AddressViewSet(EnhancedModelViewSet):
    def get_queryset(self):
        return Address.objects.filter(user=self.request.user).order_by("id")

    # default serializer and permission classes
    serializer_class = AddressSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwner]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

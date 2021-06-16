from rest_framework import viewsets

# from rest_framework.response import Response
# from django.shortcuts import get_object_or_404

from .models import Country, Province, City, Seller, Address
from .serializers import CountrySerializer, ProvinceSerializer, CitySerializer

# Create your views here.


class CountryViewSet(viewsets.ReadOnlyModelViewSet):

    queryset = Country.objects.all()
    serializer_class = CountrySerializer


class ProvinceViewSet(viewsets.ReadOnlyModelViewSet):

    queryset = Province.objects.all()
    serializer_class = ProvinceSerializer


class CityViewSet(viewsets.ReadOnlyModelViewSet):

    queryset = City.objects.all()
    serializer_class = CitySerializer

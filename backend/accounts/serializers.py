from rest_framework import serializers
from .models import Country, Province, City, Seller, Address


class CitySerializer(serializers.ModelSerializer):

    country = serializers.SerializerMethodField()
    province = serializers.SerializerMethodField()

    class Meta:
        model = City
        fields = ("id", "name", "slug", "province", "country")

    def get_country(self, obj):
        return obj.related_province.related_country.name

    def get_province(self, obj):
        return obj.related_province.name


class ProvinceSerializer(serializers.ModelSerializer):

    country = serializers.SerializerMethodField()

    class Meta:
        model = Province
        fields = ("id", "name", "slug", "country")

    def get_country(self, obj):
        return obj.related_country.name


class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = ("id", "name", "slug")

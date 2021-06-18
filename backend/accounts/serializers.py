from rest_framework.exceptions import ValidationError
from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.conf import settings
from drf_extra_fields.fields import HybridImageField

from dj_rest_auth.serializers import PasswordResetConfirmSerializer

# from allauth.account.utils import url_str_to_user_pk
# from allauth.account.forms import default_token_generator
from allauth.account.admin import EmailAddress

from .models import Country, Province, City, Seller, Address

UserModel = get_user_model()


class MyPasswordResetConfirmSerializer(PasswordResetConfirmSerializer):
    def validate(self, attrs):
        from django.contrib.auth.tokens import default_token_generator
        from django.utils.http import urlsafe_base64_decode as uid_decoder
        from django.utils.encoding import force_str

        # Decode the uidb64 to uid to get User object
        try:
            uid = force_str(uid_decoder(attrs["uid"]))
            self.user = UserModel._default_manager.get(pk=uid)
        except (TypeError, ValueError, OverflowError, UserModel.DoesNotExist):
            raise ValidationError({"uid": ["Invalid value"]})

        if not default_token_generator.check_token(self.user, attrs["token"]):
            raise ValidationError({"token": ["Invalid value"]})

        self.custom_validation(attrs)
        # Construct SetPasswordForm instance
        self.set_password_form = self.set_password_form_class(
            user=self.user,
            data=attrs,
        )
        if not self.set_password_form.is_valid():
            raise serializers.ValidationError(self.set_password_form.errors)

        return attrs


class UserDetailsSerializer(serializers.ModelSerializer):
    """
    User model w/o password
    """

    # @staticmethod
    # def validate_username(username):
    #     if "allauth.account" not in settings.INSTALLED_APPS:
    #         # We don't need to call the all-auth
    #         # username validator unless its installed
    #         return username

    #     from allauth.account.adapter import get_adapter

    #     username = get_adapter().clean_username(username)
    #     return username

    profile_pic = HybridImageField(required=False)
    is_email_verified = serializers.SerializerMethodField()

    class Meta:
        extra_fields = []

        if hasattr(UserModel, "USERNAME_FIELD"):
            extra_fields.append(UserModel.USERNAME_FIELD)
        if hasattr(UserModel, "EMAIL_FIELD"):
            extra_fields.append(UserModel.EMAIL_FIELD)
        if hasattr(UserModel, "first_name"):
            extra_fields.append("first_name")
        if hasattr(UserModel, "last_name"):
            extra_fields.append("last_name")

        model = UserModel
        fields = [
            "pk",
            "id",
            *extra_fields,
            "is_active",
            "nat_code",
            "mobile_phone",
            "telephone",
            "birth_date",
            "profile_pic",
            "gender",
            "date_joined",
            "created_at",
            "updated_at",
            "balance",
            "is_email_verified",
        ]
        # fields = ("pk", *extra_fields)
        read_only_fields = ("is_active", "date_joined", "balance")

    def get_is_email_verified(self, obj):
        try:
            return obj.emailaddress_set.first().verified
        except:
            return False


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = (
            "id",
            "last_login",
            "username",
            "first_name",
            "last_name",
            "is_active",
            "profile_pic",
            "gender",
        )


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


class SellerSerializer(serializers.ModelSerializer):

    username = serializers.SerializerMethodField()

    class Meta:
        model = Seller
        fields = (
            "id",
            "title",
            "slug",
            "business_phone",
            "description",
            "created_at",
            "updated_at",
            "user_id",
            "username",
        )

    def get_username(self, obj):
        return obj.user.username


class SellerDetailSerializer(serializers.ModelSerializer):

    user = UserSerializer(many=False, read_only=True)

    class Meta:
        model = Seller
        fields = (
            "id",
            "title",
            "slug",
            "business_phone",
            "description",
            "created_at",
            "updated_at",
            "user",
        )


class AddressSerializer(serializers.ModelSerializer):

    username = serializers.SerializerMethodField()
    location = serializers.SerializerMethodField()

    class Meta:
        model = Address
        fields = (
            "id",
            "postal_code",
            "line1",
            "line2",
            "created_at",
            "updated_at",
            "user_id",
            "city",
            "username",
            "location",
        )

    def get_username(self, obj):
        return obj.user.username

    def get_location(self, obj):
        return {
            "country": obj.city.related_province.related_country.name,
            "province": obj.city.related_province.name,
            "city": obj.city.name,
        }

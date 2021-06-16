from django_filters import rest_framework as filters

from .models import (
    Seller,
)

# ? Useful Model Functions
from django.db.models import (
    functions,
    Value,
    # Count,
    # Subquery,
    # F,
    # Q,
    # Case,
    # When
)


class UsersFilter(filters.FilterSet):

    search_first_name = filters.CharFilter(
        field_name="first_name", lookup_expr="icontains"
    )
    search_last_name = filters.CharFilter(
        field_name="last_name", lookup_expr="icontains"
    )
    search_full_name = filters.CharFilter(method="filter_by_full_name")
    search_username = filters.CharFilter(
        field_name="username", lookup_expr="istartswith"
    )
    search_field_of_study = filters.CharFilter(
        field_name="academic_profile__field_of_study", lookup_expr="icontains"
    )
    search_department = filters.CharFilter(
        field_name="academic_profile__department", lookup_expr="icontains"
    )
    search_mobile_phone = filters.CharFilter(
        field_name="mobile_phone", lookup_expr="istartswith"
    )
    search_telephone = filters.CharFilter(
        field_name="telephone", lookup_expr="istartswith"
    )
    search_room_number = filters.CharFilter(
        field_name="room__room_number", lookup_expr="istartswith"
    )
    search_nat_code = filters.CharFilter(
        field_name="nat_code", lookup_expr="istartswith"
    )

    class Meta:
        model = User

        # ? this will generate 'exact' lookups for the fields in this list
        fields = [
            # ? can be relationship paths like : member__user__username
            # ^ By User Model
            "gender",
            "nat_code",
            "username",
            "first_name",
            "last_name",
            "telephone",
            "birth_date",
            # ^ By Hoteling Info
            "room__dormitory",
            "room__dormitory__dormitory_complex",
            # ^ By Academic_Profile Model
            "academic_profile__entrance_semester",
            "academic_profile__field_of_study",
            "academic_profile__dad_phone",
            "academic_profile__mom_phone",
            "academic_profile__native",
            "academic_profile__grade",
            "academic_profile__academic_type",
            "academic_profile__last_academic_state",
        ]

        # ? you can use a dictionary for more additional details
        # fields = {
        #     'price': ['lt', 'gt'],
        #     'release_date': ['iexact', 'year__gt'],
        # }

    def filter_by_full_name(self, queryset, name, value):
        annotated_qs = queryset.annotate(
            full_name=functions.Concat("first_name", Value(" "), "last_name")
        )
        filtered_qs = annotated_qs.filter(full_name__icontains=value)
        return filtered_qs

    # ? for over riding the base queryset that given from view to filter class
    # ? used for making request based filters
    # @property
    # def qs(self):
    #     parent = super().qs
    #     author = getattr(self.request, 'user', None)

    #     return parent.filter(is_published=True) \
    #         | parent.filter(author=author)

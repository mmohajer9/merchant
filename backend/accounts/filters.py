from django_filters import rest_framework as filters

from .models import (
    Seller,
)

# from django.db.models import (
#     # functions,
#     # Value,
#     # # Count,
#     # # Subquery,
#     # # F,
#     # # Q,
#     # # Case,
#     # # When
# )


class SellerFilter(filters.FilterSet):
    class Meta:
        model = Seller

        fields = "__all__"

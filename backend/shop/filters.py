from django_filters.rest_framework import FilterSet
from .models import (
    Product,
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


class ProductFilter(FilterSet):
    class Meta:
        model = Product

        fields = {"quantity": ["lt", "gt", "exact"]}

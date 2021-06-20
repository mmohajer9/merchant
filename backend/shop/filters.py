from django_filters import rest_framework as filters

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


class ProductFilter(filters.FilterSet):
    class Meta:
        model = Product

        fields = [
            "quantity",
        ]

from rest_framework.pagination import (
    LimitOffsetPagination,
    # PageNumberPagination,
    # BasePagination,
    # CursorPagination,
    # DjangoPaginator
)


class CustomLimitOffsetPagination(LimitOffsetPagination):
    max_limit = 100
    default_limit = 20
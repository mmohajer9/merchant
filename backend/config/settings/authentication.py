from datetime import timedelta

# ? Django Authentication Settings

AUTHENTICATION_BACKENDS = [
    # Needed to login by username in Django admin, regardless of `allauth`
    "django.contrib.auth.backends.ModelBackend",
    # `allauth` specific authentication methods, such as login by e-mail
    "allauth.account.auth_backends.AuthenticationBackend",
]

AUTH_USER_MODEL = "accounts.User"

# LOGIN_URL = None
# LOGIN_REDIRECT_URL = None
# LOGOUT_REDIRECT_URL = None


# ? Related to Sites Framework (needed by dj-rest-auth registration)

SITE_ID = 1

# ? allauth , dj-rest-auth , simpleJWT settings

ACCOUNT_AUTHENTICATION_METHOD = "username_email"

REST_USE_JWT = True

JWT_AUTH_RETURN_EXPIRATION = True

# JWT_AUTH_COOKIE = "merchant-access"

# JWT_AUTH_REFRESH_COOKIE = 'merchant-refresh'

ACCOUNT_LOGOUT_ON_GET = False

OLD_PASSWORD_FIELD_ENABLED = True

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(hours=12),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=30),
    "ROTATE_REFRESH_TOKENS": True,
    "BLACKLIST_AFTER_ROTATION": True,
    "UPDATE_LAST_LOGIN": True,
    # 'ALGORITHM': 'HS256',
    # 'SIGNING_KEY': SECRET_KEY,
    # 'VERIFYING_KEY': None,
    # 'AUDIENCE': None,
    # 'ISSUER': None,
    # 'AUTH_HEADER_TYPES': ('Bearer',),
    # 'USER_ID_FIELD': 'id',
    # 'USER_ID_CLAIM': 'user_id',
    # 'AUTH_TOKEN_CLASSES': ('rest_framework_simplejwt.tokens.AccessToken',),
    # 'TOKEN_TYPE_CLAIM': 'token_type',
    # 'JTI_CLAIM': 'jti',
    # 'SLIDING_TOKEN_REFRESH_EXP_CLAIM': 'refresh_exp',
    # 'SLIDING_TOKEN_LIFETIME': timedelta(minutes=5),
    # 'SLIDING_TOKEN_REFRESH_LIFETIME': timedelta(days=1),
}

REST_AUTH_SERIALIZERS = {
    "USER_DETAILS_SERIALIZER": "accounts.serializers.UserDetailsSerializer",
    "PASSWORD_RESET_CONFIRM_SERIALIZER": "accounts.serializers.MyPasswordResetConfirmSerializer",
}

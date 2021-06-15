const routes = {
  homepage: '/',
  profile: '/profile',
  cart: '/cart',
  authentication: '/auth',
  aboutus: '/aboutus',
  contactus: '/contactus',

  api: {
    login: {
      path: '/api/v1/accounts/rest-auth/login/',
      payload: {
        username: 'string',
        email: 'user@example.com',
        password: 'string',
      },
    },
    logout: {
      path: '/api/v1/accounts/rest-auth/logout/',
    },
    changePassword: {
      path: '/api/v1/accounts/rest-auth/password/change/',
      payload: {
        old_password: 'string',
        new_password1: 'string',
        new_password2: 'string',
      },
    },
    resetPassword: {
      path: '/api/v1/accounts/rest-auth/password/reset/',
      payload: {
        email: 'user@example.com',
      },
    },
    resetPasswordConfirm: {
      path: '/api/v1/accounts/rest-auth/password/reset/confirm/',
      payload: {
        new_password1: 'string',
        new_password2: 'string',
        uid: 'string',
        token: 'string',
      },
    },
    registration: {
      path: '/api/v1/accounts/rest-auth/registration/',
      payload: {
        username: 'string',
        email: 'user@example.com',
        password1: 'string',
        password2: 'string',
      },
    },
    registrationVerifyEmail: {
      path: '/api/v1/accounts/rest-auth/registration/verify-email/',
      payload: {
        key: 'string',
      },
    },
    tokenRefresh: {
      path: '/api/v1/accounts/rest-auth/token/refresh/',
      payload: {
        refresh: 'string',
      },
    },
    tokenVerify: {
      path: '/api/v1/accounts/rest-auth/token/verify/',
      payload: {
        token: 'string',
      },
    },
    userDetail: {
      path: '/api/v1/accounts/rest-auth/user/',
    },
  },
};

export default routes;

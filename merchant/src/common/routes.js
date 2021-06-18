const routes = {
  homepage: '/',
  profile: '/profile',
  cart: '/cart',
  authentication: '/auth',
  aboutus: '/aboutus',
  contactus: '/contactus',

  api: {
    login: {
      path: '/api/rest-auth/login/',
      payload: {
        username: 'string',
        email: 'user@example.com',
        password: 'string',
      },
    },
    logout: {
      path: '/api/rest-auth/logout/',
    },
    changePassword: {
      path: '/api/rest-auth/password/change/',
      payload: {
        old_password: 'string',
        new_password1: 'string',
        new_password2: 'string',
      },
    },
    resetPassword: {
      path: '/api/rest-auth/password/reset/',
      payload: {
        email: 'user@example.com',
      },
    },
    resetPasswordConfirm: {
      path: '/api/rest-auth/password/reset/confirm/',
      payload: {
        new_password1: 'string',
        new_password2: 'string',
        uid: 'string',
        token: 'string',
      },
    },
    registration: {
      path: '/api/rest-auth/registration/',
      payload: {
        username: 'string',
        email: 'user@example.com',
        password1: 'string',
        password2: 'string',
      },
    },
    registrationVerifyEmail: {
      path: '/api/rest-auth/registration/verify-email/',
      payload: {
        key: 'string',
      },
    },
    tokenRefresh: {
      path: '/api/rest-auth/token/refresh/',
      payload: {
        refresh: 'string',
      },
    },
    tokenVerify: {
      path: '/api/rest-auth/token/verify/',
      payload: {
        token: 'string',
      },
    },
    userDetail: {
      path: '/api/rest-auth/user/',
    },
    userUpdate: {
      path: '/api/rest-auth/user/',
      payload: {
        username: 'string',
        email: 'user@example.com',
        first_name: 'string',
        last_name: 'string',
        nat_code: 'string',
        mobile_phone: 'string',
        telephone: 'string',
        birth_date: '2019-08-24',
        gender: 'male',
      },
    },
  },
};

export default routes;

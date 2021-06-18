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
        profile_pic: '',
      },
    },
    productList: {
      path: '/api/v1/shop/products/',
    },
    productCreate: {
      path: '/api/v1/shop/products/',
      payload: {
        name: '',
        description: '',
        image: null,
        price: null,
        quantity: null,
        subcategory: null,
        discount: null,
      },
    },
    productDetail: {
      path: '/api/v1/shop/products/',
      payload: {
        id: 5,
        name: 'Oppo A10',
        slug: 'oppo-a10',
        description: null,
        image: 'http://127.0.0.1:8000/media/products/mmohajer9/1642870-02.jpeg',
        price: '1500.00',
        quantity: 1,
        created_at: '2021-06-18T17:52:35.546510Z',
        updated_at: '2021-06-18T17:52:35.546554Z',
        subcategory: 1,
        discount: null,
        seller_id: 4,
      },
    },
    productUpdate: {
      path: '/api/v1/shop/products/',
      payload: {
        name: 'Oppo A10',
        description: null,
        image: 'http://127.0.0.1:8000/media/products/mmohajer9/1642870-02.jpeg',
        price: '1500.00',
        quantity: 1,
        subcategory: 1,
        discount: null,
      },
    },
  },
};

export default routes;

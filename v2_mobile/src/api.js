import axios from "axios";
import store from "store";

var token = "";
store.subscribe(() => {
  if (store.getState()?.user.token !== "") {
    token = store.getState()?.user.token;
  } else {
    token = "";
  }
});

const itdaApi = axios.create({
  baseURL:
    "http://itda-api-2.eba-iahuraib.ap-northeast-2.elasticbeanstalk.com/",
});

var api = axios.create({
  baseURL: "http://127.0.0.1:8000",
  // headers: {
  //   Authorization: store.getState()?.user.token,
  //   'Content-Type': 'application/json',
  //   // 'Access-Control-Allow-Origin': 'http://127.0.0.1:3000',
  //   // 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  //   // 'Access-Control-Allow-Headers':
  //   //   'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
  // },
});

export const testApi = {
  apiTablets: (page) => itdaApi.get(`api/v1/laptops/${page}`),
  filterapiTablets: (
    brand,
    min_price,
    max_price,
    os,
    memory,
    storage,
    weight,
    inch,
    pagestr
  ) => {
    return itdaApi.get(
      `api/v1/laptops/filtered?br=${brand}&lp=${min_price}&mp=${max_price}&os=${os}&me=${memory}&st=${storage}&we=${weight}&in=${inch}&${pagestr}`
    );
  },
  brandTablets: (brand, pagestr) =>
    itdaApi.get(`api/v1/laptops/${brand}/${pagestr}`),
};

export const productsApi = {
  apiProducts: (pageNum, filterOption) =>
    api.get(`products/?page=${pageNum}&filter=${filterOption}`),
  apiClothes: (pageNum, filterOption) =>
    api.get(`products/?page=${pageNum}&filter=${filterOption}`),
  apiAccesories: (pageNum, filterOption) =>
    api.get(`products/?page=${pageNum}&filter=${filterOption}`),
  apiOutside: (pageNum, filterOption) =>
    api.get(`products/?page=${pageNum}&filter=${filterOption}`),
  apiHarnesses: (pageNum, filterOption) =>
    api.get(`products/?page=${pageNum}&filter=${filterOption}`),
  apiLeaders: (pageNum, filterOption) =>
    api.get(`products/?page=${pageNum}&filter=${filterOption}`),
  apiAutoLeaders: (pageNum, filterOption) =>
    api.get(`products/?page=${pageNum}&filter=${filterOption}`),
  apiCarriers: (pageNum, filterOption) =>
    api.get(`products/?page=${pageNum}&filter=${filterOption}`),
  apiEnvelopes: (pageNum, filterOption) =>
    api.get(`products/?page=${pageNum}&filter=${filterOption}`),
  apiHouse: (pageNum, filterOption) =>
    api.get(`products/?page=${pageNum}&filter=${filterOption}`),
  apiHomes: (pageNum, filterOption) =>
    api.get(`products/?page=${pageNum}&filter=${filterOption}`),
  apiCushion: (pageNum, filterOption) =>
    api.get(`products/?page=${pageNum}&filter=${filterOption}`),
  apiFences: (pageNum, filterOption) =>
    api.get(`products/?page=${pageNum}&filter=${filterOption}`),
  apiLife: (pageNum, filterOption) =>
    api.get(`products/?page=${pageNum}&filter=${filterOption}`),
  apiStares: (pageNum, filterOption) =>
    api.get(`products/?page=${pageNum}&filter=${filterOption}`),
  apiToilets: (pageNum, filterOption) =>
    api.get(`products/?page=${pageNum}&filter=${filterOption}`),
  apiDiapers: (pageNum, filterOption) =>
    api.get(`products/?page=${pageNum}&filter=${filterOption}`),
  apiBathes: (pageNum, filterOption) =>
    api.get(`products/?page=${pageNum}&filter=${filterOption}`),
  apiBrushes: (pageNum, filterOption) =>
    api.get(`products/?page=${pageNum}&filter=${filterOption}`),
  apiDishes: (pageNum, filterOption) =>
    api.get(`products/?page=${pageNum}&filter=${filterOption}`),
  apiWaterPots: (pageNum, filterOption) =>
    api.get(`products/?page=${pageNum}&filter=${filterOption}`),
  apiToy: (pageNum, filterOption) =>
    api.get(`products/?page=${pageNum}&filter=${filterOption}`),
  apiToys: (pageNum, filterOption) =>
    api.get(`products/?page=${pageNum}&filter=${filterOption}`),
  apiNoseWorks: (pageNum, filterOption) =>
    api.get(`products/?page=${pageNum}&filter=${filterOption}`),
  apiTrainings: (pageNum, filterOption) =>
    api.get(`products/?page=${pageNum}&filter=${filterOption}`),
  apiFood: (pageNum, filterOption) =>
    api.get(`products/?page=${pageNum}&filter=${filterOption}`),
  apiFoods: (pageNum, filterOption) =>
    api.get(`products/?page=${pageNum}&filter=${filterOption}`),
  apiSnacks: (pageNum, filterOption) =>
    api.get(`products/?page=${pageNum}&filter=${filterOption}`),
  apiHealth: (pageNum, filterOption) =>
    api.get(`products/?page=${pageNum}&filter=${filterOption}`),
  apiHealthFood: (pageNum, filterOption) =>
    api.get(`products/?page=${pageNum}&filter=${filterOption}`),
  apiDental: (pageNum, filterOption) =>
    api.get(`products/?page=${pageNum}&filter=${filterOption}`),
  apiSupplements: (pageNum, filterOption) =>
    api.get(`products/?page=${pageNum}&filter=${filterOption}`),
  showDetail: (id) => api.get(`products/${id}/`),
};

export const usersApi = {
  login: (id, pw) =>
    api.post(`users/login/`, {
      id,
      pw,
    }),
  signup: (id, pw, pwCheck, name, email, phoneNum) =>
    api.post(`users/signup/`, {
      username: id,
      password: pw,
      pwCheck: pw,
      name,
      email,
      phone_number: phoneNum,
    }),
  checkId: (id) => api.get(`users/signup/check_id/`, { params: { id: id } }),
  mypage: () =>
    api.get(`users/me/`, {
      headers: {
        Authorization: store.getState()?.user.token,
        "Content-Type": "application/json",
      },
    }),
  editProfile: (name, email, phone_number) =>
    api.put(
      `users/me/`,
      { name, email, phone_number },
      {
        headers: {
          Authorization: store.getState()?.user.token,
          "Content-Type": "application/json",
        },
      }
    ),
  kakaoLogin: (name, email) => api.post(`/users/login/kakao/`, { name, email }),
  naverLogin: (name, email) => api.post(`/users/login/naver/`, { name, email }),
  favs: () =>
    api.get(`users/me/favs/`, {
      headers: {
        Authorization: store.getState()?.user.token,
        "Content-Type": "application/json",
      },
    }),
  basket: () => {
    return api.get(`users/me/basket/`, {
      headers: {
        Authorization: store.getState()?.user.token,
        "Content-Type": "application/json",
      },
    });
  },
  addFavs: (id) =>
    api.post(
      `users/me/favs/`,
      { id },
      {
        headers: {
          Authorization: store.getState()?.user.token,
          "Content-Type": "application/json",
        },
      }
    ),
  deleteFavs: (id) =>
    api.delete(`users/me/favs/`, {
      data: { id: id },
      headers: {
        Authorization: store.getState()?.user.token,
        "Content-Type": "application/json",
      },
    }),
  addToBasket: (item) =>
    api.post(
      `users/me/basket/`,
      { item },
      {
        headers: {
          Authorization: store.getState()?.user.token,
          "Content-Type": "application/json",
        },
      }
    ),

  deleteBasket: (item) =>
    api.delete(`users/me/basket/`, {
      data: { item: item },

      headers: {
        Authorization: store.getState()?.user.token,
        "Content-Type": "application/json",
      },
    }),

  addReview: (review, productId) =>
    api.post(
      `products/${productId}/reviews/`,
      { review },
      {
        headers: {
          Authorization: store.getState()?.user.token,
          "Content-Type": "application/json",
        },
      }
    ),

  deleteReview: (ReviewId, productId) =>
    api.delete(`products/${productId}/reviews/`, {
      data: { id: ReviewId },
      headers: {
        Authorization: store.getState()?.user.token,
        "Content-Type": "application/json",
      },
    }),

  reviews: (productId) => {
    return api.get(`products/${productId}/reviews/`);
  },

  addQnA: (qna, productId) =>
    api.post(
      `products/${productId}/qnas/`,
      { qna },
      {
        headers: {
          Authorization: store.getState()?.user.token,
          "Content-Type": "application/json",
        },
      }
    ),

  deleteQnA: (QnAId, productId) =>
    api.delete(`products/${productId}/reviews/`, {
      data: { id: QnAId },
      headers: {
        Authorization: store.getState()?.user.token,
        "Content-Type": "application/json",
      },
    }),

  qnas: (productId) => {
    return api.get(`products/${productId}/qnas/`);
  },
};

export const searchApi = {
  search: (searchTerm, pageNum, filterOption) => {
    return api.get(
      `products/search/?search=${searchTerm}&page=${pageNum}&filter=${filterOption}`
    );
  },
};

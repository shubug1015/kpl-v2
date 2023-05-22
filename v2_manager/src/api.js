import axios from 'axios';
import store from 'store';

// var token = '';
// store.subscribe(() => {
//   if (store.getState()?.user.token !== '') {
//     token = store.getState()?.user.token;
//   } else {
//     token = '';
//   }
// });

var api = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  // headers: {
  //   Authorization: store.getState()?.user.token,
  //   'Content-Type': 'application/json',
  //   // 'Access-Control-Allow-Origin': 'http://127.0.0.1:3000',
  //   // 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  //   // 'Access-Control-Allow-Headers':
  //   //   'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
  // },
});

export const managersApi = {
  login: (id, pw) =>
    api.post(`manager/users/login/`, {
      id,
      pw,
    }),
  manager: () =>
    api.get(`manager/me/`, {
      headers: {
        Authorization: store.getState()?.user.token,
        'Content-Type': 'application/json',
      },
    }),
  myProducts: (pageNum, filterOption) =>
    api.get(`manager/products/?page=${pageNum}&filter=${filterOption}`, {
      headers: {
        Authorization: store.getState()?.user.token,
        'Content-Type': 'application/json',
      },
    }),
  registerProduct: (data) =>
    api.post(`manager/product/register/`, data, {
      headers: {
        Authorization: store.getState()?.user.token,
        'Content-Type': 'application/json',
      },
    }),
  modifyProduct: (data) =>
    api.put(`manager/product/modify/`, data, {
      headers: {
        Authorization: store.getState()?.user.token,
        'Content-Type': 'application/json',
      },
    }),
  qnaProduct: (pageNum, replied) =>
    api.get(`manager/products/qnas/?page=${pageNum}`, {
      params: { replied: replied },
      headers: {
        Authorization: store.getState()?.user.token,
        'Content-Type': 'application/json',
      },
    }),
  qnaAnswer: (reply) =>
    api.post(
      `manager/products/qnas/`,
      { reply },
      {
        headers: {
          Authorization: store.getState()?.user.token,
          'Content-Type': 'application/json',
        },
      }
    ),
  purchase: (pageNum, send) =>
    api.get(`manager/products/purchased/?page=${pageNum}`, {
      params: { send: send },
      headers: {
        Authorization: store.getState()?.user.token,
        'Content-Type': 'application/json',
      },
    }),
  completeSend: (id) =>
    api.put(
      `manager/products/purchased/deliver/`,
      { id },
      {
        headers: {
          Authorization: store.getState()?.user.token,
          'Content-Type': 'application/json',
        },
      }
    ),
  exchange: (pageNum) =>
    api.get(`manager/products/exchange/?page=${pageNum}`, {
      headers: {
        Authorization: store.getState()?.user.token,
        'Content-Type': 'application/json',
      },
    }),
  completeExchange: (id) =>
    api.put(
      `manager/products/exchange/`,
      { id },
      {
        headers: {
          Authorization: store.getState()?.user.token,
          'Content-Type': 'application/json',
        },
      }
    ),
  refund: (pageNum) =>
    api.get(`manager/products/refund/?page=${pageNum}`, {
      headers: {
        Authorization: store.getState()?.user.token,
        'Content-Type': 'application/json',
      },
    }),
  completeRefund: (id) =>
    api.put(
      `manager/products/refund/`,
      { id },
      {
        headers: {
          Authorization: store.getState()?.user.token,
          'Content-Type': 'application/json',
        },
      }
    ),
  monthReport: () =>
    api.get(`manager/report/month/`, {
      headers: {
        Authorization: store.getState()?.user.token,
        'Content-Type': 'application/json',
      },
    }),
  detailReport: (month) =>
    api.get(`manager/report/month/detail`, {
      params: { month: month },
      headers: {
        Authorization: store.getState()?.user.token,
        'Content-Type': 'application/json',
      },
    }),
};

export const searchApi = {
  search: (searchTerm, pageNum, filterOption) => {
    return api.get(
      `products/search/?search=${searchTerm}&page=${pageNum}&filter=${filterOption}`
    );
  },
};

import { combineReducers } from "redux";
import { configureStore, createSlice } from "@reduxjs/toolkit";

const LOGIN_INFO = "LogInInfo";

const loadedLogIn =
  sessionStorage.getItem(LOGIN_INFO) || localStorage.getItem(LOGIN_INFO);
const parsedLogIn = JSON.parse(loadedLogIn)
  ? JSON.parse(loadedLogIn)
  : { token: "", user_pk: "", logged: false };

const RECENT_PRODUCT = "Recent Products";

const loadedProduct = sessionStorage.getItem(RECENT_PRODUCT);
const parsedProduct = JSON.parse(loadedProduct)
  ? JSON.parse(loadedProduct)
  : [];

const location = createSlice({
  name: "locationReducer",
  initialState: [{ location: "/" }],
  reducers: {
    saveLocation: (state, action) => {
      state.push({ location: action.payload });
    },
  },
});

const user = createSlice({
  name: "logInReducer",
  initialState: parsedLogIn,
  reducers: {
    logIn: (_, action) => ({
      token: action.payload?.token,
      user_pk: action.payload?.user_pk,
      logged: action.payload?.logged,
    }),
  },
});

const products = createSlice({
  name: "productReducer",
  initialState: parsedProduct,
  reducers: {
    recentProduct: (state, action) => {
      state.splice(0, 0, { product: action.payload });
    },
    deleteProduct: (state, action) => {
      return state.filter(
        (product) => product.product.id !== action.payload.id
      );
    },
  },
});

const page = createSlice({
  name: "pageBarReducer",
  initialState: 1,
  reducers: {
    pageNum: (state, action) => parseInt(action.payload),
  },
});

const filter = createSlice({
  name: "filterReducer",
  initialState: "",
  reducers: {
    filterOption: (state, action) => action.payload,
  },
});

const search = createSlice({
  name: "searchReducer",
  initialState: "",
  reducers: {
    searchTerm: (state, action) => action.payload,
  },
});

const reducer = combineReducers({
  location: location.reducer,
  user: user.reducer,
  products: products.reducer,
  page: page.reducer,
  filter: filter.reducer,
  search: search.reducer,
});

const store = configureStore({ reducer });

store.subscribe(() => {
  sessionStorage.setItem(
    RECENT_PRODUCT,
    JSON.stringify(store.getState().products)
  );
});

export const { saveLocation } = location.actions;
export const { logIn } = user.actions;
export const { recentProduct, deleteProduct } = products.actions;
export const { pageNum } = page.actions;
export const { filterOption } = filter.actions;
export const { searchTerm } = search.actions;

export default store;

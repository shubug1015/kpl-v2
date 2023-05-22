import { combineReducers } from 'redux';
import { configureStore, createSlice } from '@reduxjs/toolkit';

const LOGIN_INFO = 'LogInInfo';

const loadedLogIn =
  sessionStorage.getItem(LOGIN_INFO) || localStorage.getItem(LOGIN_INFO);
const parsedLogIn = JSON.parse(loadedLogIn)
  ? JSON.parse(loadedLogIn)
  : { token: '', logged: false };

const location = createSlice({
  name: 'locationReducer',
  initialState: [{ location: '/' }],
  reducers: {
    saveLocation: (state, action) => {
      state.push({ location: action.payload });
    },
  },
});

const user = createSlice({
  name: 'logInReducer',
  initialState: parsedLogIn,
  reducers: {
    logIn: (_, action) => ({
      token: action.payload?.token,
      logged: action.payload?.logged,
    }),
  },
});

const page = createSlice({
  name: 'pageBarReducer',
  initialState: 1,
  reducers: {
    pageNum: (state, action) => parseInt(action.payload),
  },
});

const filter = createSlice({
  name: 'filterReducer',
  initialState: '',
  reducers: {
    filterOption: (state, action) => action.payload,
  },
});

const search = createSlice({
  name: 'searchReducer',
  initialState: '',
  reducers: {
    searchTerm: (state, action) => action.payload,
  },
});

const reducer = combineReducers({
  location: location.reducer,
  user: user.reducer,
  page: page.reducer,
  filter: filter.reducer,
  search: search.reducer,
});

const store = configureStore({ reducer });

export const { saveLocation } = location.actions;
export const { logIn } = user.actions;
export const { pageNum } = page.actions;
export const { filterOption } = filter.actions;
export const { searchTerm } = search.actions;

export default store;

import { combineReducers } from 'redux';
import url from "../../utils/url";
import { FETCH_DATA } from "../middleware/api";
import { schema } from "./entities/products";

// 请求接口中使用的参数常量
export const params = {
  PATH_LIKES: 'likes',
  PATH_DISCOUNTS: 'discounts',
  PAGE_SIZE_LIKES: 5,
  PAGE_SIZE_DISCOUNTS: 3
};

// 每个API请求都需要dispatchd的三种action
export const types = {
  FETCH_LIKES_REQUEST: "HOME/FETCH_LIKES_REQUEST", // 获取猜你喜欢请求开始
  FETCH_LIKES_SUCCESS: "HOME/FETCH_LIKES_SUCCESS", // 获取猜你喜欢请求成功
  FETCH_LIKES_FAILURE: "HOME/FETCH_LIKES_FAILURE", // 获取猜你喜欢请求失败
  FETCH_DISCOUNTS_REQUEST: "HOME/FETCH_DISCOUNTS_REQUEST", // 获取超值特惠请求开始
  FETCH_DISCOUNTS_SUCCESS: "HOME/FETCH_DISCOUNTS_SUCCESS", // 获取超值特惠请求成功
  FETCH_DISCOUNTS_FAILURE: "HOME/FETCH_DISCOUNTS_FAILURE" // 获取超值特惠请求失败
};

// 初始化state
const initialState = {
  likes: { // 猜你喜欢
    isFetching: false, // 是否发送请求
    pageCount: 0,
    ids: [] // 用于保存猜你喜欢中的产品的id，具体相关信息可以通过产品领域模块(/entities/products.js)获取
  },
  discounts: { // 超值特惠
    isFetching: false,
    ids: []
  }
};

export const actions = {
  // 加载猜你喜欢数据
  loadLikes: () => {
    return (dispatch, getState) => {
      const { pageCount } = getState().home.likes;
      const rowIndex = pageCount * params.PAGE_SIZE_LIKES;
      const endpoint = url.getProductList(
        params.PATH_LIKES,
        rowIndex,
        params.PAGE_SIZE_LIKES
      );
      return dispatch(fetchLikes(endpoint));
    }
  },
  // 加载特惠商品数据
  loadDiscounts: () => {
    return (dispatch, getState) => {
      const { ids } = getState().home.discounts;
      // 特惠商品不需要进行实时请求，可以通过判断存储的产品id长度进行优化
      if (ids.length > 0) {
        return null;
      }
      const endpoint = url.getProductList(
        params.PATH_DISCOUNTS,
        0,
        params.PAGE_SIZE_DISCOUNTS
      );
      return dispatch(fetchDiscounts(endpoint));
    }
  }
};

const fetchLikes = (endpoint) => ({
  [FETCH_DATA]: {
    types: [
      types.FETCH_LIKES_REQUEST, // 请求中
      types.FETCH_LIKES_SUCCESS, // 请求成功
      types.FETCH_LIKES_FAILURE // 请求失败
    ],
    endpoint, // 请求URL
    schema // schema 领域实体结构 -- 为了进行扁平化处理（key: value形式）
  }
});

const fetchDiscounts = endpoint => ({
  [FETCH_DATA]: {
    types: [
      types.FETCH_DISCOUNTS_REQUEST,
      types.FETCH_DISCOUNTS_SUCCESS,
      types.FETCH_DISCOUNTS_FAILURE
    ],
    endpoint,
    schema
  }
});

// 猜你喜欢reducer
const likes = (state = initialState.likes, action) => {
  switch (action.type) {
    case types.FETCH_LIKES_FAILURE: 
      return { ...state, isFetching: true };
    case types.FETCH_LIKES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        pageCount: state.pageCount + 1,
        ids: state.ids.concat(action.response.ids)
      };
    case types.FETCH_DISCOUNTS_FAILURE: 
      return { ...state, isFetching: false };
    default: 
      return state;
  }
}

// 特惠商品reducer
const discounts = (state = initialState.discounts, action ) => {
  switch (action.type) {
    case types.FETCH_DISCOUNTS_REQUEST:
      return { ...state, isFetching: true };
    case types.FETCH_DISCOUNTS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        ids: state.ids.concat(action.response.ids)
      };
    case types.FETCH_DISCOUNTS_FAILURE:
      return { ...state, isFetching: false };
    default:
      return state;
  }
}

const reducer = combineReducers({
  likes, discounts
})

export default reducer;

// selectors
//获取猜你喜欢state
export const getLikes = state => {
  return state.home.likes.ids.map(id => {
    return state.entities.products[id];
  });
}

//获取特惠商品state
export const getDiscounts = state => {
  return state.home.discounts.ids.map(id => {
    return state.entities.products[id];
  });
}

//猜你喜欢当前分页码
export const getPageCountOfLikes = state => {
  return state.home.likes.pageCount;
}

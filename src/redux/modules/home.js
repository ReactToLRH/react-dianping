import url from "../../utils/url"
import { FETCH_DATA } from "../middleware/api"
import { schema } from "./entities/products"

export const types = {
  FETCH_LIKES_REQUEST: "HOME/FETCH_LIKES_REQUEST", // 获取猜你喜欢请求
  FETCH_LIKES_SUCCESS: "HOME/FETCH_LIKES_SUCCESS", // 获取猜你喜欢请求成功
  FETCH_LIKES_FAILURE: "HOME/FETCH_LIKES_FAILURE" // 获取猜你喜欢请求失败
}

export const actions = {
  loadLikes: () => {
    return (dispatch, getState) => {
      const endpoint = url.getProductList(0, 10);
      return dispatch(fetchLikes(endpoint));
    }
  }
}

const fetchLikes = (endpoint) => ({
  [FETCH_DATA]: {
    types: [
      types.FETCH_LIKES_REQUEST, // 请求中
      types.FETCH_LIKES_SUCCESS, // 请求成功
      types.FETCH_LIKES_FAILURE // 请求失败
    ]
  },
  endpoint, // 请求URL
  // schema 领域实体结构 -- 为了进行扁平化处理（key: value形式）
  // {
  //   id: 'xxx', // 领域实体用于检索数据的字符串
  //   name: 'xxx' // 中间件正在处理的领域实体
  // }
  schema 
})

const reducer = (state = {}, action) => {
  switch (action.type) {
    case types.FETCH_LIKES_REQUEST:
      return state;
    case types.FETCH_LIKES_SUCCESS:
      return state;
    case types.FETCH_LIKES_FAILURE:
      return state;
    default:
      return state;
  }
}

export default reducer;
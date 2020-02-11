// 用于处理请求的中间件

import { get } from '../../utils/request';

export const FETCH_DATA = 'FETCH DATA';

export default store => next => action => {
  const callAPI = action[FETCH_DATA];
  // 判断action中是含有常量 FETCH_DATA
  // >>> 如果有，表明需要经过 中间件api 进行处理
  // >>> 如果没有，则执行 next()，传递action
  if (typeof callAPI === 'undefined') {
    return next(action);
  }

  // 解构 callAPI
  // >>> endpoint: 请求URL
  // >>> schema: 领域实体结构 -- 为了进行扁平化处理（key: value形式）
  //            {
  //              id: 'xxx', // 哪一个属性能作为id值
  //              name: 'xxx' // 中间件正在处理的领域实体
  //            }
  // >>> types: 每个API请求发送的dispatch：
  //            > 通知reducer 请求开始 的action
  //            > 通知reducer 请求成功 的action
  //            > 通知reducer 请求失败 的action
  const { endpoint, schema, types } = callAPI;
  if (typeof endpoint !== 'string') {
    throw new Error('endpoint必须为字符串类型的URL');
  }
  if (!schema) {
    throw new Error('必须制定领域实体的schema');
  }
  if (!Array.isArray(types) && types.length !== 3) {
    throw new Error('需要指定一个包含3个action type的数组');
  }
  if (!types.every(type => typeof type === 'string')) {
    throw new Error('action type必须为字符串类型');
  }

  // 扩展action，用于处理其他参数的传递
  const actionWith = data => {
    const finalAction = {...action, ...data};
    delete finalAction[FETCH_DATA]; // 删除用于请求action type
    return finalAction;
  }

  // requestType: 请求开始的action
  // successType: 请求成功的action
  // failureType: 请求失败 的action
  const [requestType, successType, failureType] = types;

  // 传递请求开始的action
  next(actionWith({ type: requestType }));
  return fetchData(endpoint, schema).then(
    // 传递请求成功的action
    response => next(
      actionWith({
        type: successType,
        response
      })
    ),
    // 传递请求失败的action
    error => next(
      actionWith({
        type: failureType,
        error: error.message || '获取数据失败'
      })
    )
  )
}

// 执行网络请求
const fetchData = (endpoint, schema) => {
  return get(endpoint).then(data => {
    return normalizeData(data, schema)
  })
}

// 根据schema，将获取数据扁平化处理
const normalizeData = (data, schema) => {
  const { id, name } = schema;
  let kvObj = {};
  let ids = [];
  if (Array.isArray(data)) {
    data.forEach(item => {
      kvObj[item[id]] = item;
      ids.push(item[id]);
    })
  } else {
    kvObj[data[id]] = data;
    ids.push(data[id]);
  }
  return {
    [name]: kvObj,
    ids
  }
}
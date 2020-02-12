import createReducer from '../../../utils/createReducer';

export const schema = {
  name: 'shops',
  id: 'id'
};

const reducer = createReducer(schema.name);

export default reducer;

// selectors
// 通过店铺id获取店铺详情
export const getShopById = (state, id) => {
  const shop = state.entities.shops[id];
  return shop;
};

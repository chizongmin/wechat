import request from "./../utils/request.js";
/**
 * 首页列表
 * 
*/
export function tabList() {
  return request.get('wxGoods/tabList',{});
}
export function tabMapGoods() {
  return request.get('wxGoods/tabMapGoods',{});
}
export function saveToBag(data) {
  return request.post('wxGoodsBag/save',data);
}
export function bagList() {
  return request.post('wxGoodsBag/list',{});
}
export function updateBagTotal(data) {
  return request.post('wxGoodsBag/updateTotal',data);
}
export function deleteByIds(data) {
  return request.post('wxGoodsBag/deleteByIds',data);
}
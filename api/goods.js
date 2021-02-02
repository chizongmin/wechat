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
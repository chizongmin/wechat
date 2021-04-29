import request from "./../utils/request.js";
export function orderCreated(data) {
  return request.post('wxOrder/create',data);
}
export function findById(data) {
  return request.get('wxOrder/findById',data);
}
export function userOrderList(data) {
  return request.get('wxOrder/userOrderList',data);
}
export function updateStatus(data) {
  return request.get('wxOrder/updateStatus',data);
}


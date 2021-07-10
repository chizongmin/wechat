import request from "./../utils/request.js";
export function orderCreated(data) {
  return request.post('wxOrder/create',data);
}
export function paySuccess(data) {
  return request.post('wxOrder/paySuccess',data);
}
export function findById(data) {
  return request.get('wxOrder/findById',data);
}
export function userOrderList(data) {
  return request.get('wxOrder/userOrderList',data);
}
export function updateStatus(data) {
  return request.post('wxOrder/updateStatus',data);
}
export function fetchQRCode(data) {
  return request.get('wx/fetchQRCode',data);
}
export function orderActivity(data) {
  return request.get('wxOrder/orderActivity',data);
}


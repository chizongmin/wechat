import request from "./../utils/request.js";
export function orderCreated(data) {
  return request.post('wxOrder/created',data);
}
export function findById(data) {
  return request.get('wxOrder/findById',data);
}
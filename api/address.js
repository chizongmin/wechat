import request from "./../utils/request.js";
export function defaultAddress() {
  return request.get('wxUserAddress/defaultAddress',{});
}
export function addressList() {
  return request.get('wxUserAddress/addressList',{});
}
export function upsertAddress(data) {
  return request.post('wxUserAddress/upsertAddress',data);
}
export function publicAddress(data) {
  return request.get('wxUserAddress/publicAddress',data);
}
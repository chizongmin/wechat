import request from "./../utils/request.js";
export function userInfo() {
  return request.get('wxUser/info');
}
export function updateInfo(data) {
  return request.post('wxUser/updateInfo',data);
}
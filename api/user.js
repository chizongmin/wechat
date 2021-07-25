import request from "./../utils/request.js";
export function home() {
  return request.get('wxUser/home');
}
export function updateInfo(data) {
  return request.post('wxUser/updateInfo',data);
}
export function scoreActivity(params) {
  return request.get('wxUser/scoreActivity',params);
}

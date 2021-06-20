import request from "./../utils/request.js";
export function systemCouponList() {
    return request.get('wxUserCoupon/systemCouponList', {});
}
export function userCoupon(params) {
    return request.get('wxUserCoupon/userCoupon', params);
}
export function exchangeCoupon(data) {
    return request.post('wxUserCoupon/exchangeCoupon',data);
}

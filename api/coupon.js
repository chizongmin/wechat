import request from "./../utils/request.js";
export function systemCouponList() {
    return request.get('wxUserCoupon/systemCouponList', {});
}
export function userCoupon() {
    return request.get('wxUserCoupon/userCoupon', {});
}
export function exchangeCoupon(data) {
    return request.post('wxOrder/exchangeCoupon',data);
}

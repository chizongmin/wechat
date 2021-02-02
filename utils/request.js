import util from './util.js';
import authLogin from './autuLogin.js';
import { HEADER } from './../config.js';
/**
 * 发送请求
 */
export default function request(api, method, data )
{
  let Url = getApp().globalData.url
  let header={header:HEADER,token:wx.getStorageSync('openid')}
  return new Promise((reslove, reject) => {
    wx.request({
      url: Url +  api,
      method: method || 'GET',
      header: header,
      data: data || {},
      success: (res) => {
        if (res.data.code == 200){
          reslove(res.data, res)
        }
        else if (res.data.status == 406){
          reject(res.data.message || '参数错误')
        }else{
          reject(res.data.message || '系统错误')
        }
      }
    })
  });
}

['options', 'get', 'post', 'put', 'head', 'delete', 'trace', 'connect'].forEach((method) => {
  request[method] = (api, data) => request(api, method, data)
});


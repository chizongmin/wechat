// pages/order_confirm/index.js
import { findById,updateStatus} from '../../../api/order.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderId:"",
    order:{}
  },
  wxPayCommit(){
    let addressId=this.data.address.id
    let coupon=this.data.coupon
    let confirmToService=this.data.confirmToService
    let remark=this.data.remark
    if(!addressId){
      wx.showToast({
        title: '请选择收货地址！',
        icon: 'none',
        duration: 2000
      })
      return
    }
    let postData={addressId:addressId,couponId:coupon.id,goods:confirmToService,remark:remark}
    wx.showLoading({
      title: '处理中',
    })
    orderCreated(postData).then(res=>{
      wx.hideLoading()
      if(res.code==200){
        wx.navigateTo({
          url: '/pages/order/paySuccess/index',
          success: function(response) {
            // 通过eventChannel向被打开页面传送数据
            response.eventChannel.emit('acceptDataFromOpenerPage', res.data)
          }
        })
      }else{
        wx.showToast({
          title: res.message,
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  orderImage(e){ //订单二维码
    let orderId=e.currentTarget.dataset.id;
    let orderCode=e.currentTarget.dataset.code;
    //获取图片，跳转
    wx.navigateTo({
      url: '/pages/user/home_order_qr/index',
      success: function(res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', {orderId:orderId,orderCode:orderCode})
      }
    })
  },
  changeOrderStatus(e){
    let orderId=e.currentTarget.dataset.id;
    let toStatus=e.currentTarget.dataset.code;
    wx.showLoading({
      title: '处理中',
    })
    updateStatus({orderId:orderId,toStatus:toStatus}).then(res=>{
      wx.hideLoading()
      if(res.code!=200){
        wx.showToast({
          title: res.message,
          icon: 'none',
          duration: 2000
        })
      }else{
        this.orderDetail(orderId)
      }
    })
  },
  orderDetail(orderId){
    let that=this
    findById({id:orderId}).then(res=>{
      that.setData({
        order:res.data,
        orderId:res.data.id
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('acceptDataFromOpenerPage', function(data) {
      let orderId=data.orderId
      that.orderDetail(orderId)
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})

// pages/address/address_save/index.js
import { userCoupon,systemCouponList,exchangeCoupon } from '../../../api/coupon.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    from:null,
    list:[],
    userScore:'',
    tab:[
      {id:"ENABLE",name:"待使用"},
      {id:"USED",name:"已使用"},
      {id:"OUT_DATE",name:"已过期"}
    ],
    tabActive:"ENABLE"
  },
  tabActive(e){
    let id = e.currentTarget.dataset.id; 
    this.userCouponList({status:id})
    this.setData({
      tabActive:id
    })
  },
  exchangeCoupon(e){
    if(this.data.from=="user"){
      return
    }
    var id = e.currentTarget.dataset.id;
    var score = e.currentTarget.dataset.score;
    let that=this
    if(that.data.userScore< score ){
      wx.showToast({
        title: '积分不足',
        icon: 'none',
        duration: 2000
      })
      return
    }
    wx.showModal({
      title: '提示',
      content: '是否使用'+score+'积分兑换优惠券',
      success (res) {
        if (res.confirm) {
          //调用兑换接口
          wx.showLoading({
            title: '处理中',
          })
          exchangeCoupon({couponId:id}).then(res=>{
            wx.hideLoading()
            wx.showToast({
              title: res.message,
              icon: 'none',
              duration: 2000
            })
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    list:[]
  },
  userCouponList(params){ //订单列表
    let that=this
    userCoupon(params).then(res=>{
      that.setData({
        list:res.data
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let eventChannel = this.getOpenerEventChannel()
    let that=this
    eventChannel.on('acceptDataFromOpenerPage', function(data) {
      if(data.from=="user"){
        userCoupon({status:"ENABLE"}).then(res=>{
          that.setData({
            list:res.data
          })
        })
      }else{
        systemCouponList().then(res=>{
          that.setData({
            list:res.data
          })
        })
      }
      that.setData({
        from:data.from,
        userScore:data.score
      })
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


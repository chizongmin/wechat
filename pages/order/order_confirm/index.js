// pages/order_confirm/index.js
import { confirmGoods} from '../../../api/goods.js';
import { defaultAddress} from '../../../api/address.js';
import { orderCreated,paySuccess} from '../../../api/order.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    confirmToService:[],
    confirmGoods:[],//商品数量和id
    coupon:{},//优惠券
    userCoupons:[],
    address:{}, //地址
    remark:"",
    goodsSum:null,
    paySum:null
  },
  wxPayCommit(){
    let addressId=this.data.address.id
    let coupon=this.data.coupon
    let confirmToService=this.data.confirmToService
    let remark=this.data.remark
    if(!addressId){
      wx.showToast({
        title: '已加入到购物车',
        icon: 'none',
        duration: 1000
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
        //暂时调用支付成功
        paySuccess({orderId:res.data.id})
        wx.navigateTo({
          url: '/pages/order/paySuccess/index',
          success: function(response) {
            // 通过eventChannel向被打开页面传送数据
            response.eventChannel.emit('acceptDataFromOpenerPage', res.data)
          }
        })
      }else{
        wx.showModal({
          title: '提示',
          content: res.message
        })
      }
    })
  },
  computedPrice:function(){
    let confirmGoods=this.data.confirmGoods
    let goodsPrice=0
    let couponPrice=0
    confirmGoods.forEach(item=>{
      goodsPrice+=item.confirmCount*item.sum
    })
    if(this.data.coupon.sum!=null){
      couponPrice=this.data.coupon.sum
    }
    let paySum=(goodsPrice-couponPrice).toFixed(2)
    if(paySum<0){
      paySum=0
    }
    this.setData({
      goodsSum:goodsPrice,
      paySum:paySum
    })
  },
  addressChoose:function(e){
    let that=this
    wx.navigateTo({
      url: '/pages/address/address_list/index',
      events:{
           acceptChooseAddress(address){
            that.setData({
              address:address
            })
          }
      },
      success: function(res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', {})
      }
    })
  },
  couponChoose:function(e){
    let that=this
    wx.navigateTo({
      url: '/pages/user/home_user_coupon/index',
      events:{
           acceptChooseCoupon(coupon){
            that.setData({
              coupon:coupon
            })
            that.computedPrice()
          }
      },
      success: function(res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', {from:"confirmOrder"})
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this
    const eventChannel = this.getOpenerEventChannel()
    // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
    eventChannel.on('acceptDataFromOpenerPage', function(data) {
      let ids=data.map(item=>item.id)
      confirmGoods({ids:ids}).then(res=>{
        let goods=res.data.goods
        let userCoupons=res.data.userCoupons
        let coupon={}
        goods.forEach(item=>{
          let single=data.find(it=>it.id==item.id)
          item.confirmCount=single.count
        })
        that.setData({
          confirmToService:data,
          confirmGoods:goods,
          userCoupons:userCoupons,
          coupon:coupon
        })
        that.computedPrice()
      })
    })
    defaultAddress().then(res=>{
      that.setData({
        address:res.data
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  inputChange(event) {
    let _this = this
    let dataset = event.currentTarget.dataset;
    let value = event.detail.value
    let name = dataset.name;
    console.log(name)
    _this.data[name] = value;
    _this.setData({
      [name]: _this.data[name]
    })
    console.log(_this.data[name])
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

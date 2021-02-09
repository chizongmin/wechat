// pages/order_confirm/index.js
import { confirmGoods} from '../../api/goods.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    confirmToService:[],
    confirmGoods:[],//商品数量和id
    coupon:{},//优惠券
    address:{}, //地址
    remark:"",
    goodsSum:null,
    paySum:null
  },
  computedPrice:function(){
    let confirmGoods=this.data.confirmGoods
    let goodsPrice=0
    let couponPrice=0
    confirmGoods.forEach(item=>{
      goodsPrice+=item.confirmCount*item.sum
    })
    if(this.data.coupon.money!=null){
      couponPrice=this.data.coupon.money
    }
    this.setData({
      goodsSum:goodsPrice,
      paySum:goodsPrice-couponPrice
    })
  },
  addressChoose:function(e){
    wx.navigateTo({
      url: '/pages/address_list/index',
      success: function(res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', {})
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
        let goods=res.data
        goods.forEach(item=>{
          let single=data.find(it=>it.id==item.id)
          item.confirmCount=single.count
        }) 
        that.setData({
          confirmToService:data,
          confirmGoods:goods
        })
        that.computedPrice()
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
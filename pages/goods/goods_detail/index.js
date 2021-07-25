// pages/goods_detail/index.js
import { goodsDetail ,saveToBag} from '../../../api/goods.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:"",
    goods:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this
    const eventChannel = this.getOpenerEventChannel()
    // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
    eventChannel.on('acceptDataFromOpenerPage', function(data) {
      that.setData({
        id:data.id
      })
      goodsDetail({id:data.id}).then(res=>{
        let aipUrl=getApp().globalData.url
        let goods=res.data
        goods.detailFileList.forEach(item=>{
          item.url=aipUrl+item.url
        }) 
        that.setData({
          goods:goods
        })
      })
    })
  },
  saveToBag: function (e){
    let that=this
    let id = e.currentTarget.dataset.id;
    saveToBag({goodsId:id}).then(res=>{
    })
    wx.showToast({
      title: '请选择收货地址！',
      icon: 'none',
      duration: 2000
    })
  },
  confirm:function(e){
    let id = e.currentTarget.dataset.id;
    console.log(id)
    wx.navigateTo({
      url: '/pages/order/order_confirm/index',
      success: function(res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', [{id:id,count:1}])
      }
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
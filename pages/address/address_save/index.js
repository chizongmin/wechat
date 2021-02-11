// pages/address/address_save/index.js
import { upsertAddress} from '../../../api/address.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:{}
  },
  save(){
    let address=this.data.address
    let that=this
    upsertAddress(address).then(res=>{
        //加入缓存
    })
  },
  addressSelect:function(e){
    wx.navigateTo({
      url: '/pages/address/address_public/index',
      success: function(res) {
        
      }
    })
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
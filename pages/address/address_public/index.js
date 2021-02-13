// pages/address/address_public/index.js
import { publicAddress} from '../../../api/address.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[]

  },
  searchSubmitValue(e){
    let that=this
    let keyword=e.detail.value
    wx.showLoading({
      title: '加载中',
    })
    publicAddress({keyword:keyword}).then(res=>{
      that.setData({
        list:res.data
      })
      wx.hideLoading()
  })
  },
  addressSelect(e){
    var id = e.currentTarget.dataset.id;
    var name = e.currentTarget.dataset.name;
    var fname = e.currentTarget.dataset.fname;
    var fid = e.currentTarget.dataset.fid;
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.emit('acceptAddressSelect', {id: id,name:name,fname:fname,fid:fid});
    wx.navigateBack({
      delta: 1
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this
    publicAddress({}).then(res=>{
        that.setData({
          list:res.data
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
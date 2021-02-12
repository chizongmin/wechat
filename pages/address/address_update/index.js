// pages/address/address_save/index.js
import { upsertAddress,deleteById} from '../../../api/address.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },
  delete(){
    let that=this
    let id=this.data.id
    wx.showModal({
      title: '提示',
      content: '确认删除该地址吗',
      success (res) {
        if (res.confirm) {
          deleteById({id:id})
          const eventChannel = that.getOpenerEventChannel()
          eventChannel.emit('acceptDeleteAddress', {id:id});
          wx.navigateBack({
            delta: 1
          })
        } else if (res.cancel) {
         return
        }
      }
    })
  },
  switchDefalut(e){
    let switchValue=e.detail.value
    this.setData({
      default:switchValue
    })
  },
  save(){
    let address=this.data
    //校验参数
    if(!address.addressId){
      wx.showToast({
        title: '请选择收货地址！',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if(!address.detail){
      wx.showToast({
        title: '请填写详细送货地址！',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if(!address.name){
      wx.showToast({
        title: '请填写详联系人姓名！',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if(!address.phone){
      wx.showToast({
        title: '请填写详联系人电话！',
        icon: 'none',
        duration: 2000
      })
      return
    }
    let that=this
    wx.showLoading({
      title: '加载中',
    })
    upsertAddress(address).then(res=>{
      const eventChannel = this.getOpenerEventChannel()
      eventChannel.emit('acceptUpdateAddress', res.data);
      wx.hideLoading()
      wx.navigateBack({
        delta: 1
      })
    })
  },
  addressSelect:function(e){
    let that=this
    wx.navigateTo({
      url: '/pages/address/address_public/index',
      events: {
          acceptAddressSelect(data){
            that.setData({
              addressId:data.id,
              strVillager:data.name,
              strCountry:data.fname
            })
          }
      } ,
      success: function(res) {
        
      }
    })
  },
  inputChange(event) {
    let _this = this
    let dataset = event.currentTarget.dataset;
    let value = event.detail.value
    let name = dataset.name;
    _this.data[name] = value;
    _this.setData({
      [name]: _this.data[name]
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('acceptDataFromOpenerPage', function(data) {
      that.setData(data)
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
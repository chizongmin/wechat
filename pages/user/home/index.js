import { home,updateInfo} from '../../../api/user.js';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    user:{}
  },
  getUserInfo(e){
    let userInfo=e.detail.userInfo
    var infoIndex = "user.info";
    if(userInfo){
      this.setData({
        [infoIndex]:userInfo
      })
      //调用接口保存
      updateInfo(userInfo)
    }
  },
  clickAddress(){
    wx.navigateTo({
      url: '/pages/address/address_list/index',   
      success: function(res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', {from:'userHome'})
      }  
    })
  },
  clickOrder(e){
    var type = e.currentTarget.dataset.type;
    var from = e.currentTarget.dataset.from;
    wx.navigateTo({
      url: '/pages/user/home_order_list/index',   
      success: function(res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', {from:from,type:type})
      }  
    })
  },
  clickScore(){
    wx.navigateTo({
      url: '/pages/user/home_user_score/index',   
      success: function(res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', {})
      }  
    })
  },
  clickCoupon(){
    wx.navigateTo({
      url: '/pages/user/home_user_coupon/index',   
      success: function(res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', {from:"user"})
      }  
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this
    home().then(res=>{
      that.setData({
        user:res.data
      })
    })
    wx.getUserInfo({
      success: res => {
        let userInfo=res.userInfo
        var infoIndex = "user.info";
        if(userInfo){
          this.setData({
            [infoIndex]:userInfo
          })
          //调用接口保存
          updateInfo(userInfo)
        }
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
    let that=this
    home().then(res=>{
      that.setData({
        user:res.data
      })
    })
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
    let that=this
    home().then(res=>{
      that.setData({
        user:res.data
      })
    })
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
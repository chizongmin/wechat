// pages/user/home_order_list/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      from:null,
      tabActive: null,
      tab:[],
      orderList:[{}]
  },
  tabActive(e){
    var id = e.currentTarget.dataset.id;
    this.setData({
      tabActive: id
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let eventChannel = this.getOpenerEventChannel()
    let that=this
    eventChannel.on('acceptDataFromOpenerPage', function(data) {
      let tab=[]
      if(data.from=="user"){
          tab=[
            {id:"user_all",name:"全部"},
            {id:"user_wait_send",name:"待配送"},
            {id:"user_wait_confirm",name:"待确认"}, 
            {id:"user_wait_deal",name:"待处理"},
            {id:"user_complete",name:"已完成"}
          ]
      }
      that.setData({
        from:data.from,
        tab:tab,
        tabActive:data.type
      })
      console.log(that.data)
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
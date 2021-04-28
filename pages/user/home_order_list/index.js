// pages/user/home_order_list/index.js
import { userOrderList } from '../../../api/goods.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
      from:null,
      tabActive: null,
      tab:[],
      orderList:[],
      params:{
        status:"",
        pageSize:10,
        pageNumber:1
      }
  },
  tabActive(e){
    var id = e.currentTarget.dataset.id;
    this.setData({
      tabActive: id,
      'params.status':id,
      'params.pageSize':10,
      'params.pageNumber':1
    });
    this.orderList()
  },
  orderList(){
    let that=this
    let params=this.data.params
    userOrderList(params).then(res=>{
      that.setData({
        orderList:res.data
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
      let tab=[]
      if(data.from=="user"){
          tab=[
            {id:"WAIT_PAY",name:"待支付"},
            {id:"DONG",name:"处理中"},
            {id:"DELIVERY",name:"配送中"},
            {id:"WAIT_CONFIRM",name:"待确认"},
            {id:"",name:"全部"}
          ]
      }
      that.setData({
        from:data.from,
        tab:tab,
        tabActive:data.type,
        'params.status':data.type
      })
      this.orderList()
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

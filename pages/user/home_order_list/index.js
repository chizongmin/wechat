// pages/user/home_order_list/index.js
import { userOrderList,updateStatus } from '../../../api/order.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
      tabActive: null,
      tab:[],
      orderList:[],
      totalCount:0,
      params:{
        from:null,
        status:"",
        pageSize:5,
        pageNumber:1
      }
  },
  tabActive(e){
    let id = e.currentTarget.dataset.id;
    this.setData({
      tabActive: id,
      'params.status':id,
      'params.pageSize':5,
      'params.pageNumber':1
    });
    this.orderList()
  },
  orderDetail(e){
    let orderId=e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/user/home_order_detail/index',
      success: function(res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', {orderId:orderId})
      }
    })
  },
  loadMore(){
    let params=this.data.params
    params.pageNumber=params.pageNumber+1
    let that=this
    if(that.data.orderList.length>=that.data.totalCount){
        return
    }
    userOrderList(params).then(res=>{
      let moreList=res.data.items
      let items=that.data.orderList
      if(moreList.length>0){
        let newList=items.concat(moreList)
        console.log(newList)
        that.setData({
          orderList:newList,
          pageNumber:params.pageNumber+1
        })
      } 
    })
  },
  orderList(){ //订单列表
    let that=this
    let params=this.data.params
    userOrderList(params).then(res=>{
      that.setData({
        orderList:res.data.items,
        totalCount:res.data.totalCount
      })
    })
  },
  orderImage(e){ //订单二维码
    let orderId=e.currentTarget.dataset.id;
    let orderCode=e.currentTarget.dataset.code;
    //获取图片，跳转
    wx.navigateTo({
      url: '/pages/user/home_order_qr/index',
      success: function(res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', {orderId:orderId,orderCode:orderCode})
      }
    })
  },
  changeOrderStatus(e){
    let orderId=e.currentTarget.dataset.id;
    let toStatus=e.currentTarget.dataset.code;
    wx.showLoading({
      title: '处理中',
    })
    updateStatus({orderId:orderId,toStatus:toStatus}).then(res=>{
      wx.hideLoading()
      if(res.code!=200){
        wx.showToast({
          title: res.message,
          icon: 'none',
          duration: 2000
        })
      }else{
        this.orderList()
      }
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
      }else{
        tab=[
          {id:"DELIVERY",name:"待配送"},
          {id:"RETURN_DOING",name:"待退货"},
          {id:"COMPLETED,WAIT_CONFIRM,RETURNED",name:"已完成"},
          {id:"DELIVERY,RETURN_DOING,COMPLETED,WAIT_CONFIRM,RETURNED",name:"全部"}
        ]
      }
      that.setData({
        tab:tab,
        tabActive:data.type,
        'params.status':data.type,
        'params.from':data.from
      })
      that.orderList()
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

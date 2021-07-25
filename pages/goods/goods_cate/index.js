// pages/goods_cate/index.js
import { tabList,tabMapGoods,saveToBag } from '../../../api/goods.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navlist: [

    ],
    tabList:[],
    tabMapList:{},
    productList:[],   
    navActive: 0
  },
  tabList: function () {
    let that=this
    tabList().then(res=>{
        //加入缓存
      that.setData({
        tabList:res.data,
        productList:res.data[0].goods
      })
    })
  },
  tabMapGoods: function () {
    let that=this
    tabMapGoods().then(res=>{
        that.setData({
          tabMapList:res.data
        })
    })
  },
  tap: function (e) {
    var id = e.currentTarget.dataset.id;
    var index = e.currentTarget.dataset.index;
    let checkedList = this.data.tabMapList[id]
    this.setData({
      productList:checkedList,
      navActive: index
    });
  },
  searchSubmitValue: function (e) {
    let keyword=e.detail.value
    let searchList=this.data.productList.filter(item=> item.name.indexOf(keyword)!=-1)
    this.setData({
      productList:searchList
    });
  },
  saveToBag: function (e){
    let that=this
    let id = e.currentTarget.dataset.id;
    console.log(id)
    saveToBag({goodsId:id}).then(res=>{
    })
    wx.showToast({
      title: '已加入到购物车',
      icon: 'none',
      duration: 1000
    })
  },
  detailClick:function(e){
    let id = e.currentTarget.dataset.id;
    console.log(id)
    wx.navigateTo({
      url: '/pages/goods/goods_detail/index',
      success: function(res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', { id: id })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.tabList()
    this.tabMapGoods()
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
    let that=this
    tabMapGoods().then(res=>{
      let top0=that.data.tabList[0]
      that.setData({
        navActive: 0,
        productList:res.data[top0.id],
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
// pages/goods_cate/index.js
import { tabList,tabMapGoods } from '../../api/goods.js';
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
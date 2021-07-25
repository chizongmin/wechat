// pages/user/home_user_score/index.js
import { scoreActivity} from '../../../api/user.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
      score:"",
      items:null,
      totalCount:null,
      pageSize:8,
      pageNumber:1
  },
  clickCoupon(){
    let that=this
    wx.navigateTo({
      url: '/pages/user/home_user_coupon/index',   
      success: function(res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', {from:"score",score:that.data.score})
      }  
    })
  },
  loadMore(){
    let pageNumber=this.data.pageNumber
    let that=this
    if(that.data.items.length>=that.data.totalCount){
        return
    }
    scoreActivity({pageNumber:pageNumber+1,pageSize:that.data.pageSize}).then(res=>{
      let moreList=res.data.items
      let items=that.data.items
      if(moreList.length>0){
        let newList=items.concat(moreList)
        console.log(newList)
        that.setData({
          items:newList,
          pageNumber:pageNumber+1
        })
      } 
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this
    scoreActivity({pageNumber:this.data.pageNumber,pageSize:this.data.pageSize}).then(res=>{
      that.setData(res.data)
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
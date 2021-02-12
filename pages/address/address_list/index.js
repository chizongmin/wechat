// pages/address_list/index.js
import { addressList} from '../../../api/address.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
      list:[]
  },
  addAddress:function(){
    let that=this
    wx.navigateTo({
      url: '/pages/address/address_save/index',
      events:{
         acceptAddAddress(address){
            let list=that.data.list
            if(address.default){//默认，其他选项设置为非默认
              list.forEach((item,index)=>{
                var addressIndex = "list[" + index + "].default";
                item.default=false
                that.setData({
                  [addressIndex]:false
                })
              })
            }
            list.push(address)
            that.setData({
                list:list
            })
         }
      },
      success: function(res) {
        // 通过eventChannel向被打开页面传送数据
      }
    })
  },
  updateAddress:function(e){
    let id = e.currentTarget.dataset.id;
    console.log(id)
    wx.navigateTo({
      url: '/pages/address/address_update/index',
      success: function(res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', [{id:id,count:1}])
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this
    addressList().then(res=>{
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
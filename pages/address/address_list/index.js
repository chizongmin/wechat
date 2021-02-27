// pages/address_list/index.js
import { addressList} from '../../../api/address.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
      list:[],
      from:null
  },
  chooseAddress(e){
    let from =this.data.from
    if(from=='userHome'){
        return
    }
    let that=this
    let item = e.currentTarget.dataset.item;
    const eventChannel = that.getOpenerEventChannel()
    eventChannel.emit('acceptChooseAddress', item);
    wx.navigateBack({
      delta: 1
    })
  },
  addAddress:function(){
    let that=this
    let list=this.data.list
    if(list.length>4){
      wx.showToast({
        title: '收货地址最多能创建五个！',
        icon: 'none',
        duration: 2000
      })
      return
    }
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
    let that=this
    let item = e.currentTarget.dataset.item;
    let list=that.data.list
    wx.navigateTo({
      url: '/pages/address/address_update/index',
      events:{
        acceptUpdateAddress(address){
          list.forEach((item,index)=>{
            var addressIndex = "list[" + index + "]";
            if(address.id==item.id){
              that.setData({
                [addressIndex]:address
              })
            }else{
              if(address.default){//其他选项设置为非默认
                let addressDefaultIndex = "list[" + index + "].default";
                that.setData({
                  [addressDefaultIndex]:false
                })
              }
            }
          })
        },
        acceptDeleteAddress(data){
            let deleteId=data.id
            let newList=list.filter(item=>item.id!=deleteId)
            that.setData({
              list:newList
            })
        }
      },
      success: function(res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', item)
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
      that.setData({
        from:data.from
      })
    })
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
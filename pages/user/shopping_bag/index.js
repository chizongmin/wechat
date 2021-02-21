// pages/shopping_bag/index.js
import { bagList ,updateBagTotal,deleteByIds} from '../../../api/goods.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
      bagList:[],
      checkedAll:true,
      price:0,
      total:0,
      action:'编辑'
  },
  bagList: function () {
    let that=this
    let checkedAll=true
    bagList().then(res=>{   
      if(res.data.length==0){
        checkedAll=null
      } 
        //加入缓存
      that.setData({
        bagList:res.data,
        checkedAll:checkedAll
      })
      this.computedPrice()
    })
  },
  totalChange:function(e){
    var index = e.currentTarget.dataset.index
    var id = e.currentTarget.dataset.id
    var action = e.currentTarget.dataset.action
    var bagTotalIndex = "bagList[" + index + "].bagTotal";
    let bagTotal=this.data.bagList[index].bagTotal
    let finalTotal=bagTotal
    if(action=="plus"){
      finalTotal=bagTotal+1
      this.setData({
        [bagTotalIndex]:finalTotal
       })
    }else{
      if(bagTotal-1<1){//提示是否删除
        wx.showToast({
          title: '最少购买一件哦！',
          icon: 'none',
          duration: 2000
        })
        return
      }else{
        finalTotal=bagTotal-1
        this.setData({
          [bagTotalIndex]:finalTotal
         })
      }    
    }
    this.computedPrice()
    updateBagTotal({id:id,total:finalTotal})
  },
  computedPrice:function(){
    let checkedGoods=this.data.bagList.filter(item=>item.checked==true)
    if(checkedGoods){
      let price=0
      let total=0
      checkedGoods.forEach(function(item){
        price+=item.sum*item.bagTotal
        total+=item.bagTotal
      })
      this.setData({
        price:price,
        total:total
       })
    }
  },
  radioClick:function(e){
    var index = e.currentTarget.dataset.index
    var item=this.data.bagList[index]
    var checked = "bagList[" + index + "].checked";
    if(item.checked==true){
      this.setData({
       [checked]:null
      })
    }else{
      this.setData({
        [checked]:true
      })
    }
    this.computeSelectStatus()
    this.computedPrice()
  },
  selectAll:function(){
    let that=this
    if(that.data.checkedAll==true){
      this.data.bagList.forEach(function(item,index){
        var checked = "bagList[" + index + "].checked";
        that.setData({
          [checked]:null,         
        })
      })
      that.setData({
        checkedAll:null,         
      })
    }else{
      this.data.bagList.forEach(function(item,index){
        var checked = "bagList[" + index + "].checked";
        that.setData({
          [checked]:true,         
        })
      })
      that.setData({
        checkedAll:true,         
      })
    }
    this.computedPrice()
  },
  computeSelectStatus:function(){
//校验是否全部选中
    let unChecked=this.data.bagList.find(item=>item.checked!=true)
    if(!unChecked){
      this.setData({
        checkedAll:true
      })
    }else{
      this.setData({
        checkedAll:null
      })
    }
  },
  changeAction:function(){
    let action=this.data.action
    if(action=='编辑'){
      this.setData({
        action:'完成'
      })
    }else{
      this.setData({
        action:'编辑'
      })
      this.computedPrice()
    }
  },
  delete:function(){
    let bagList=this.data.bagList
    let remainList=[]
    let deleteList=[]
    bagList.forEach(function(item){
      if(item.checked==true){
        deleteList.push(item.id)
      }else{
        remainList.push(item)
      }     
  })
    if(deleteList.length==0){
      wx.showToast({
        title: '最少选择一个哦！',
        icon: 'none',
        duration: 2000
      })
      return
    }
    this.setData({
      bagList:remainList
    })
    this.computedPrice()
    deleteByIds({ids:deleteList})
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
  nothing:function(){
  },
  confirm:function(e){
    let checked=this.data.bagList.filter(item=>item.checked==true)
    if(!checked){
      wx.showToast({
        title: '最少选择一个哦！',
        icon: 'none',
        duration: 2000
      })
      return
    }
    let params=checked.map(item=>{return {id:item.id,count:item.bagTotal}})
    wx.navigateTo({
      url: '/pages/order_confirm/index',
      success: function(res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', params)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.bagList()
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
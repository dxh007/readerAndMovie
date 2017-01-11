var dataList = require('../../data/posts-data.js');
Page({
  data:{
  },
  onPostTap:function(event){
     console.log(event)
      var postId=event.currentTarget.dataset.postid;
      console.log(postId)
      wx.navigateTo({
        url:'post-detail/post-detail',
      })
       
  },
  onLoad: function (options) {
      // 生命周期函数--监听页面加载
      console.log("onLoad")
      this.setData({
          local_database_key:dataList.local_database
      })
  },
  onReady:function(){
    // 生命周期函数--监听页面初次渲染完成
   //console.log("onReady")
  },
  onShow:function(){
    // 生命周期函数--监听页面显示
    //console.log("onshow")
  },
  onHide:function(){
    // 生命周期函数--监听页面隐藏
    //console.log("onHide")
  },
  onUnload:function(){
    // 生命周期函数--监听页面卸载
    //console.log("onUnload")
  },
  onPullDownRefresh: function() {
    // 页面相关事件处理函数--监听用户下拉动作
    
  },
  onReachBottom: function() {
    // 页面上拉触底事件的处理函数
    
  },
  onShareAppMessage: function() {
    // 用户点击右上角分享
    return {
      title: 'title', // 分享标题
      desc: 'desc', // 分享描述
      path: 'path' // 分享路径
    }
  }
})
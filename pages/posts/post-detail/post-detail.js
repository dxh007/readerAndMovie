// pages/posts/post-detail/post-detail.js
var postsdata = require("../../../data/posts-data.js");
var app = getApp();
Page({
  data:{
    isPlayingMusic:false
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var postId=options.id;
    //this.data.currentPostId=postId;
    this.setData({
      currentPostId:postId
    });
    var postDetail=postsdata.local_database[postId];
    console.log(postDetail.detail)
    this.setData({
      postDetail:postDetail
    });
   
    var postsCollected = wx.getStorageSync('posts_collected')
    if (postsCollected) {
      var postCollected = postsCollected[postId]
      this.setData({
        collected: postCollected
      })
    }
    else {
      var postsCollected = {};
      postsCollected[postId] = false;
      wx.setStorageSync('posts_collected', postsCollected);
    }
   if(app.globalData.g_isPlayingMusic && app.globalData.g_currentMusicPostId===postId){
     this.setData({
       isPlayingMusic : true
     })
   }
   this.setMusicMonitor();

  },
  setMusicMonitor: function () {
    var that = this;
    wx.onBackgroundAudioPlay(function () {
      that.setData({
        isPlayingMusic: true
      })
      app.globalData.g_isPlayingMusic = true;
      app.globalData.g_currentMusicPostId=that.data.currentPostId;
    });
    wx.onBackgroundAudioPause(function () {
      that.setData({
        isPlayingMusic: false
      })
      app.globalData.g_isPlayingMusic = false;
      app.globalData.g_currentMusicPostId=null;
    })
  },
  onCollectionTap:function(event){
   this.getPostsCollectedSyc();
   //this. getPostsCollectedAsy();
  },

  getPostsCollectedAsy: function () {
    var that=this;
    wx.getStorage({
      key: 'posts_collected',
      success: function (res) {
        var postsCollected = res.data;
        var postCollected = postsCollected[that.data.currentPostId];
        postCollected = !postCollected;
        postsCollected[that.data.currentPostId] = postCollected;
        that.showToast(postsCollected, postCollected);

      },

    })
  },

  getPostsCollectedSyc:function(){
    var that=this;
    var postsCollected=wx.getStorageSync('posts_collected');
    console.log(postsCollected);
    var postCollected=postsCollected[this.data.currentPostId];
    postCollected=!postCollected;
    postsCollected[this.data.currentPostId]=postCollected;
    this.showToast(postsCollected,postCollected);
  },
  showModal:function(postsCollected,postCollected){
    var that=this;
    wx.showModal({
      title:"收藏",
      content:postCollected?"收藏该文章？":"取消收藏该文章",
      showCancel:"true",
      cancelText:'取消',
      cancelColor:"#333",
      confirmText:"确定",
      confirmColor:"#405f80",
      success:function(res){
        if (res.confirm) {
          wx.setStorageSync('posts_collected', postsCollected);
          that.setData({
            collected: postCollected
          })
        }
      }
    })
  },
  showToast: function (postsCollected, postCollected) {
    wx.setStorageSync('posts_collected', postsCollected);
    this.setData({
      collected: postCollected
    })
    wx.showToast({
      title: postCollected ? "收藏成功" : "取消成功",
      duration: 1000,
      icon: "success"
    })
  },
  onShareTap:function(event){
    var itemList=['分享给微信好友','分享到朋友圈','分享给给QQ好友','分享到微博'];
    wx.showActionSheet({
      itemList:itemList,
      itemColor:"#405f80",
      success:function(res){
        //res.cancel用户是不是点击了取消按钮
        //res.tapIndex 数组元素的序号 从0开始
        wx.showModal({
          title:"用户"+itemList[res.tapIndex],
          content:"用户是否取消"+res.cancel+"现在无法实现分享功能，什么时候可以实现呢"
        })
      }
    })
  },

  onMusicTap:function(event){
    var isPlayingMusic=this.data.isPlayingMusic;
    var  currentPostId=this.data. currentPostId;
    var postData=postsdata.local_database[currentPostId];
    if(isPlayingMusic){
      wx.pauseBackgroundAudio();
      this.setData({
        isPlayingMusic:false
      })
    }else{
      wx.playBackgroundAudio({
        dataUrl: postData.music.url,
        title:postData.music.title,
        coverImgUrl:postData.music.coverImg
      })
      console.log(postData.music.coverImg)
      this.setData({
        isPlayingMusic:true
      })
    }
  }
 
})
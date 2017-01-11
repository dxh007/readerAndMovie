Page({
    onTap:function(){
        console.log("1")
        // wx.navigateTo({//父子级页面的跳转，跳转过去的页面作为当前页面的子页面，出现返回按钮。会触发onHide函数。父子级页面最多5级；
        //   url: '../posts/posts'
        // })
        wx.redirectTo({
          url: '../posts/posts' //作为平级页面的跳转。会触发onUnload函数。
        })
    },
    onUnload:function(){
        console.log("wx.redirectTo触发,页面被关闭卸载")
    },
    onHide:function(){
        console.log("wx.navigateTo触发,父页面被隐藏")
    }
})
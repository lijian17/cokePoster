//app.js
var that;

App({
  /**
   * 全局数据
   */
  globalData: {
    userInfo: null,
    //主题颜色
    mainColor: '#1B82D1',
    // 服务器地址
    baseUrl: 'https://www.54dxs.cn/s54dxs',
    // baseUrl: 'http://localhost:8080',
    //搜索关键词
    key: '',
    //收藏的列表ids
    collectids: [],
    //体系的子列表
    systemtypelist: [],
    //文章详情的链接
    desclink: '',
    // cookie包含帐号密码
    cookie: '',
    // 服务器token
    token: ''
  },

  /**
   * 生命周期回调——监听小程序初始化
   */
  onLaunch: function (options) {
    that = this;
    that.init();
  },

  /**
   * 生命周期回调——监听小程序启动或切前台
   */
  onShow: function (options) {

  },

  /**
   * 生命周期回调——监听小程序切后台
   */
  onHide: function () {

  },

  /**
   * 错误监听函数
   */
  onError: function (msg) {
    console.log(msg)
  },

  /**
   * 页面不存在监听函数
   */
  onPageNotFound: function () {

  },

  /**
   * --------------------------------------------------------------------------------------
   * ---自定义事件处理----------------------------------------------------------------------
   * --------------------------------------------------------------------------------------
   */

  init: function () {
    that.userLogin();
  },

  /**
   * 用户登录（首次登录将由服务器实现静默注册）
   */
  userLogin: function () {
    wx.login({
      success: function (res) {
        if (res.code) {
          console.log('登录-请求微信-success-成功', res);
          //发起网络请求
          wx.request({
            url: that.globalData.baseUrl + '/wxUser/login',
            data: {
              code: res.code
            },
            success: function (r) {
              if (r.statusCode == 200) {
                console.log('登录-请求服务器-success-成功', r);
                if (r.data.errorCode == 0) {
                  console.log('登录-服务器应答报文-成功', r.data);
                  that.globalData.token = r.data.data.token;
                } else {
                  console.log('登录-服务器应答报文-失败', r.data);
                }
              } else {
                console.log('登录-请求服务器-success-失败', r);
              }
              that.getWxUserInfo();
            },
            fail: function (r) {
              console.warn('登录-请求服务器-fail', r);
              that.getWxUserInfo();
            }
          })
        } else {
          console.log('登录-请求微信-success-失败', res.errMsg);
          that.getWxUserInfo();
        }
      },
      fail: function (res) {
        console.warn('登录-请求微信-fail', res);
        that.getWxUserInfo();
      },
      complete: function (res) { },
    })
  },

  /**
   * 获取微信用户信息并上传服务器保存
   */
  getWxUserInfo: function () {
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          console.log('获取用户信息-请求授权-success-已经授权', res);
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            withCredentials: true,
            lang: 'zh_CN',
            success: res => {
              console.log('获取用户信息-请求用户信息-success', JSON.stringify(res));
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              console.log('结果', JSON.stringify(that.globalData.userInfo));
              that.saveUser(res);

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            },
            fail: function (res) {
              console.warn('获取用户信息-请求用户信息-fail', res);
            }
          })
        } else {
          console.log('获取用户信息-请求授权-success-未授权', res);
        }
      },
      fail: function (res) {
        console.warn('获取用户信息-请求授权-fail', res);
      }
    })
  },

  saveUser: function (data) {
    console.log('token', that.globalData.token);
    wx.request({
      url: that.globalData.baseUrl + '/wxUser/saveUser',
      data: data,
      header: {
        'token': that.globalData.token
      },
      method: 'POST',
      success: function (res) {
        console.log('保存用户信息至服务器-success', res);
      },
      fail: function (res) {
        console.warn('保存用户信息至服务器-fail', res);
      }
    })
  }
})
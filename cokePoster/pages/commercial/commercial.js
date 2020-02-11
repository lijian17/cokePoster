// 海报生成
var util = require('../../utils/util.js');
var QRCode = require('../../utils/qrcode.js');
var that;

Page({
  /**
   * 页面的初始数据
   */
  data: {
    ctx: null,
    drawState: false,
    touchStartTime: 0,
    qrcode: null,
    g: { // 全局参数
      w: 750,
      h: 1200,
      bgcolor: '#f8f9fd'
    },
    bg: { // 背景
      x: 5,
      y: 5,
      w: 745,
      h: 1195,
      bgcolor: '#f8f9fd'
    },
    pTopImg: { // 头部大图
      url: 'https://www.54dxs.cn/www/html/test/father.png',
      path: '',
      tempPath: '',
      x: 5,
      y: 5,
      w: 750,
      h: 750,
      sw: 750,
      sh: 750,
      angle: 0
    },
    pContent: { // 内容主体
      font: '16px sans-serif',
      fillStyle: '#4A4B4F',
      text: '别因为一次失败，就放弃你原先所要达到的目的。\nDo not, for one repulse, give up the purpose that you resolved to effect.',
      x: 15,
      y: 25,
      w: 750,
      h: 750,
      sw: 750,
      sh: 750,
      maxWidth: 720,
      lineHeight: 20,
      inputShow: false
    },
    pDate: { // 时间
      font: '16px sans-serif',
      fillStyle: '#4A4B4F',
      text: '',
      x: 5,
      y: 5,
      w: 300,
      h: 120,
      sw: 300,
      sh: 120,
      maxWidth: 720,
      lineHeight: 20,
      inputShow: false
    },
    pQRcode: { // 二维码
      url: '',
      path: '../../images/qrcode-54dxs.png',
      x: 740,
      y: 642,
      w: 80,
      h: 80,
      sw: 120,
      sh: 90,
      angle: 0,
      text: 'http://weixin.qq.com/r/JHXh_S7E6HOXrWqa9yA2',
      stext: 'http://weixin.qq.com/r/JHXh_S7E6HOXrWqa9yA2',
      inputShow: false,
      timeStamp: 0
    },
    pName: { // 公众号名称
      font: '15px sans-serif',
      fillStyle: '#4A4B4F',
      text: '                           54大学生',
      x: 0,
      y: 0,
      w: 300,
      h: 20,
      sw: 120,
      sh: 30,
      maxWidth: 720,
      lineHeight: 20,
      inputShow: false
    },
    pTempImg: { // 海报导出
      url: '',
      path: '',
      x: 0,
      y: 0,
      w: 80,
      h: 80,
      angle: 0
    },
    touchScale: {
      startX: 0,
      endX: 0,
      scale: 0,
      x1: 0,
      x2: 0,
      y1: 0,
      y2: 0,
      imgLeft: 0,
      imgTop: 0,
      imgWidth: 0,
      imgHeight: 0,
      one: false,
      $touch: null,
      originalWidth: 50,
      originalHeight: 50,
      baseScale: 1,
      imgData: [],
      bgTop: 0,
      obj: null,
      timeStamp: 0
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
    this.init();
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

  },

  /**
   * 页面滚动触发事件的处理函数
   */
  onPageScroll: function () {

  },

  /**
   * 页面尺寸改变时触发，详见 响应显示区域变化
   */
  onResize: function () {

  },

  /**
   * 当前是 tab 页时，点击 tab 时触发
   */
  onTabItemTap: function (item) {
    console.log(item.index)
    console.log(item.pagePath)
    console.log(item.text)
  },

  /**
   * --------------------------------------------------------------------------------------------------------------
   * ---自定义事件处理----------------------------------------------------------------------------------------------
   * --------------------------------------------------------------------------------------------------------------
   */
  init: function () {
    wx.getSystemInfo({
      success: function (res) {
        var w = res.windowWidth;
        var h = res.windowWidth / 0.625;
        console.log('init============' + JSON.stringify(that.data));
        var data = that.data;
        data.g.w = w;
        data.g.h = h;
        data.bg.w = w - 10;
        data.bg.h = h - 5;
        data.pTopImg.w = w - 10;
        data.pTopImg.h = w - 5;
        data.pTopImg.sw = w;
        data.pTopImg.sh = w;
        data.pDate.w = w / 2;
        data.pDate.sw = w / 2;
        data.pQRcode.sw = w / 2;
        data.pQRcode.x = data.pQRcode.sw - data.pQRcode.w - 25;
        data.pQRcode.y = data.pQRcode.sh - data.pQRcode.h - 5;
        data.pName.sw = w / 2;
        data.pName.x = 0;
        data.pName.y = 0;
        data.pContent.h = h - that.data.pTopImg.sh - that.data.pQRcode.sh - that.data.pName.sh;
        data.pContent.sw = w;
        data.pContent.sh = h - that.data.pTopImg.sh - that.data.pQRcode.sh - that.data.pName.sh;
        data.pContent.maxWidth = w - 30;
        that.setData(data);
        console.log('init2============' + JSON.stringify(that.data))
        that.bginfo();
      },
    })
  },

  bginfo: function () {
    wx.showLoading({
      title: '获取海报数据中...',
    })
    console.log('bginfo---' + that.data.pTopImg.url)
    wx.downloadFile({
      url: that.data.pTopImg.url,
      success: function (res) {
        wx.showLoading({
          title: '海报生成中...',
        })
        wx.getImageInfo({
          src: res.tempFilePath,
          success: function (r) {
            that.data.ctx = wx.createCanvasContext('myCanvas');
            var pTopImg = that.data.pTopImg;
            pTopImg.path = res.tempFilePath;
            if (r.width <= r.height) {
              var ratio = r.width / pTopImg.sw;
              pTopImg.w = pTopImg.sw - 10;
              pTopImg.h = r.height / ratio - 5;
            } else {
              var ratio = r.height / pTopImg.sh;
              pTopImg.h = pTopImg.sh - 10;
              pTopImg.w = r.width / ratio - 5;
            }
            that.setData({
              pTopImg: pTopImg
            });
            that.drawPoster();
          }
        })
      }
    })
  },

  /**
   * 绘制海报
   */
  drawPoster: function () {
    that.drawTopImg();
    that.drawContent();
    that.drawDate();
    that.drawQRcode();
    that.drawName();
    wx.hideLoading();
  },

  /**
   * 绘制头部大图
   */
  drawTopImg: function () {
    var ctx = wx.createCanvasContext('pTopImg');
    var g = that.data.g;
    var pTopImg = that.data.pTopImg;

    // 背景色设置
    ctx.fillStyle = g.bgcolor;
    ctx.fillRect(0, 0, g.w, g.h);

    // 头部图
    ctx.drawImage(pTopImg.path, pTopImg.x, pTopImg.y, pTopImg.w, pTopImg.h);

    // 描边
    ctx.setFillStyle('#ffffff');
    ctx.fillRect(0, 0, g.w, 5); // 上
    ctx.fillRect(g.w - 5, 0, 5, g.h); // 右
    ctx.fillRect(0, 0, 5, g.h); // 左
    ctx.draw();
  },

  /**
   * 绘制主体内容
   */
  drawContent: function () {
    var ctx = wx.createCanvasContext('pContent');
    var g = that.data.g;
    var pContent = that.data.pContent;

    // 背景色设置
    ctx.fillStyle = g.bgcolor;
    ctx.fillRect(0, 0, g.w, g.h);

    // 主体内容
    ctx.font = pContent.font;
    ctx.setFillStyle(pContent.fillStyle);
    util.wrapText(ctx, pContent.text, pContent.x, pContent.y, pContent.maxWidth, pContent.lineHeight);

    // 描边
    ctx.setFillStyle('#ffffff');
    ctx.fillRect(g.w - 5, 0, 5, g.h); // 右
    ctx.fillRect(0, 0, 5, g.h); // 左
    ctx.draw();
  },

  /**
   * 绘制日期
   */
  drawDate: function () {
    var ctx = wx.createCanvasContext('pDate');
    var g = that.data.g;
    var pDate = that.data.pDate;

    // 背景色设置
    ctx.fillStyle = g.bgcolor;
    ctx.fillRect(0, 0, g.w, g.h);

    // 日期
    var now = new Date();
    var year = now.getFullYear();
    var month = util.appendZero(now.getMonth() + 1);
    var date = util.appendZero(now.getDate());
    var weeknum = util.getWeek(now.getDay());

    ctx.font = pDate.font;
    ctx.setFillStyle(pDate.fillStyle);
    ctx.setFontSize(14);
    ctx.fillText('D A T E', 15, 55);

    ctx.setFontSize(50);
    ctx.fillText(date, 10, 105);

    ctx.setFontSize(14);
    ctx.fillText(weeknum, 80, 85);
    ctx.fillText(month + ' / ' + year, 80, 105);

    // 描边
    ctx.setFillStyle('#ffffff');
    ctx.fillRect(0, pDate.h - 5, pDate.w, 5); // 下
    ctx.fillRect(0, 0, 5, pDate.h); // 左
    ctx.draw();
  },

  /**
   * 绘制二维码
   */
  drawQRcode: function () {
    var ctx = wx.createCanvasContext('pQRcode');
    var g = that.data.g;
    var pQRcode = that.data.pQRcode;

    // 背景色设置
    ctx.fillStyle = g.bgcolor;
    ctx.fillRect(0, 0, pQRcode.sw, pQRcode.sh);

    // 二维码
    if (pQRcode.angle != 0) {
      ctx.save();
      ctx.translate(pQRcode.x + pQRcode.w / 2, pQRcode.y + pQRcode.h / 2);
      ctx.rotate((pQRcode.angle % 360) / 180 * Math.PI);
      ctx.translate(-(pQRcode.x + pQRcode.w / 2), -(pQRcode.y + pQRcode.h / 2));
      ctx.drawImage(pQRcode.path, pQRcode.x, pQRcode.y, pQRcode.w, pQRcode.h);
      ctx.restore();
    } else {
      ctx.drawImage(pQRcode.path, pQRcode.x, pQRcode.y, pQRcode.w, pQRcode.h);
    }

    // 描边
    ctx.setFillStyle('#ffffff');
    ctx.fillRect(pQRcode.sw - 5, 0, 5, pQRcode.sh); // 右
    ctx.draw();
  },

  /**
   * 绘制公众号名称
   */
  drawName: function () {
    var ctx = wx.createCanvasContext('pName');
    var g = that.data.g;
    var pName = that.data.pName;

    // 背景色设置
    ctx.fillStyle = g.bgcolor;
    ctx.fillRect(0, 0, pName.sw, pName.sh);

    // 主体内容
    ctx.font = pName.font;
    ctx.setFillStyle(pName.fillStyle);
    ctx.fillText(pName.text, pName.x, pName.y + 15);

    // 描边
    ctx.setFillStyle('#ffffff');
    ctx.fillRect(pName.sw - 5, 0, 5, pName.sh); // 右
    ctx.fillRect(0, pName.sh - 5, pName.sw, pName.sh - 5); // 下
    ctx.draw();
  },

  canvasdraw: function (callback) {
    var ctx = that.data.ctx;
    var g = that.data.g;
    var bg = that.data.bg;
    var pTopImg = that.data.pTopImg;
    var pContent = that.data.pContent;
    var pDate = that.data.pDate;
    var pQRcode = that.data.pQRcode;
    var pName = that.data.pName;
    console.log('pTopImg-----------', pTopImg);
    console.log('pQRcode-----------', pQRcode);

    // 日期
    var now = new Date();
    var year = now.getFullYear();
    var month = util.appendZero(now.getMonth() + 1);
    var date = util.appendZero(now.getDate());
    var weeknum = util.getWeek(now.getDay());

    // 背景色设置
    ctx.fillStyle = g.bgcolor;
    ctx.fillRect(0, 0, g.w, g.h);

    // 头部图
    ctx.drawImage(pTopImg.tempPath, 5, 5, pTopImg.sw - 10, pTopImg.sh - 5);

    ctx.font = pContent.font;
    ctx.setFillStyle(pContent.fillStyle);
    util.wrapText(ctx, pContent.text, pContent.x, pTopImg.sh + pContent.y, pContent.maxWidth, pContent.lineHeight);

    ctx.setFontSize(14);
    ctx.fillText('D A T E', 15, g.h - 60);

    ctx.setFontSize(50);
    ctx.fillText(date, 10, g.h - 12);

    ctx.setFontSize(14);
    ctx.fillText(weeknum, 80, g.h - 35);
    ctx.fillText(month + ' / ' + year, 80, g.h - 12);

    if (pQRcode.angle != 0) {
      ctx.save();
      ctx.translate(pQRcode.x + pQRcode.w / 2, pQRcode.y + pQRcode.h / 2);
      ctx.rotate((pQRcode.angle % 360) / 180 * Math.PI);
      ctx.translate(-(pQRcode.x + pQRcode.w / 2), -(pQRcode.y + pQRcode.h / 2));
      ctx.drawImage(pQRcode.path, pDate.sw + pQRcode.x, pTopImg.sh + pContent.sh + pQRcode.y, pQRcode.w, pQRcode.h);
      ctx.restore();
    } else {
      ctx.drawImage(pQRcode.path, pDate.sw + pQRcode.x, pTopImg.sh + pContent.sh + pQRcode.y, pQRcode.w, pQRcode.h);
    }

    ctx.font = pName.font;
    ctx.fillText(pName.text, pDate.sw + pName.x, pTopImg.sh + pContent.sh + pQRcode.sh + pName.y + 15);

    // 描边
    ctx.setFillStyle('#ffffff');
    ctx.fillRect(0, 0, g.w, 5); // 上
    ctx.fillRect(g.w - 5, 0, 5, g.h); // 右
    ctx.fillRect(0, g.h - 5, g.w, 5); // 下
    ctx.fillRect(0, 0, 5, g.h); // 左

    ctx.draw(true, function () {
      that.canvasToTempImg(callback);
    });
  },

  canvasToTempImg: function (callback) {
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: that.data.g.w,
      height: that.data.g.h,
      canvasId: 'myCanvas',
      success: function (res) {
        that.data.pTempImg.path = res.tempFilePath;
        that.setData({
          drawState: true
        });
        if (typeof callback == 'function') {
          wx.hideToast();
          callback();
        }
      },
      fail: function () {
        wx.hideToast();
        wx.showToast({
          title: '海报生成失败...',
          icon: 'none',
          duration: 1000,
          mask: true
        })
      }
    })
  },

  createTempImage: function (callback) {
    wx.canvasToTempFilePath({
      x: 5,
      y: 5,
      width: that.data.pTopImg.sw - 10,
      height: that.data.pTopImg.sh - 5,
      canvasId: 'pTopImg',
      success: function (res) {
        console.log(res.tempFilePath)
        that.setData({
          pTopImg: util.setData(that.data.pTopImg, 'tempPath', res.tempFilePath)
        });
        that.canvasdraw(callback);
      }
    })
  },

  /**
   * 预览海报
   */
  clickPreview: function () {
    if (!that.data.pTempImg.path || !that.data.drawState) {
      wx.showToast({
        title: '海报预览准备中...',
        icon: 'loading',
        duration: 2000,
        mask: true
      })
      that.createTempImage(that.clickPreview);
      return;
    }
    wx.previewImage({
      urls: [that.data.pTempImg.path],
    })
  },

  /**
   * 保存海报
   */
  clickSave: function () {
    if (!that.data.pTempImg.path || !that.data.drawState) {
      wx.showToast({
        title: '海报保存中...',
        icon: 'loading',
        duration: 2000,
        mask: true
      })
      that.createTempImage(that.clickSave);
      return;
    }
    wx.saveImageToPhotosAlbum({
      filePath: that.data.pTempImg.path,
      success: function (res) {
        wx.showModal({
          content: '海报已保存到相册，赶紧晒一下吧~',
          showCancel: false,
          confirmText: '好哒',
          confirmColor: '#07c160',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定');
            }
          }
        })
      },
      fail: function () {
        wx.showToast({
          title: '海报保存失败',
          icon: 'none',
          duration: 2000,
          mask: true
        })
      }
    })
  },

  /**
   * 长按事件分发
   */
  longClickCanvas: function (e) {
    console.log("长按事件: " + JSON.stringify(e));
    // 双击
    if (e.timeStamp - that.data.touchStartTime < 300) {
      console.log('双击事件');
      var objname = e.target.dataset.objname;
      // 头部大图
      if (objname == 'pTopImg') {
        console.log('头部大图');
        that.longClickCanvasTopTmg(e);
      }

      // 内容主体
      else if (objname == 'pContent') {
        console.log('内容主体');
        that.longClickCanvasContent(e);
      }

      // 二维码
      else if (objname == 'pQRcode') {
        console.log('二维码');
        that.longClickCanvasQRcode(e);
      }

      // 公众号名称
      else if (objname == 'pName') {
        console.log('公众号名称');
        that.longClickCanvasName(e);
      }

    }

    // 单击
    else {

    }
    that.setData({
      touchStartTime: e.timeStamp
    });
  },

  /**
   * 长按事件-头部大图
   */
  longClickCanvasTopTmg: function (e) {
    wx.chooseImage({
      success: function (res) {
        that.setData({
          drawState: false
        });
        wx.getImageInfo({
          src: res.tempFilePaths[0],
          success: function (r) {
            var pTopImg = that.data.pTopImg;
            pTopImg.path = res.tempFilePaths[0];
            if (r.width <= r.height) {
              var ratio = r.width / pTopImg.sw;
              pTopImg.w = pTopImg.sw - 10;
              pTopImg.h = r.height / ratio - 5;
            } else {
              var ratio = r.height / pTopImg.sh;
              pTopImg.h = pTopImg.sh - 10;
              pTopImg.w = r.width / ratio - 5;
            }
            that.setData({
              pTopImg: pTopImg
            });
            that.drawTopImg();
          }
        })
      },
    })
  },

  /**
   * 长按事件-内容主体
   */
  longClickCanvasContent: function (e) {
    that.setData({
      drawState: false,
      pContent: util.setData(that.data.pContent, 'inputShow', true)
    })
  },

  /**
   * 修改内容主体
   */
  changeContent: function (e) {
    console.log(JSON.stringify(e));
    var text = e.detail.value;
    var pContent = that.data.pContent;
    pContent.text = text;
    pContent.inputShow = false;
    that.setData({
      pContent: pContent
    });
    that.drawContent();
  },

  /**
   * 长按事件-二维码
   */
  longClickCanvasQRcode: function (e) {
    wx.chooseImage({
      success: function (res) {
        that.setData({
          drawState: false
        });
        that.data.pQRcode.path = res.tempFilePaths[0];
        that.drawQRcode();
      },
    })
  },

  clickCanvasQRcode: function () {
    that.setData({
      drawState: false,
      pQRcode: util.setData(that.data.pQRcode, 'inputShow', true)
    })
  },

  /**
   * 修改二维码
   */
  changeQRcode: function (e) {
    // 这里有个“坑”，点击“确定”按钮会调用两次
    if ((e.timeStamp - that.data.pQRcode.timeStamp) < 50) {
      return;
    }
    that.setData({
      pQRcode: util.setData(that.data.pQRcode, 'timeStamp', e.timeStamp)
    })
    console.log(JSON.stringify(e));
    var text = e.detail.value;
    var pQRcode = that.data.pQRcode;
    pQRcode.text = text;
    pQRcode.inputShow = false;
    that.setData({
      pQRcode: pQRcode
    });
    that.textToQRcode();
  },

  textToQRcode: function () {
    if (!that.data.qrcode) {
      that.setData({
        qrcode: new QRCode.QRCode('qrcode', {
          text: that.data.pQRcode.text || that.data.pQRcode.stext,
          width: that.data.pQRcode.w,
          height: that.data.pQRcode.h,
          colorDark: "#000000",
          colorLight: "#ffffff"
        }, function () {
          that.textToQRcodeCallback();
        })
      })
    } else {
      that.data.qrcode.makeCode(that.data.pQRcode.text || that.data.pQRcode.stext);
    }
  },

  textToQRcodeCallback: function () {
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: that.data.pQRcode.w,
      height: that.data.pQRcode.h,
      canvasId: 'qrcode',
      success: function (res) {
        console.log(res.tempFilePath)
        that.setData({
          pQRcode: util.setData(that.data.pQRcode, 'path', res.tempFilePath)
        });
        that.drawQRcode();
      }
    })
  },

  /**
   * 长按事件-公众号名称
   */
  longClickCanvasName: function (e) {
    that.setData({
      drawState: false,
      pName: util.setData(that.data.pName, 'inputShow', true)
    })
  },

  /**
   * 修改公众号名称
   */
  changeName: function (e) {
    console.log(JSON.stringify(e));
    var text = e.detail.value;
    var pName = that.data.pName;
    pName.text = text;
    pName.inputShow = false;
    that.setData({
      pName: pName
    });
    that.drawName();
  },

  touchStart: function (e) {
    console.log('手指触摸动作开始：' + JSON.stringify(e));

    that.confirmObj(e);
    if (!that.data.touchScale.obj) {
      return;
    }
    var fingers = e.touches.length; // 屏幕上手指数量
    if (fingers == 2) {
      // 缩放图片的时候X坐标起始值
      var touchScale = that.data.touchScale;
      touchScale.startX = Math.abs(e.touches[0].x - e.touches[1].x);
      touchScale.one = false;
      that.setData({
        touchScale: touchScale
      });
    } else if (fingers == 1) {
      var touchScale = that.data.touchScale;
      touchScale.x1 = e.touches[0].x;
      touchScale.y1 = e.touches[0].y;
      touchScale.one = true;
      that.setData({
        touchScale: touchScale
      });
    }
    that.siteData();
  },

  touchMove: function (e) {
    console.log('手指触摸后移动1：' + JSON.stringify(e));

    if ((e.timeStamp - that.data.touchScale.timeStamp) < 50) {
      return;
    }
    that.setData({
      touchScale: util.setData(that.data.touchScale, 'timeStamp', e.timeStamp)
    })
    console.log('手指触摸后移动2：' + JSON.stringify(e));

    if (!that.data.touchScale.obj) {
      return;
    }
    var fingers = e.touches.length; // 屏幕上手指数量
    if (fingers == 2) {
      // 缩放图片的时候X坐标滑动变化值
      var touchScale = that.data.touchScale;
      touchScale.endX = Math.abs(e.touches[0].x - e.touches[1].x);
      touchScale.scale = touchScale.endX - touchScale.startX;
      that.setData({
        touchScale: touchScale
      });
      var pTopImg = that.data.pTopImg;
      pTopImg.w = touchScale.originalWidth + touchScale.scale;
      pTopImg.h = (touchScale.originalWidth + touchScale.scale) / touchScale.baseScale;
      pTopImg.x = touchScale.imgLeft;
      pTopImg.y = touchScale.imgTop;
      that.setData({
        pTopImg: pTopImg
      });
      that.drawTopImg();
    } else if (fingers == 1) {
      var touchScale = that.data.touchScale;
      touchScale.x2 = e.touches[0].x;
      touchScale.y2 = e.touches[0].y;
      that.setData({
        touchScale: touchScale
      });
      if (touchScale.one) {
        // 当 宽/高 小于 展示区域时，横/纵 坐标不予位移，以便保证图片的完整显示，不留空白边缘。
        var pTopImg = that.data.pTopImg;
        var moveX = touchScale.imgLeft + (touchScale.x2 - touchScale.x1);
        var moveY = touchScale.imgTop + (touchScale.y2 - touchScale.y1);
        if (moveX <= 0 && (moveX + pTopImg.w) >= (pTopImg.sw - 10)) {
          pTopImg.x = moveX;
        }
        if (moveY <= 0 && (moveY + pTopImg.h) >= (pTopImg.sh - 5)) {
          pTopImg.y = moveY;
        }
        that.setData({
          pTopImg: pTopImg
        });
        that.drawTopImg();
      }
    }
  },

  touchEnd: function (e) {
    console.log('手指触摸动作结束：' + JSON.stringify(e));
    if (!that.data.touchScale.obj) {
      return;
    }
    var touchScale = that.data.touchScale;
    // 手指移开后保存图片的宽
    touchScale.originalWidth = 0;
    touchScale.imgData = [
      [touchScale.imgLeft, touchScale.imgTop - touchScale.bgTop, touchScale.imgWidth, touchScale.imgHeight],
      [0, 0, 640, 640]
    ];
    touchScale.obj = null;
    that.setData({
      touchScale: touchScale
    });
    that.setData({
      drawState: false
    });
  },

  touchCancel: function (e) {
    console.log('手指触摸动作被打断，如来电提醒，弹窗：' + JSON.stringify(e));
  },

  siteData: function () {
    var touchScale = that.data.touchScale;
    var obj = touchScale.obj;
    touchScale.imgLeft = obj.x;
    touchScale.imgTop = obj.y;
    touchScale.imgWidth = obj.w;
    touchScale.imgHeight = obj.h;

    touchScale.originalWidth = obj.w;
    touchScale.originalHeight = obj.h;
    touchScale.baseScale = parseFloat(touchScale.originalWidth / touchScale.originalHeight);

    that.setData({
      touchScale: touchScale
    });
  },

  confirmObj: function (e) {
    var x = e.touches[0].x;
    var y = e.touches[0].y;
    var g = that.data.g;
    var pTopImg = that.data.pTopImg;
    var pContent = that.data.pContent;
    var pQRcode = that.data.pQRcode;
    var pName = that.data.pName;
    that.setData({
      touchScale: util.setData(that.data.touchScale, 'obj', pTopImg)
    })
  }
})
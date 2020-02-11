// 工具类

/**
 * 格式化时间
 * @param {Object} date 时间对象
 * return 返回 2019-07-11 11:47:50
 */
function formatTime(date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(appendZero).join('-') + ' ' + [hour, minute, second].map(appendZero).join(':')
}

/**
 * 不足两位前面补零
 * @param {Object} n 数字🔢
 * return (返回：5->05)
 */
function appendZero(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 * 获取星期
 * @param {Object} weeknum date对象中的星期值
 * return (返回：0->星期日)
 */
function getWeek(weeknum) {
  var week = '星期日';
  if (weeknum == 0) week = "星期日";
  else if (weeknum == 1) week = "星期一";
  else if (weeknum == 2) week = "星期二";
  else if (weeknum == 3) week = "星期三";
  else if (weeknum == 4) week = "星期四";
  else if (weeknum == 5) week = "星期五";
  else if (weeknum == 6) week = "星期六";
  return week;
}

/**
 * 文本绘制自动换行
 * @param {Object} canvas 绘图对象
 * @param {Object} text 要绘制的文本
 * @param {Object} x 起始x坐标
 * @param {Object} y 起始y坐标
 * @param {Object} maxWidth 绘图区域最大宽度
 * @param {Object} lineHeight 文本绘制行高
 * return (返回：0->星期日)
 */
function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  if (!ctx || typeof text != 'string' || typeof x != 'number' || typeof y != 'number') {
    return;
  }

  if (typeof maxWidth == 'undefined') {
    maxWidth = (ctx && ctx.width) || 300;
  }
  if (typeof lineHeight == 'undefined') {
    lineHeight = 20;
  }

  // 字符分隔为数组
  var arrText = text.split('');
  var line = '';

  for (var n = 0; n < arrText.length; n++) {
    var testLine = line + arrText[n];
    var testWidth = ctx.measureText(testLine).width;
    if ((testWidth > maxWidth && n > 0) || arrText[n] == '\n') {
      ctx.fillText(line.trim(), x, y);
      line = arrText[n];
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line.trim(), x, y);
}

/**
 * 设置对象中字段的值
 * @param {Object} obj 要操作的对象
 * @param {String} key 要操作对象的字段的key
 * @param {Object} val 要操作对象的字段的val
 */
function setData(obj, key, val) {
  obj[key] = val;
  return obj;
}

/**
 * 给对象批量设置对象属性
 * @param {Object} obj 要操作的对象
 * @param {Object} option 要设置的属性集
 */
function setObj(obj, option) {
  if (!obj || !option) {
    console.warn('没有该对象/属性');
    return obj;
  }
  for (var i in option) {
    obj[i] = option[i];
  }
  return obj;
}

module.exports = {
  formatTime: formatTime,
  appendZero: appendZero,
  getWeek: getWeek,
  wrapText: wrapText,
  setData: setData,
  setObj: setObj
}
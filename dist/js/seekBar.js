"use strict";

(function ($, root, music) {
  //托拽进度条事件
  // cidirl拖动
  var curDuration = null; //歌曲总时长

  var frameId = null; //定时器id

  var percent = 0; // 百分比

  var lastPer = 0; //最后一次百分比

  var dragLen = $('.drag').width(); // 播放条长度

  var curPlace = $('.circle').offset().left; //圆点位置

  console.log(music);
  $('.progress .drag .circle').on('touchstart', function (e) {
    $('.progress .drag').on('touchmove', function (e) {
      percent = (e.touches[0].clientX - curPlace) / dragLen - 0.05;
      percent = percent >= 1 ? 1 : percent;
      percent = percent <= 0 ? 0 : percent;
      stop();
      dataUp(percent);
    });
    $('.progress .drag .circle').on('touchend', function (e) {
      $('.progress .drag .circle').off('touchend');
      $('.progress .drag').off();
      start();
      music.playTo(curDuration * percent);

      if (music.status == 'pause') {
        stop();
        music.pause();
      } else {
        music.play();
      }
    });
  }); //开始记时

  function start() {
    cancelAnimationFrame(frameId); //清计时器

    var newTime = new Date().getTime(); //定时器方法

    function frame() {
      var curtime = new Date().getTime(); //计算百分比

      percent = lastPer + (curtime - newTime) / (curDuration * 1000);
      dataUp(percent); //更新 时间 圆点 进度条

      frameId = requestAnimationFrame(frame); //开启计时器
    }

    frame();
  } //事件停止


  function stop() {
    lastPer = percent;
    cancelAnimationFrame(frameId);
  } //清空全局 lastPer 


  function clear() {
    lastPer = 0;
    start();
    stop();
  } // 更新事件 +  进度条


  function dataUp(per) {
    var curTime = Math.round(per * curDuration); //per 百分比  curDuration 歌曲总时长

    var t = formatTime(curTime);
    $('.progress .curTime').html(t); //更新圆点

    console.log(Math.round(percent * 100) / 100);
    $('.progress .drag .circle').css({
      left: Math.round(percent * 100) - 5 + '%'
    }); //更新进度条

    $('.progress .drag .backBg').css({
      width: Math.round(percent * 100) + '%'
    });
  } //绘制总时长 04:02


  function renderAllTime(time) {
    curDuration = time; //把事件同步到全局作用域

    var t = formatTime(time); //返回 00：00 格式

    $('.progress .totalTime').html(t);
  } // 工具方法 返回 00：00 格式


  function formatTime(t) {
    var m = Math.floor(t / 60);
    var s = t - m * 60;
    m = m >= 10 ? m : '0' + m;
    s = s >= 10 ? s : '0' + s;
    return m + ':' + s;
  }

  root.seekBar = {
    per: percent,
    renderAllTime: renderAllTime,
    dataUp: dataUp,
    start: start,
    stop: stop,
    clear: clear
  };
})(window.Zepto, window.player || (window.player = {}), window.player.music);
"use strict";

(function ($, root) {
  function AudioManage() {
    this.audio = new Audio(); // 创建audio 实例

    this.status = 'pause'; // 默认暂停
  }

  AudioManage.prototype = {
    // 加载音乐
    load: function load(src) {
      this.audio.src = src;
      this.audio.load(); // this.play();
    },
    play: function play() {
      this.audio.play();
      this.status = 'play';
    },
    pause: function pause() {
      this.audio.pause();
      this.status = 'pause';
    },
    //播放完成时间
    end: function end(fn) {
      this.audio.onended = fn;
    },
    //跳到时间点
    playTo: function playTo(time) {
      this.audio.currentTime = time; //单位为秒
    }
  };
  root.music = new AudioManage();
})(window.Zepto, window.player || (window.player = {}));
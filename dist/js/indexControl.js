"use strict";

(function ($, root) {
  function Index(len) {
    this.index = 0; //当前索引值

    this.len = len; // json 数据长度 ，用于做判断
  }

  Index.prototype = {
    prev: function prev() {
      return this.get(-1);
    },
    next: function next() {
      return this.get(1);
    },
    //用来获取索引 ，参数为 +1 或  —1
    get: function get(val) {
      // val  1 / -1
      this.index = (this.index + val + this.len) % this.len;
      return this.index;
    }
  };
  root.controlIndex = Index;
  console.log(Index);
})(window.Zepto, window.player || (window.player = {}));
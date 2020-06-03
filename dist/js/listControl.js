"use strict";

(function ($, root) {
  function listControl(data, wrap) {
    var list = document.createElement('div'),
        dl = document.createElement('dl'),
        dt = document.createElement('dt'),
        close = document.createElement('div');
    var musicList = [];
    list.className = 'list';
    dt.innerText = '播放列表';
    dl.appendChild(dt);
    close.className = 'close';
    close.innerText = '关闭';
    data.forEach(function (ele, index) {
      var $dd = $('<dd></dd>');
      $dd.text(ele.song).appendTo($(dl)).on('touchend', function () {
        // $('dd').removeClass('active');
        // $(this).addClass('active');
        changeSelect(index);
      });
      musicList.push($dd);
    });
    $(dt).next().addClass('active');
    list.appendChild(dl);
    list.appendChild(close);
    wrap.appendChild(list);

    function slideup() {
      $('.list').css({
        transform: 'translateY(0)'
      });
    }

    function slidedown() {
      $('.list').css({
        transform: 'translateY(100%)'
      });
    }

    function changeSelect(index) {
      $('dd').removeClass('active');
      console.log(musicList);
      musicList[index].addClass('active'); // console.log(musicList);
    }

    return {
      dom: list,
      musicList: musicList,
      slideUp: slideup,
      slideDown: slidedown,
      changeSelect: changeSelect
    };
  }

  root.listControl = listControl;
})(window.Zepto, window.player || (window.player = {}));
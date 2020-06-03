"use strict";

//渲染功能：渲染图片 音乐信息 是否喜欢
(function ($, root) {
  function renderImg(src) {
    var img = new Image();
    img.src = src;

    img.onload = function () {
      $('.songImg img').attr('src', src);
      root.blurImg(img, $('body'));
    };
  }

  function renderInfo(data) {
    $('.songInfo .name').text(data.song);
    $('.songInfo .singer').text(data.singer);
    $('.songInfo .album').text(data.album);
  }

  function renderIsLike(islike) {
    if (islike) {
      $('.control .icon-like').addClass('like');
    } else {
      $('.control .icon-like').removeClass('like');
    }
  }

  root.render = function (data) {
    // console.log(data.image)
    // var img  =new Image();
    // img.src = data.image;
    // img.onload = function(){
    //     document.body.append(this);
    // }
    renderImg(data.image);
    renderInfo(data);
    renderIsLike(data.isLike);
  };
})(window.Zepto, window.player || (window.player = {}));
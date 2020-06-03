"use strict";

(function ($, player) {
  function MusicPlayer(dom) {
    this.wrap = dom;
    this.dataList = []; // this.now = 0;

    this.indexObj = null; //切歌

    this.rotateTimer = null;
  }

  MusicPlayer.prototype = {
    init: function init() {
      // 初始化
      this.getDom(); // 获取元素

      this.getData('../mock/data.json'); // 请求数据

      this.seekBar();
    },
    getDom: function getDom() {
      // 获取页面里的元素 
      this.record = document.querySelector('.songImg img'); // 旋转图片

      this.controlBtns = document.querySelectorAll('.control li'); // 底部导航里的按钮
    },
    getData: function getData(url) {
      var _this = this;

      $.ajax({
        type: 'GET',
        url: url,
        success: function success(data) {
          _this.dataList = data;

          _this.listPlay(); //列表切割 放在loadMusic 的前面


          _this.indexObj = new player.controlIndex(data.length);

          _this.loadMusic(_this.indexObj.index); // _this.list.changeSelect(_this.indexObj.index);


          _this.musicControl();
        },
        error: function error() {
          console.log('数据请求失败');
        }
      });
    },
    loadMusic: function loadMusic(curIndex) {
      //加载音乐
      player.render(this.dataList[curIndex]);
      player.music.load(this.dataList[curIndex].audio);
      player.seekBar.renderAllTime(this.dataList[curIndex].duration);
      $(this.record).data('deg', 0); //设置旋转初始值 0

      this.record.style.transform = 'rotate(0deg)';

      if (player.music.status == 'play') {
        player.music.play();
        player.seekBar.clear();
        player.seekBar.start();
        this.imgRotate(0); //旋转 0  加载完成 状态是paly 
      } else if (player.music.status == 'pause') {
        player.music.pause();
        player.seekBar.clear();
      } // this.imgRotate($(this.record).data('deg'));

    },
    musicControl: function musicControl() {
      //控制音乐 上一曲 下一曲 播放
      //上一曲
      var _this = this;

      this.controlBtns[1].addEventListener('touchend', function () {
        _this.loadMusic(_this.indexObj.prev());

        _this.list.changeSelect(_this.indexObj.index);
      }); //下一曲

      this.controlBtns[3].addEventListener('touchend', function () {
        _this.loadMusic(_this.indexObj.next());

        _this.list.changeSelect(_this.indexObj.index);
      }); //暂停

      this.controlBtns[2].addEventListener('touchend', function () {
        if (player.music.status == 'play') {
          //判断是否播放中
          player.music.pause(); //暂停

          player.seekBar.stop();
          player.music.status = 'pause'; //更改播放状态 ---暂停中。。。

          $(this).addClass('icon-bofang').removeClass('icon-zanting'); //控制显示图标

          clearInterval(_this.rotateTimer); //暂停图片旋转
        } else {
          //暂停中
          player.music.play(); // 播放

          player.music.status = 'play'; //更改播放状态 ---播放中。。。

          $(this).addClass('icon-zanting').removeClass('icon-bofang'); //控制显示图标

          _this.imgRotate($(_this.record).data('deg')); // 图片旋转


          player.seekBar.start();
        }
      }); //控制歌曲菜单

      this.controlBtns[4].addEventListener('touchend', function () {
        _this.list.slideUp();
      });
      $('.list .close').on('touchend', function () {
        _this.list.slideDown();
      }); //list列表添加事件

      _this.list.musicList.forEach(function (ele, index) {
        ele.on('touchend', function () {
          if (_this.indexObj.index == index) {
            return;
          } else {
            _this.indexObj.index = index;

            _this.loadMusic(_this.indexObj.index);

            _this.list.slideDown();
          }
        });
      }); //播放完


      player.music.end(function () {
        console.log('this over');

        _this.loadMusic(_this.indexObj.prev());

        _this.list.changeSelect(_this.indexObj.index);
      });
    },
    imgRotate: function imgRotate(deg) {
      //旋转唱片
      var _this = this;

      clearInterval(this.rotateTimer);
      this.rotateTimer = setInterval(function () {
        deg = +deg + 0.2; // 前面的加号 隐式类型转换 成数字

        _this.record.style.transform = 'rotate(' + deg + 'deg)';
        $(_this.record).data('deg', deg);
      }, 1000 / 60);
    },
    listPlay: function listPlay() {
      this.list = player.listControl(this.dataList, this.wrap);
    },
    seekBar: function seekBar() {
      //player.music --end(fn)//播放结束事件 --playTo(time) 跳到时间点
      //left : -5% -- -95%
      this.seekbar = player.seekBar;
    }
  };
  var musicplayer = new MusicPlayer(document.querySelector('.wrap'));
  musicplayer.init();
})(window.Zepto, window.player);
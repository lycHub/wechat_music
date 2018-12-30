const sheetServe = require('../../services/sheet.service.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    params: {
      disstid: null,
      song_begin: 1,
      song_num: 15
    },
    songList: [],
    otherDatas: {},
    total_page: 0,
    current_page: 1,
    isToBottom: false,

    // 按钮播放全部的className
    playAll_class: 'play_start',

    // 当前播放索引
    currentIndex: -1,

    // 是否正在播放
    playState: false,

    // 已经播放过
    hasPlayed: false,

    loop: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.id) {
      this.setData({
        'params.disstid': options.id
      });
      this.getDatas(true);
    }
  },


  onReady() {
    const playAll = wx.createSelectorQuery().select('.song_sheet .info_wrap .info .play_start');
    playAll.boundingClientRect(rect => {
      this.btnTop = rect.top;
      // console.log(this.btnTop);
    }).exec()
  },

  onPageScroll({ scrollTop }) {
    const hasFixed = /fix/.test(this.data.playAll_class);

    // if (scrollTop > this.data.currentTop)
    if (scrollTop >= this.btnTop) {
      if (!hasFixed) {
        // console.log('b');
        this.setData({
          playAll_class: 'play_start fix',
          currentTop: scrollTop
        });
      }
    }else{
      if (hasFixed) {
        // console.log('a');
        this.setData({
          playAll_class: 'play_start'
        });
      }
    }
  },


  onReachBottom(){
    const page = Math.min(Math.max(1, this.data.current_page + 1), this.data.total_page);
    if (page !== this.data.current_page) {
      this.data.current_page = page;
      this.setData({
        'params.song_begin': (page - 1) * 15
      });
      this.getDatas();
    }
  },


  // 播放/暂停切换
  togglePlay(event) {
    if (this.data.currentIndex < 0) {
      this.playSong();
    } else {
      this.setData({ playState: !this.data.playState });
    }
  },


  // 点击播放歌曲
  playSong(event) {
    let index = event.currentTarget.dataset.index || 0;
    // if (!event.currentTarget.dataset.index) {
    //   index = 0;
    // }else{
    //   index = event.currentTarget.dataset.index
    // }
    this.setData({ currentIndex: index, hasPlayed: true });
  },


  // 接收正在播放事件
  onPlaying() {
    this.setData({ playState: true });
  },


  // 接收暂停事件
  onPausing() {
    this.setData({ playState: false });
  },


  // 结束播放结束事件
  onEnded() {
    this.setData({ playState: false });
    const index = Math.min(this.data.currentIndex + 1, this.data.songList.length - 1);
    this.setData({ currentIndex: index });
    console.log('currentIndex', this.data.currentIndex);
  },



  getDatas(init = false) {
    sheetServe.getSheets(this.data.params).then(res => {
      if (init) {
        this.setData({
          songList: res.songlist,
          otherDatas: {
            logo: res.logo,
            dissname: res.dissname,
            nickname: res.nickname,
            visitnum: (res.visitnum / 1000).toFixed(1),
            songnum: res.songnum
          },
          total_page: Math.ceil(res.songnum / this.data.params.song_num)
        });
      }else{
        this.setData({
          songList: this.data.songList.concat(res.songlist),
          isToBottom: this.data.current_page >= this.data.total_page
        });
      }

      
      // console.log(this.data.songList);
      // console.log('total_page', this.data.total_page);
    });
  }
})
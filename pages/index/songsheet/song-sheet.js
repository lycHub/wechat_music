const sheetServe = require('../../../services/sheet.service.js');
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
    playAll_class: 'play_start'
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

  getBtnTop(val) {
    this.btnTop = val.detail;
  },


  onPageScroll({ scrollTop }) {
    const hasFixed = /fix/.test(this.data.playAll_class);

    // if (scrollTop > this.data.currentTop)
    if (scrollTop >= this.btnTop) {
      if (!hasFixed) {
        // console.log('b');
        this.setData({
          playAll_class: 'play_start fix'
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
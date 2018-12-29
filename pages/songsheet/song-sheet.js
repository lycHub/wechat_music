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
    isToBottom: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.id) {
      this.setData({
        'params.disstid': options.id
      });

      // const audio = wx.createInnerAudioContext();
      // audio.src = 'http://117.21.183.22/amobile.music.tc.qq.com/C400002ihFxm1EarI4.m4a?guid=1523753600&vkey=3FE6D694C441CF43415B531529A531F32C309FF35059DDCE192EEADE8768455BA71803F596BA1DE3FF21D2EA153C557D5727210B67CAAEA2&uin=500&fromtag=38';
      // audio.play();

      // audio.onError(function(err) {
      //   console.log('err', err);
      // });
      this.getDatas(true);
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
            visitnum: res.visitnum,
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

      
      // console.log('songList', this.data.songList);
      // console.log('total_page', this.data.total_page);
    });
  }
})
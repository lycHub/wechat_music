const sheetServe = require('../../services/sheet.service.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    params: {
      disstid: null,
      song_begin: 15,
      song_num: 15
    },
    songDatas: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.id) {
      this.setData({
        'params.disstid': options.id
      });

      const audio = wx.createInnerAudioContext();
      audio.src = 'http://117.21.183.22/amobile.music.tc.qq.com/C400002ZKnKQ34rbZu.m4a?guid=1523753600&vkey=AEB1D81AA4A987AFE2BA8EBA990F9844A1978BF822ADE59C0E26B32863E7715E7DDAF420570D6CEBA1ED09B6A7637D01B1FF8FA92DE790D0&uin=500&fromtag=38';
      audio.play();

      audio.onPlay(function() {
        console.log('play');
      });

      sheetServe.getSheets(this.data.params).then(res => {
        this.setData({ songDatas: res });
        console.log('songDatas', this.data.songDatas);
      });
    }
  }
})
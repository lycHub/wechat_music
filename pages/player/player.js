const lyricServe = require('../../services/lyric.service.js');
const Lyric = require('../../miniprogram_npm/lyric-parser/index.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    song: {},
    bg: '',
    lyric: [],

    // 是否正在播放
    playState: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ song: JSON.parse(options.song) });
   
    // console.log(this.data.song);
    lyricServe.getLyrics(this.data.song.songmid).then(res => {
      this.setData({
        lyric: new Lyric(res).lines,
        bg: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${this.data.song.albummid}.jpg?max_age=2592000`
      });

      console.log(this.data.lyric);
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
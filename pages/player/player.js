const lyricServe = require('../../services/lyric.service.js');
const Lyric = require('../../miniprogram_npm/lyric-parser/index.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    loop: true,
    song: {},
    bg: '',
    lyric: [],

    // 是否正在播放
    playState: false,

    // 当前歌词行数
    currentLineNum: 0,

    // 当前滚动位置
    toView: "line0"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ song: JSON.parse(options.song) });
   
    // console.log(this.data.song);
    lyricServe.getLyrics(this.data.song.songmid).then(res => {
      if (this.currentLyric) {
        this.currentLyric.stop();
      }
      this.currentLyric = new Lyric(res, this.handleLyric);
      if (this.data.playState) {
        this.currentLyric.play();
      }

      const lines = [];
      this.currentLyric.lines.forEach((value, key) => {
        lines.push({ ...value, id: 'line' + key});
      });

      this.setData({
        lyric: lines,
        bg: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${this.data.song.albummid}.jpg?max_age=2592000`
      });


      // console.log(this.data.lyric);
    })
  },


  // 播放歌词
  handleLyric({ lineNum, txt }) {
    this.setData({
      currentLineNum: lineNum
    });

    if (lineNum > 5) {
      this.setData({
        toView: 'line' + lineNum
      });
    } else {
      this.setData({
        toView: "line0"
      });
    }
    // this.playingLyric = txt
  },


  // 播放/暂停切换
  togglePlay(event) {
    this.setData({ playState: !this.data.playState });
    if (this.currentLyric) {
      this.currentLyric.togglePlay();
    }
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
    // console.log('onEnded');
    this.setData({ playState: false });
    if (this.data.loop) {
      this.setData({ playState: true });
      if (this.currentLyric) {
        // console.log('loop');
        this.currentLyric.seek(0);
      }
    }
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
    if (this.currentLyric) {
      this.currentLyric.stop();
    }
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
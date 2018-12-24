const recommentServe = require('../../services/recommend.service.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recommendDatas: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    recommentServe.getRecommendDatas().then(res => {
      this.setData({
        recommendDatas: res
      });
      console.log(this.data.recommendDatas.songList[0]);
    })
  },


  toSongSheet(event){
    const id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../songsheet/song-sheet?id=' + id
    });
  }
})
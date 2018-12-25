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
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.id) {
      this.setData({
        'params.disstid': options.id
      });

      sheetServe.getSheets(this.data.params).then(res => {
        console.log('res', res);
      })
    }
  }
})
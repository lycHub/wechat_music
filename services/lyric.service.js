const base64 = require('../miniprogram_npm/js-base64/index.js').Base64;
const app = getApp();
const commonParams = app.commonParams;
const commonPath = app.commonApiPath;

class LyricService {
  constructor() {
    this.lyric = null;
  }

  getLyrics(songmid) {
    if (this.lyric) {
      return Promise.resolve(this.lyric);
    }

    const extraParams = {
      g_tk: 1928093487,
      songmid,
      categoryId: 10000000,
      pcachetime: 1546407467325,
      platform: 'yqq'
    }
    const data = { ...commonParams, ...extraParams };
    const that = this;
    return new Promise((resolve, reject) => {
      wx.request({
        url: 'http://ustbhuangyi.com/music/api/lyric',
        data,
        success(res) {
          that.lyric = base64.decode(res.data.lyric);
          resolve(that.lyric);
        },
        fail(error) {
          reject(error);
        }
      })
    })
  }
}

module.exports = new LyricService();
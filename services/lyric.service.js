const app = getApp();
const commonParams = app.commonParams;
const commonPath = app.commonApiPath;

class LyricService {
  getLyrics(songmid) {
    const extraParams = {
      g_tk: 1928093487,
      songmid,
      categoryId: 10000000,
      pcachetime: 1546407467325,
      platform: 'yqq'
    }
    const data = { ...commonParams, ...extraParams };
    return new Promise((resolve, reject) => {
      wx.request({
        url: 'http://ustbhuangyi.com/music/api/lyric',
        data,
        success(res) {
          resolve(res.data);
        },
        fail(error) {
          reject(error);
        }
      })
    })
  }
}

module.exports = new LyricService();
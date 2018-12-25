const app = getApp();
const commonParams = app.commonParams;
const commonPath = app.commonApiPath;

class SheetService {
  getSheets(params) {
    const extraParams = {
      g_tk: 1928093487,
      format: 'jsonp',
      disstid: params.disstid,
      type: 1,
      json: 1,
      utf8: 1,
      onlysong: 0,
      platform: 'yqq',
      hostUin: 0,
      song_begin: params.song_begin,
      song_num: params.song_num
    }
    const data = { ...commonParams,
      ...extraParams
    };
    return new Promise((resolve, reject) => {
      wx.request({
        url: 'http://ustbhuangyi.com/music/api/getCdInfo',
        data,
        success(res) {
          resolve(res.data.cdlist[0]);
        },
        fail(error) {
          reject(error);
        }
      })
    })
  }
}

module.exports = new SheetService();
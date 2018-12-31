const app = getApp();
const commonParams = app.commonParams;
const commonPath = app.commonApiPath;

class TopListService {
  getTopList() {
    
    return new Promise((resolve, reject) => {
      wx.request({
        url: commonPath + '/v8/fcg-bin/fcg_myqq_toplist.fcg',
        data: { ...commonParams, g_tk: 480207375 },
        success(res) {
          resolve(res.data.data.topList);
        },
        fail(error) {
          reject(error);
        }
      })
    })
  }
}

module.exports = new TopListService();
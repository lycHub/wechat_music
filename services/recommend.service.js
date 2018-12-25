const app = getApp();
const commonParams = app.commonParams;
const commonPath = app.commonApiPath;


class RecommendService {
  getRecommendDatas() {
    return new Promise((resolve, reject) => {
      wx.request({
        url: commonPath + '/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg?',
        data: commonParams,
        success(res) {
          resolve(res.data.data);
        },
        fail(error){
          reject(error);
        }
      })
    })
  }
}

module.exports = new RecommendService();
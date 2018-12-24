const commonParams = getApp().commonParams;

class RecommendService {
  getRecommendDatas() {
    return new Promise((resolve, reject) => {
      wx.request({
        url:'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg?',
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
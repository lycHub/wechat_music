const app = getApp();
const commonParams = app.commonParams;
const commonPath = app.commonApiPath;

class SearchService {
  getHotKeys() {
    
    return new Promise((resolve, reject) => {
      wx.request({
        url: commonPath + '/splcloud/fcgi-bin/gethotkey.fcg',
        data: { ...commonParams, g_tk: 480207375 },
        success(res) {
          resolve(res.data.data);
        },
        fail(error) {
          reject(error);
        }
      })
    })
  }


  search(params) {
    const extraParams = {
      g_tk: 1928093487,
      w: params.keyword,
      zhidaqu: 1,
      catZhida: 1,
      t: 0,
      flag: 1,
      ie: 'utf-8',
      sem: 1,
      aggr: 0,
      perpage: 20,
      n: params.pageSize,
      p: params.pageNum,
      remoteplace: 'txt.mqq.all'
    }
    const data = {
      ...commonParams,
      ...extraParams
    };

    return new Promise((resolve, reject) => {
      wx.request({
        url: 'http://ustbhuangyi.com/music/api/search',
        data,
        success(res) {
          resolve(res.data.data.song);
        },
        fail(error) {
          reject(error);
        }
      })
    })
  }
}

module.exports = new SearchService();
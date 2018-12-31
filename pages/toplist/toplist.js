const topListServe  = require('../../services/toplist.service.js');


Page({
  data: {
    topList: []
  },

  onLoad: function (options) {
    topListServe.getTopList().then(topList => {
      this.setData({ topList });
      // console.log(this.data.topList);
    });
  }
})
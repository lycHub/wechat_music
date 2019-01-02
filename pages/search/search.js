const searchServe = require('../../services/search.service.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isFocus: false,

    searchParams: {
      keyword: '',
      pageNum: 1,
      pageSize: 20
    },

    // 搜索结果总条数
    total: 0,

    // 总页数
    total_page: 0,

    // 是否到底了
    isToBottom: false,

    // 热门搜索词
    hotKeys: [],

    // 历史搜索词
    searchHis: [],

    // 搜索结果
    results: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const searchHis = wx.getStorageSync('searchHis');
    if (searchHis) {
      this.setData({ searchHis: JSON.parse(searchHis) });
    }
    

    // console.log('his', this.data.searchHis);

    searchServe.getHotKeys().then(res => {
      
      this.setData({ hotKeys: res.hotkey });
      // console.log('hotKeys', this.data.hotKeys);
    });
  },


  onFocus() {
    console.log('focus');
    this.setData({ isFocus: true });
  },


  // 点击取消
  onCancel() {
    this.setData({ isFocus: false, results: [], 'searchParams.keyword': '' });
  },

  // 点击热门搜索词
  onTapKey(evt) {
    const keyword = evt.target.dataset.keyword || evt.currentTarget.dataset.keyword;
    this.saveHis(keyword);
    this._search(keyword);
  },

  // 回车
  onConfirm(evt){
    console.log('搜索', evt.detail.value);
    this.saveHis(evt.detail.value);
    this._search(evt.detail.value);
  },


  // 删除搜索记录
  deleteHis(evt){
    const index = evt.target.dataset.index;
    console.log('index', index);
    if (index) {
      this.data.searchHis.splice(index, 1);
      this.setData({ searchHis: this.data.searchHis });
      wx.setStorageSync('searchHis', JSON.stringify(this.data.searchHis));
    }else{
      this.setData({ searchHis: [] });
      wx.removeStorageSync('searchHis');
    }
  },


  // 搜索
  _search(keyword, first = true){
    if (!keyword) return;

    searchServe.search(this.data.searchParams).then(res => {
      // console.log('result', res.list);
      if (first) {
        this.setData({
          results: res.list,
          total: res.totalnum,
          total_page: Math.ceil(res.totalnum / this.data.searchParams.pageSize)
        });
      }else{
        this.setData({
          results: this.data.results.concat(res.list),
          isToBottom: this.data.searchParams.pageNum >= this.data.total_page
        });
      }
    });

    
  },

  saveHis(keyword){
    this.setData({
      'searchParams.keyword': keyword
    });

    const hasRepeat = this.data.searchHis.findIndex(item => item === keyword) !== -1;
    if (!hasRepeat) {
      this.data.searchHis.unshift(keyword);
    }
    this.setData({ searchHis: this.data.searchHis });
    wx.setStorageSync('searchHis', JSON.stringify(this.data.searchHis));
  },


  // 播放搜索结果
  selectSong(evt) {
    const index = evt.currentTarget.dataset.index || 0;
    const song = this.data.results[index];
    // console.log('song', song);
    const params = {
      songmid: song.songmid,
      songname: song.songname,
      singer: song.singer[0].name,
      albummid: song.albummid
    }
    wx.navigateTo({
      url: '../player/player?song=' + JSON.stringify(params)
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    const page = Math.min(Math.max(1, this.data.searchParams.pageNum + 1), this.data.total_page);
    if (page !== this.data.searchParams.pageNum) {
      this.setData({
        'searchParams.pageNum': page
      });
      this._search(this.data.searchParams.keyword, false);
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
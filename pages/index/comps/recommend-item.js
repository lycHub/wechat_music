// pages/index/recommend-item.js
Component({
  // externalClasses: ['list_item'],
  /**
   * 组件的属性列表
   */
  properties: {
    pic: String,
    title: String,
    author: String,
    listen_count: {
      type: Number,
      observer(newVal) {
        this.setData({
          listenCountFormat: (newVal / 1000).toFixed(1)
        });
      }
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    listenCountFormat: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})

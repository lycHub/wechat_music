// components/songlist/songlist.js
Component({

  pageLifetimes: {
    show() {
      const playAll = wx.createSelectorQuery().in(this).select('.song_sheet .info_wrap .info .play_start');
      playAll.boundingClientRect(rect => {
        this.triggerEvent('btnTop', rect.top);
      }).exec()
    }
  },

  options: {
    addGlobalClass: true,
    multipleSlots: true
  },


  /**
   * 组件的属性列表
   */
  properties: {
    songList: {
      type: Array,
      value: []
    },

    otherDatas: {
      type: Object,
      value: {}
    },

    total_page: Number,

    isToBottom: {
      type: Boolean,
      value: false
    },

    playAll_class: {
      type: String,
      value: 'play_start'
    },

    loop: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

    // 当前播放索引
    currentIndex: -1,

    // 是否正在播放
    playState: false,

    // 已经播放过
    hasPlayed: false,

    // 正在播放的歌曲
    currentSong: {}
  },

  /**
   * 组件的方法列表
   */
  methods: {

    // 播放/暂停切换
    togglePlay(event) {
      this.setData({ playState: !this.data.playState });
    },

    // 点击播放歌曲
    playSong(event) {
      let index;

      if (!event) {
        index = Math.max(0, this.data.currentIndex);
      } else {
        index = event.currentTarget.dataset.index || 0;
      }

      // if (!event.currentTarget.dataset.index) {
      //   index = 0;
      // }else{
      //   index = event.currentTarget.dataset.index
      // }

      console.log(this.data.songList[index]);
      this.setData({ currentIndex: index, currentSong: this.data.songList[index], hasPlayed: true });
    },



    // 接收正在播放事件
    onPlaying() {
      this.setData({ playState: true });
    },


    // 接收暂停事件
    onPausing() {
      this.setData({ playState: false });
    },


    // 结束播放结束事件
    onEnded() {
      const index = Math.min(this.data.currentIndex + 1, this.data.songList.length - 1);
      this.setData({ playState: false, currentIndex: index });
      this.playSong();
      // console.log('currentIndex', this.data.currentIndex);
    },
  }
})

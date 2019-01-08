const lyricServe = require('../../services/lyric.service.js');
const Lyric = require('../../miniprogram_npm/lyric-parser/index.js');

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
    currentSong: {},

    // 当前歌词
    playingLyric: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {

    // 点击播放歌曲
    playSong(event) {
      let index;

      if (!event) {
        index = Math.max(0, this.data.currentIndex);
      } else {
        index = event.currentTarget.dataset.index || 0;
      }
      this.setData({ currentIndex: index, currentSong: this.data.songList[index], hasPlayed: true });

      this._getlyric();
      console.log(this.data.currentSong);
    },


    // 获取歌词
    _getlyric() {
      lyricServe.getLyrics(this.data.currentSong.songmid).then(res => {
        if (this.currentLyric) {
          this.currentLyric.stop();
        }
        this.currentLyric = new Lyric(res, ({txt}) =>{
          this.setData({ playingLyric: txt });
          // console.log(this.data.playingLyric);
        });
        if (this.data.playState) {
          this.currentLyric.play();
        }
      })
    },


    // 播放/暂停切换
    togglePlay(event) {
      this.setData({ playState: !this.data.playState });
      if (this.currentLyric) {
        this.currentLyric.togglePlay();
      }
    },


    // 接收正在播放事件
    onPlaying() {
      this.setData({ playState: true });
    },


    // 接收暂停事件
    onPausing() {
      this.setData({ playState: false });
    },

    onError() {
      this.setData({ playState: false });
    },


    // 结束播放结束事件
    onEnded() {
      this.setData({ playState: false });
      if (this.data.loop) {
        this.setData({ playState: true });
        // if (this.currentLyric) {
        //   // console.log('loop');
        //   this.currentLyric.seek(0);
        // }
      }else{
        const index = Math.min(this.data.currentIndex + 1, this.data.songList.length - 1);
        this.setData({ currentIndex: index });
        this.playSong();
      }
      // console.log('currentIndex', this.data.currentIndex);
    }
  }
})

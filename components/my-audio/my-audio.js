const isEmptyObject = require('../../utils/util.js').isEmptyObject;

Component({
  lifetimes: {
    attached() {
      this.audio = wx.createInnerAudioContext();
      this.audio.loop = this.data.loop;
      this._onEnd();
      this._onError();
    },

    detached(){
      this.audio.destroy();
    }
  },

  /**
   * 组件的属性列表
   */
  properties: {
    currentSong: {
      type: Object,
      observer(newVal) {
        // console.log('currentSong', newVal);
        if (newVal && !isEmptyObject(newVal)) {
          const songmid = newVal.songmid;
          this.audio.src = 'http://dl.stream.qqmusic.qq.com/C400' + songmid + '.m4a?guid=8777127740&vkey=77026141B22717117D1730396C45F6819AF553C7DEEF3E866969E0096BCD92E2DA6732DF0EC6CAEE3CABC2E576D8CA5E883BA97C9572D7D8&uin=500&fromtag=38';
          this.play();
        }
      }
    },


    // 是否单曲循环
    loop: {
      type: Boolean,
      value: false
    },

    // 播放状态
    playState: {
      type: Boolean,
      value: false,
      observer(newVal) {
        if (newVal) {
          this.play();
        }else{
          this.pause();
        }
        
      }
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    play() {
      this.audio.play();
      this._onPlay();
    },

    // 暂停
    pause() {
      this.audio.pause();
      this._onPause();
    },

    // 监听音频播放
    _onPlay() {
      this.audio.onPlay(() => {
        console.log('播放');
        this.triggerEvent('playing');
      })
    },


    // 监听暂停
    _onPause() {
      this.audio.onPause(() => {
        console.log('暂停');
        this.triggerEvent('pause');
      })
    },

    // 监听自然停止
    _onEnd() {
      this.audio.onEnded(() => {
        console.log('播放结束');
        this.triggerEvent('end');
      })
    },

    // 
    _onError(){
      this.audio.onError(err => {
        console.log(err);
        wx.showToast({
          title: '播放错误' + err.errMsg,
          icon: 'none',
          duration: 2000
        });
        this.triggerEvent('error');
      })
    }
  }
})

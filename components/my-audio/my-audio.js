const isEmptyObject = require('../../utils/util.js').isEmptyObject;

Component({
  lifetimes: {
    attached() {
      this.audio = wx.createInnerAudioContext();
      // this.audio.loop = this.data.loop;
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
    currentSongMid: {
      type: String,
      observer(newVal) {
        // console.log('currentSongMid', newVal);
        if (newVal) {
          /**
           * 
           * http://dl.stream.qqmusic.qq.com/C400${newVal}.m4a?guid=8777127740&vkey=14DF9C11A018E0949805F5D9D13532A1ABC5CF2604B2C6A6B51A214D7F2A009E188BBBF486BDDDC1C067F834207CB6F895D72C1324E1AD38&uin=500&fromtag=38
           * 
           */
          this.audio.src = `http://dl.stream.qqmusic.qq.com/C400${newVal}.m4a?guid=8777127740&vkey=14DF9C11A018E0949805F5D9D13532A1ABC5CF2604B2C6A6B51A214D7F2A009E188BBBF486BDDDC1C067F834207CB6F895D72C1324E1AD38&uin=500&fromtag=38`;
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
      // if(this.data.loop) return;
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

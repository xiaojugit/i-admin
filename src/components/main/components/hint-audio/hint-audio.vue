<template>
  <div class="hint-audio">
    <audio ref="audio" controls muted>
      <source :src="dingDong" type="audio/mpeg">
    </audio>
  </div>
</template>

<script>
  import dingDong from './ding_dong.mp3'
  // import {autoPlay} from './auto-play'

  export default {
    name: "HintAudio",
    props: {
      inform: {
        type: [String, Number],
        default: 0
      }
    },
    data() {
      return {
        dingDong: dingDong,
        audioObj: null
      }
    },
    watch: {
      inform () {
        this.$nextTick(() => {
          this.$refs.audio.play();
          // if (this.audioObj) {
          //   this.audioObj.playSound();
          // }
        })
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.$refs.audio.play();
        // setTimeout(()=>{
        //   this.audioObj = autoPlay(dingDong);
        //   this.audioObj.playSound();
        // }, 2000)
      })
    }
  }
</script>

<style scoped>
  .hint-audio {
    position: fixed;
    left: 720px;
    /*visibility: hidden;*/
    opacity: 0;
    z-index: 0;
  }
</style>

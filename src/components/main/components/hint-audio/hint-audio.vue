<template>
  <audio ref="audio" class="hint-audio" controls muted>
    <source :src="dingDong" type="audio/mpeg">
  </audio>
</template>

<script>
  import dingDong from './ding_dong.mp3'

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
        dingDong: dingDong
      }
    },
    watch: {
      inform () {
        this.$nextTick(() => {
          this.$refs.audio.play();
        })
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.$refs.audio.play();
      })
    }
  }
</script>

<style scoped>
  .hint-audio {
    position: fixed;
    /*visibility: hidden;*/
    opacity: 0;
    z-index: -1;
  }
</style>

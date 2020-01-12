<template>
  <audio ref="audio" class="hint-audio" loop controls>
    <source :src="dingDong" type="audio/mpeg">
  </audio>
</template>

<script>
  import dingDong from './ding_dong.mp3'

  export default {
    name: "HintAudio",
    data() {
      return {
        dingDong: dingDong
      }
    },
    mounted() {
      this.$nextTick(() => {
        console.log(this.$refs.audio)
        // this.$refs.audio.play();
      })
    }
  }
</script>

<style scoped>
  .hint-audio {
    position: fixed;
    visibility: hidden;
    opacity: 0;
    z-index: -1;
  }
</style>

import axios from '@/libs/api.request'

export const autoPlay = (url, loop = false) => {
  window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext;
  if (!window.AudioContext) {
    console.log('!Your browser does not support AudioContext');
    return
  }
  let context = new window.AudioContext();
  let source = null;
  let audioBuffer = null;

  function stopSound() {
    if (source) {
      source.stop(0); //立即停止
    }
  }

  function playSound() {
    source = context.createBufferSource();
    source.buffer = audioBuffer;
    source.loop = loop;
    source.connect(context.destination);
    source.start(0); //立即播放
  }

  function initSound(arrayBuffer) {
    context.decodeAudioData(arrayBuffer, function (buffer) { //解码成功时的回调函数
      audioBuffer = buffer;
      playSound();
    }, function (e) { //解码出错时的回调函数
      console.log('Error decoding file', e);
    });
  }

  axios.request({
    url,
    method: 'get',
    responseType: 'arraybuffer',
  }).then((res) => {
    initSound(res.data)
  });

  return {
    stopSound,
    playSound
  };
};


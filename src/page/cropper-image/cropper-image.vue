<template>
  <Modal
    v-model="modal.show"
    title="上传图片"
    width="700">
    <div class="cropper-wrapper">
      <div class="img-box">
        <img class="cropper-image" :id="imgId" alt="">
      </div>
      <div class="right-con">
        <div v-if="preview" class="preview-box" :id="previewId"></div>
        <div class="button-box">
          <slot>
            <Upload action="image/upload" :before-upload="beforeUpload" accept="image/jpg, image/jpeg,image/png" :format="['jpg','jpeg','png']">
              <Button style="width: 150px;" type="primary">上传图片</Button>
            </Upload>
          </slot>
          <div v-show="insideSrc">
            <Button type="primary" @click="rotate">
              <Icon type="md-refresh" :size="18"/>
            </Button>
            <Button type="primary" @click="shrink">
              <Icon type="md-remove" :size="18"/>
            </Button>
            <Button type="primary" @click="magnify">
              <Icon type="md-add" :size="18"/>
            </Button>
            <Button type="primary" @click="scale('X')">
              <Icon custom="iconfont icon-shuipingfanzhuan" :size="18"/>
            </Button>
            <Button type="primary" @click="scale('Y')">
              <Icon custom="iconfont icon-chuizhifanzhuan" :size="18"/>
            </Button>
            <Button type="primary" @click="move(0, -moveStep)">
              <Icon type="md-arrow-round-up" :size="18"/>
            </Button>
            <Button type="primary" @click="move(-moveStep, 0)">
              <Icon type="md-arrow-round-back" :size="18"/>
            </Button>
            <Button type="primary" @click="move(0, moveStep)">
              <Icon type="md-arrow-round-down" :size="18"/>
            </Button>
            <Button type="primary" @click="move(moveStep, 0)">
              <Icon type="md-arrow-round-forward" :size="18"/>
            </Button>
            <!--<Button style="width: 150px;margin-top: 10px;" type="primary" @click="crop">{{ cropButtonText }}</Button>-->
          </div>
        </div>
      </div>
    </div>
    <div slot="footer">
      <Button v-show="insideSrc" type="primary" size="large" @click="cropAndUpload">裁剪并上传</Button>
    </div>
  </Modal>

</template>

<script>
import Cropper from 'cropperjs'
import './cropper-image.less'
import 'cropperjs/dist/cropper.min.css'
import {
  uploadImage
} from '@/api/contents'

export default {
  name: 'cropperImage',
  props: {
    modal: {
      type: Object,
      default: () => {
        return {}
      }
    },
    src: {
      type: String,
      default: ''
    },
    preview: {
      type: Boolean,
      default: true
    },
    moveStep: {
      type: Number,
      default: 4
    },
    cropButtonText: {
      type: String,
      default: '裁剪'
    }
  },
  data () {
    return {
      cropper: null,
      insideSrc: '',
      imageName: ''
    }
  },
  computed: {
    imgId () {
      return `cropper${this._uid}`
    },
    previewId () {
      return `cropper_preview${this._uid}`
    }
  },
  watch: {
    src (src) {
      this.replace(src)
    },
    insideSrc (src) {
      this.replace(src)
    }
  },
  methods: {
    beforeUpload (file) {
      const reader = new FileReader()
      this.imageName = file.name;
      reader.readAsDataURL(file)
      reader.onload = (event) => {
        this.insideSrc = event.srcElement.result
      }
      return false
    },
    replace (src) {
      this.cropper.replace(src)
      this.insideSrc = src
    },
    rotate () {
      this.cropper.rotate(90)
    },
    shrink () {
      this.cropper.zoom(-0.1)
    },
    magnify () {
      this.cropper.zoom(0.1)
    },
    scale (d) {
      this.cropper[`scale${d}`](-this.cropper.getData()[`scale${d}`])
    },
    move (...argu) {
      this.cropper.move(...argu)
    },
    crop () {
      this.cropper.getCroppedCanvas().toBlob(blob => {
        this.$emit('on-crop', blob)
      })
    },
    cropAndUpload () {
      if (!this.insideSrc) return
      this.cropper.getCroppedCanvas().toBlob(blob => {
        let formData = new FormData();
        formData.append("fileName", blob, `${this.imageName}.png`);

        uploadImage(formData).then((res) => {
          this.$Message.success(res.data.errmsg);
          this.$emit('on-upload-success', res.data.data);
          this.insideSrc = '';
          this.$set(this.modal, 'show', false);
        }).catch(err => {
          this.$Message.error(err.data.errmsg)
        });
      })
    }
  },
  mounted () {
    this.$nextTick(() => {
      let dom = document.getElementById(this.imgId)
      this.cropper = new Cropper(dom, {
        preview: `#${this.previewId}`,
        checkCrossOrigin: true,
        cropBoxResizable: false
      })
    })
  }
}
</script>

<style scoped>

</style>

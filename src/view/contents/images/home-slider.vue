<template>
  <div>
    <div class="title-wrap clearfix">
      <h3>首页轮播图</h3>
      <Button class="add-btn" type="primary" @click="uploadImage">新增图片</Button>
    </div>
    <div class="image-list">
      <Card :bordered="false" class="image-card">
        <img class="image-item" :src="imgSrc" alt="">
        <div class="operate-list">
          <Tooltip content="删除">
            <Button size="small" @click="removeImage"><Icon type="ios-trash-outline"/></Button>
          </Tooltip>
        </div>
      </Card>
      <Card :bordered="false" class="image-card">
        <img class="image-item" :src="imgSrc" alt="">
        <div class="operate-list">
          <Tooltip content="删除">
            <Button size="small"><Icon type="ios-trash-outline"/></Button>
          </Tooltip>
        </div>
      </Card>
    </div>
    <Divider/>
    <div class="title-wrap clearfix">
      <h3>预约页轮播图</h3>
      <Button class="add-btn" type="primary" @click="uploadImage">新增图片</Button>
    </div>
    <div class="image-list">
      <Card :bordered="false" class="image-card">
        <img class="image-item" :src="imgSrc" alt="">
        <div class="operate-list">
          <Tooltip content="删除">
            <Button size="small"><Icon type="ios-trash-outline"/></Button>
          </Tooltip>
        </div>
      </Card>
      <Card :bordered="false" class="image-card">
        <img class="image-item" :src="imgSrc" alt="">
        <div class="operate-list">
          <Tooltip content="删除">
            <Button size="small"><Icon type="ios-trash-outline"/></Button>
          </Tooltip>
        </div>
      </Card>
    </div>
    <cropper-image :modal="cropperModal"></cropper-image>
  </div>
</template>

<script>
import CropperImage from '@/view/cropper-image/cropper-image.vue'

export default {
  name: 'homeSlider',
  components: { CropperImage },
  data () {
    return {
      imgSrc: 'http://b-ssl.duitang.com/uploads/item/201208/30/20120830173930_PBfJE.jpeg',
      cropperModal: { show: false }
    }
  },
  methods: {
    uploadImage () {
      this.cropperModal.show = true
    },
    removeImage () {
      this.$Modal.confirm({
        title: '警告',
        content: '<p>确定要删除吗？</p>',
        onOk: () => {
          this.$Message.info('Clicked ok')
        },
        onCancel: () => {
          this.$Message.info('Clicked cancel')
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .title-wrap {
    line-height: 32px;
    h3 {
      float: left;
    }
    .add-btn {
      float: right;
    }
  }

  .image-list {
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;

    .image-card {
      margin-right: 10px;
    }

    .image-item {
      width: 200px;
      height: 140px;
    }

    .operate-list {
      i {
        cursor: pointer;
      }
    }
  }

</style>

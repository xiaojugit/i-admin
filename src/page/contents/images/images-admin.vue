<template>
  <div>
    <div class="title-wrap clearfix">
      <h3>首页轮播图</h3>
      <Button class="add-btn" type="primary" @click="uploadImage('1')">新增图片</Button>
    </div>
    <div class="image-list">
      <Card :bordered="false" class="image-card" v-for="item in homeList" :key="item.id">
        <div class="image-wrap">
          <img class="image-item" :src="item.imgUrl || imgSrc" alt="" onerror="this.src = imgSrc">
        </div>
        <div class="operate-list">
          <Tooltip content="删除">
            <Button size="small" @click="removeImage(item)"><Icon type="ios-trash-outline"/></Button>
          </Tooltip>
        </div>
      </Card>
    </div>
    <Divider/>
    <div class="title-wrap clearfix">
      <h3>预约页轮播图</h3>
      <Button class="add-btn" type="primary" @click="uploadImage('2')">新增图片</Button>
    </div>
    <div class="image-list">
      <Card :bordered="false" class="image-card" v-for="item in bookingList" :key="item.id">
        <div class="image-wrap">
          <img class="image-item" :src="item.imgUrl || imgSrc" alt="" onerror="this.src = imgSrc">
        </div>
        <div class="operate-list">
          <Tooltip content="删除">
            <Button size="small" @click="removeImage(item)"><Icon type="ios-trash-outline"/></Button>
          </Tooltip>
        </div>
      </Card>
    </div>
    <cropper-image :modal="cropperModal" @on-upload-success="uploadSuccess"></cropper-image>
  </div>
</template>

<script>
import CropperImage from '@/page/cropper-image/cropper-image.vue'
import img from '@/assets/images/login-bg.jpg'
import {
  getPics,
  addPic,
  deletePic
} from '@/api/contents'

export default {
  name: 'homeSlider',
  components: { CropperImage },
  data () {
    return {
      imgSrc: img,
      cropperModal: { show: false },
      homeList: [],
      bookingList: [],
      addPicType: '1'
    }
  },
  methods: {
    uploadImage (type) {
      this.addPicType = type;
      this.cropperModal.show = true
    },
    uploadSuccess(data) {
      addPic({
        imgUrl: data.url,
        type: this.addPicType,
        typeName: this.addPicType === '1' ? '首页轮播图' : '预约页轮播图'
      }).then(res => {
        this.$Message.success(res.data.errmsg);
        this.getImages(this.addPicType);
      }).catch(err => {
        this.$Message.error(err.data.errmsg)
      })
    },
    removeImage ({id, type}) {
      this.$Modal.confirm({
        title: '警告',
        content: '<p>确定要删除吗？</p>',
        onOk: () => {
          deletePic(id).then(res => {
            this.$Message.info(res.data.errmsg);
            this.getImages(type);
          }).catch(err => {
            this.$Message.error(err.data.errmsg)
          })
        }
      })
    },

    getImages (type) {
      getPics({
        type: type
      }).then(res => {
        if (type === '1') {
          this.homeList = res.data.data.list;
        } else if (type === '2') {
          this.bookingList = res.data.data.list;
        }
      })
    }
  },
  created () {
    this.getImages('1');
    this.getImages('2')
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
      margin-bottom: 10px;
    }

    .image-wrap {
      width: 200px;
      height: 140px;
      margin-bottom: 10px;
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

<template>
  <div class="edit-article">
    <div>
      <Button @click="back" type="primary">返回列表</Button>
    </div>
    <Form
      class="edit-form"
      ref="editForm"
      label-position="left"
      :model="formParams"
      :rules="rules">
      <FormItem label="列表显示样式">
        <i-select v-model="formParams.listStyle">
          <i-option :value="1" :key="1">小图样式</i-option>
          <i-option :value="2" :key="2">大图样式</i-option>
        </i-select>
      </FormItem>
      <FormItem label="标题" prop="articleTitle" :label-width="60">
        <i-input v-model="formParams.articleTitle" clearable placeholder="输入标题"/>
      </FormItem>
      <FormItem label="简述" prop="articleDesc" :label-width="60">
        <i-input v-model="formParams.articleDesc" clearable placeholder="输入简述"/>
      </FormItem>
      <FormItem label="缩略图" prop="articleThumbnail">
        <Button icon="ios-cloud-upload-outline" @click="uploadImage">上传图片</Button>
      </FormItem>
      <FormItem label="编辑内容" prop="content">
        <br>
        <editor valueType="text" @on-change="editorChange"></editor>
      </FormItem>
      <FormItem>
        <Button @click="handleSubmit" class="search-btn" type="primary">提交</Button>
      </FormItem>
    </Form>
    <div class="preview-wrap">
      <h3>在手机上列表的样式</h3>
      <Divider/>
      <div class="big-image" v-if="formParams.listStyle===2">
        <strong>标题</strong>
      </div>
      <div class="small-image" v-if="formParams.listStyle===1">
        <strong>标题</strong>
        <span></span>
      </div>
    </div>
    <CropperImage :modal="cropperModal" @on-crop="handleCrop"></CropperImage>
  </div>
</template>

<script>
  import Editor from '_c/editor/'
  import CropperImage from '@/view/cropper-image/cropper-image.vue'

  export default {
    name: 'editArticle',
    components: {Editor, CropperImage},
    data() {
      return {
        cropperModal: {show: false},
        formParams: {
          searchType: '',
          listStyle: 2,
          articleTitle: '',
          articleDesc: '',
          articleThumbnail: '',
          content: ''
        },
        rules: {
          articleTitle: [
            {required: true, message: '标题不能为空', trigger: 'blur'}
          ],
          articleDesc: [
            {required: true, message: '简述不能为空', trigger: 'blur'}
          ],
          articleThumbnail: [
            {required: true, message: '缩略图不能为空', trigger: 'blur'}
          ],
          content: [
            {required: true, message: '文章内容不能为空', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      back() {
        this.$router.push('article')
      },

      uploadImage() {
        this.cropperModal.show = true
      },

      editorChange(html) {
        this.content = html
      },

      handleChange() {

      },

      handleClear() {

      },

      handleSubmit() {
        this.$refs.editForm.validate((valid) => {
          if (valid) {
            this.$Message.success('Success!')
          } else {
            this.$Message.error('Fail!')
          }
        })
      },

      handleCrop(blob) {
        console.log(blob)
      }

    }
  }
</script>

<style lang="less" scoped>
  @import "edit-article.less";
</style>

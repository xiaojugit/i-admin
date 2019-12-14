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
        <i-select v-model="formParams.styleType">
          <i-option :value="1" :key="1">小图样式</i-option>
          <i-option :value="2" :key="2">大图样式</i-option>
        </i-select>
      </FormItem>
      <FormItem label="标题" prop="title" :label-width="60">
        <i-input v-model="formParams.title" clearable placeholder="输入标题"/>
      </FormItem>
      <FormItem label="简述" prop="summary" :label-width="60">
        <i-input v-model="formParams.summary" clearable placeholder="输入简述"/>
      </FormItem>
      <FormItem label="缩略图" prop="imgUrl">
        <Button icon="ios-cloud-upload-outline" @click="uploadImage">上传图片</Button>
      </FormItem>
      <FormItem label="编辑内容" prop="content">
        <br>
        <editor v-model="formParams.content" :cache="false"></editor>
      </FormItem>
      <FormItem>
        <Button @click="handleSubmit" class="search-btn" type="primary">提交</Button>
      </FormItem>
    </Form>
    <div class="preview-wrap">
      <h3>在手机上列表的样式</h3>
      <Divider/>
      <div class="big-image" v-if="formParams.styleType===2">
        <img v-if="formParams.imgUrl" :src="formParams.imgUrl" alt="">
        <strong>标题</strong>
      </div>
      <div class="small-image" v-if="formParams.styleType===1">
        <strong>标题</strong>
        <div class="image">
          <img v-if="formParams.imgUrl" :src="formParams.imgUrl" alt="">
        </div>
      </div>
    </div>
    <CropperImage :modal="cropperModal" @on-upload-success="uploadSuccess"></CropperImage>
  </div>
</template>

<script>
  import Editor from '_c/editor/'
  import CropperImage from '@/page/cropper-image/cropper-image.vue'
  import {mapMutations} from 'vuex'
  import {
    getArticles,
    addArticle
  } from '@/api/contents'

  export default {
    name: 'editArticle',
    components: {Editor, CropperImage},
    data() {
      return {
        cropperModal: {show: false},
        formParams: {
          styleType: 2,
          title: '',
          summary: '',
          imgUrl: '',
          content: ''
        },
        rules: {
          title: [
            {required: true, message: '标题不能为空', trigger: 'blur'}
          ],
          summary: [
            {required: true, message: '简述不能为空', trigger: 'blur'}
          ],
          imgUrl: [
            {required: true, message: '缩略图不能为空', trigger: 'blur'}
          ],
          content: [
            {required: true, message: '文章内容不能为空', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      ...mapMutations([
        'closeTag'
      ]),
      back() {
        this.$router.push({
          name: 'article'
        })
      },

      uploadImage() {
        this.cropperModal.show = true
      },

      // editorChange(html) {
      //   this.content = html
      // },

      handleChange() {

      },

      handleClear() {

      },

      handleSubmit() {
        this.$refs.editForm.validate((valid) => {
          if (valid) {
            addArticle(this.formParams).then(res => {
              this.$Message.success(res.data.errmsg);
              localStorage.articleId = '';
              this.closeTag(this.$route);
              this.back();
            }).catch(err => {
              this.$Message.error(err.data.errmsg)
            });
          }
        })
      },

      uploadSuccess(data) {
        this.formParams.imgUrl = data.url;
      }

    },

    created() {
      let id = localStorage.articleId;
      if (id) {
        getArticles({
          id: id
        }).then(res => {
          let {id, styleType, title, summary, imgUrl, content} = res.data.data.list[0];

          Object.assign(this.formParams, {
            id,
            styleType,
            title,
            summary,
            imgUrl,
            content
          })
        });
      } else {
        this.formParams.content = localStorage.editorCache || '';
      }
    },
  }
</script>

<style lang="less" scoped>
  @import "edit-article.less";
</style>

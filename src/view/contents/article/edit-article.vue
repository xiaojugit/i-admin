<template>
  <div class="edit-article">
    <Button @click="back" type="primary">返回列表</Button>
    <Form
      v-model="formParams">
      <FormItem label="列表显示样式">
        <Select v-model="formParams.listStyle" class="search-col">
          <Option :value="1" :key="1">小图和简述样式</Option>
          <Option :value="2" :key="2">大图和标题样式</Option>
        </Select>
      </FormItem>
      <FormItem label="标题">
        <Input @on-change="handleClear" clearable placeholder="输入关键字搜索" v-model="formParams.articleTitle"/>
      </FormItem>
      <FormItem label="简述">
        <Input @on-change="handleClear" clearable placeholder="输入关键字搜索" v-model="formParams.articleDesc"/>
      </FormItem>
      <FormItem>
        <span>缩略图</span>
        <Upload action="//jsonplaceholder.typicode.com/posts/">
          <Button icon="ios-cloud-upload-outline">上传图片</Button>
        </Upload>
      </FormItem>
      <FormItem>
        <span>编辑内容</span>
        <editor></editor>
      </FormItem>
      <FormItem>
        <Button @click="handleSubmit" class="search-btn" type="primary">提交</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
  import Editor from '_c/editor/'
  export default {
    name: 'editArticle',
    components: {Editor},
    data() {
      return {
        formParams: {
          searchType: '',
          listStyle: '',
          articleTitle: '',
          articleDesc: '',
          articleThumbnail: '',
        }
      }
    },
    methods: {
      back() {
        this.$router.push('article')
      },
      handleClear() {
      },
      handleSubmit() {

      }
    }
  }
</script>

<style lang="less" scoped>
  .edit-article {
    width: 680px;
    form {
      margin-top: 20px;
    }
  }
</style>

<template>
  <div class="article-detail">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0,minimum-scale=1.0,user-scalable=0" />
    <h2 class="title">{{title}}</h2>
    <div class="content" v-html="content"></div>
  </div>
</template>

<script>
  import {
    getArticles
  } from '@/api/contents'

  export default {
    name: "ArticleDetail",
    data() {
      return {
        title: '',
        content: ''
      }
    },
    methods: {
      getArticleList (id) {
        getArticles({id}).then(res => {
          this.title = res.data.data.list[0].title;
          this.content = res.data.data.list[0].content || '';
        }).catch(err=>{
          this.title = '';
          this.content = '你所查看的文章不存在-_-)';
        });
      }
    },
    created() {
      let {id} = this.$route.query;
      this.getArticleList(id);
      console.log(this.$route)
    }
  }
</script>

<style scoped>
  .article-detail{
    max-width: 680px;
    margin: 30px auto 15px;
  }
  .title{
    line-height: 1.5;
    text-align: center;
    font-size: 22px;
  }
  .content{
    padding-top: 20px;
    line-height: 2;
  }
</style>

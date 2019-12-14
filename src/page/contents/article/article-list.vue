<template>
  <div style="position: relative">
    <Button @click="editArticle" class="edit-btn" type="primary">新增文章</Button>
    <Form
      inline
      ref="ff"
      :model="formParams">
      <FormItem label="样式" :label-width="36">
        <i-select v-model="formParams.styleType" style="width:100px">
          <i-option :value="1" :key="1">小图样式</i-option>
          <i-option :value="2" :key="2">大图样式</i-option>
        </i-select>
      </FormItem>
      <FormItem>
        <Input @on-change="handleClear" clearable placeholder="输入关键字搜索" v-model="formParams.keyword"/>
      </FormItem>
      <FormItem>
        <Button @click="handleSearch" type="primary">
          <Icon type="search"/>&nbsp;&nbsp;搜索
        </Button>
      </FormItem>
    </Form>
    <Table :columns="tableColumns" :data="tableData">
      <template slot-scope="{ row, index }" slot="img">
        <img :src="row.imgUrl" alt="" height="50px" style="display: block;margin: 5px;">
      </template>
      <template slot-scope="{ row, index }" slot="operate">
        <Button size="small" style="margin-right: 5px" @click="previewArticle(row)">预览</Button>
        <Button size="small" type="primary" style="margin-right: 5px" @click="editArticle(row)">编辑</Button>
        <Button size="small" type="error" @click="removeArticle(row)">删除</Button>
      </template>
    </Table>
  </div>
</template>

<script>
import {
  getArticles,
  deleteArticle
} from '@/api/contents'

export default {
  name: 'articleList',
  data () {
    return {
      tableColumns: [
        {
          title: '样式',
          key: 'styleType'
        },
        {
          title: '标题',
          key: 'title'
        },
        {
          title: '简述',
          key: 'summary'
        },
        {
          title: '缩略图',
          key: 'imgUrl',
          slot: 'img'
        },
        {
          title: '操作',
          slot: 'operate',
          width: 170
        }
      ],
      tableData: [],
      formParams: {}
    }
  },
  methods: {
    handleClear () {
      console.log('Clear Input')
    },

    handleSearch () {
      this.getArticleList();
    },

    previewArticle () {},

    editArticle ({id}) {
      localStorage.articleId = id || '';
      this.$router.push({
        name: 'edit-article'
      })
    },

    removeArticle ({id}) {
      this.$Modal.confirm({
        title: '警告',
        content: '<p>确定要删除吗？</p>',
        onOk: () => {
          deleteArticle(id).then(res => {
            this.$Message.info(res.data.errmsg);
            this.getArticleList();
          }).catch(err => {
            this.$Message.error(err.data.errmsg)
          })
        }
      })
    },
    getArticleList () {
      getArticles(this.formParams).then(res => {
        this.tableData = res.data.data.list
      }).catch(err=>{
        this.$Message.error(err.data.errmsg)
      });
    }
  },
  created () {
    this.getArticleList();
  }
}
</script>

<style lang="less" scoped>
  .edit-btn {
    position: absolute;
    top: 0;
    right: 0;
  }
</style>

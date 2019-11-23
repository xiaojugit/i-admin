<template>
  <div style="position: relative">
    <Button @click="editArticle" class="edit-btn" type="primary"><Icon type="search"/>新增文章</Button>
    <Form
      inline
      v-model="formParams">
      <FormItem>
        <Select v-model="formParams.searchType" class="search-col">
          <Option :value="2" :key="2">test</Option>
        </Select>
      </FormItem>
      <FormItem>
        <Input @on-change="handleClear" clearable placeholder="输入关键字搜索" v-model="formParams.searchType"/>
      </FormItem>
      <FormItem>
        <Button @click="handleSearch" class="search-btn" type="primary">
          <Icon type="search"/>&nbsp;&nbsp;搜索
        </Button>
      </FormItem>
    </Form>
    <Table :columns="columns1" :data="data1">
      <template slot-scope="{ row, index }" slot="operate">
        <Button size="small" style="margin-right: 5px" @click="previewArticle(row)">预览</Button>
        <Button type="primary" size="small" style="margin-right: 5px" @click="editArticle(row)">编辑</Button>
        <Button type="error" size="small" @click="removeArticle(row)">删除</Button>
      </template>
    </Table>
  </div>
</template>

<script>
  export default {
    name: 'articleList',
    data() {
      return {
        columns1: [
          {
            title: '姓名',
            key: 'name'
          },
          {
            title: '年龄',
            key: 'age'
          },
          {
            title: '电话',
            key: 'age'
          },
          {
            title: '地址',
            key: 'address'
          },
          {
            title: '票数',
            key: 'age'
          },
          {
            title: '是否在职',
            key: 'age'
          },
          {
            title: '操作',
            slot: 'operate',
            width: 170
          },
        ],
        data1: [
          {
            name: 'John Brown',
            age: 18,
            address: 'New York No. 1 Lake Park',
            date: '2016-10-03'
          },
          {
            name: 'Jim Green',
            age: 24,
            address: 'London No. 1 Lake Park',
            date: '2016-10-01'
          },
          {
            name: 'Joe Black',
            age: 30,
            address: 'Sydney No. 1 Lake Park',
            date: '2016-10-02'
          },
          {
            name: 'Jon Snow',
            age: 26,
            address: 'Ottawa No. 2 Lake Park',
            date: '2016-10-04'
          }
        ],
        formParams: {
          searchType: ''
        }
      }
    },
    methods: {
      handleClear() {
        console.log('Clear Input');
      },
      handleSearch() {
        console.log('搜索');
      },
      previewArticle () {},
      editArticle () {
        this.$router.push('edit-article')
      },
      removeArticle () {},
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

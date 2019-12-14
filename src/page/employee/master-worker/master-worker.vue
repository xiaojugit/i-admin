<template>
  <div>
    <div class="title-wrap clearfix">
      <h3>师傅列表</h3>
      <Button class="add-btn" type="primary" @click="add">新增师傅</Button>
    </div>
    <Table :columns="columns1" :data="data1">
      <template slot-scope="{ row, index }" slot="operate">
        <Button type="primary" size="small" style="margin-right: 5px">编辑</Button>
        <Button type="error" size="small">删除</Button>
      </template>
    </Table>
    <edit-worker :valueObj="valueObj"></edit-worker>
  </div>
</template>

<script>
import EditWorker from './edit.vue'
export default {
  name: 'master-worker',
  components: { EditWorker },
  data () {
    return {
      valueObj: {
        show: false
      },
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
          title: '工龄',
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
        }
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
      ]
    }
  },
  methods: {
    add () {
      this.valueObj.show = true
    }
  }
}
</script>

<style lang="less" scoped>
  .title-wrap {
    line-height: 32px;
    margin-bottom: 10px;
    h3 {
      float: left;
    }
    .add-btn {
      float: right;
    }
  }
</style>

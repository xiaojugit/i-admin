<template>
  <div>
    <div class="title-wrap clearfix">
      <h3>师傅列表</h3>
      <Button class="add-btn" type="primary" @click="add()">新增师傅</Button>
    </div>
    <Table :columns="tableColumns" :data="tableData">
      <template slot-scope="{ row }" slot="operate">
        <Button type="primary" size="small" style="margin-right: 5px" @click="add(row)">编辑</Button>
        <Button type="error" size="small"  @click="deleteWorker(row)">删除</Button>
      </template>
    </Table>
    <edit-worker :valueObj="valueObj" :workerData="workerData" @on-edit-success="editSuccess"></edit-worker>
  </div>
</template>

<script>
  import EditWorker from './edit.vue'
  import {
    addWorker,
    getWorker
  } from '@/api/employees'
  import {
    forEach
  } from '@/libs/tools'

  export default {
    name: 'master-worker',
    components: {EditWorker},
    data() {
      return {
        valueObj: {
          show: false
        },
        workerData: {},
        tableColumns: [
          {
            title: '姓名',
            key: 'workerName'
          },
          {
            title: '年龄',
            key: 'age'
          },
          {
            title: '工龄',
            key: 'workingYears'
          },
          {
            title: '电话',
            key: 'workerTel'
          },
          {
            title: '地址',
            key: 'workerAddr'
          },
          {
            title: '票数',
            key: 'stars'
          },
          // {
          //   title: '是否在职',
          //   key: 'isWork'
          // },
          {
            title: '操作',
            key: 'age',
            slot: 'operate'
          }
        ],
        tableData: []
      }
    },
    methods: {
      add(data) {
        this.workerData = data || {};
        this.valueObj.show = true
      },

      deleteWorker ({id}) {
        this.$Modal.confirm({
          title: '警告',
          content: '<p>确定要删除吗？</p>',
          onOk: () => {
            addWorker({
              id: id,
              isWork: 1,
            }).then(res => {
              this.$Message.info(res.data.message);
              this.getWorkerList();
            }).catch(err => {
              this.$Message.error(err.data.message)
            })
          }
        })
      },

      editSuccess() {
        this.getWorkerList();
      },

      getWorkerList () {
        getWorker().then(res => {
          this.tableData = res.data.data.list;
          forEach(this.tableData, item => {
            let nowYear = new Date().getFullYear();
            let age = nowYear - new Date(item.birthday).getFullYear();
            let workingYears = nowYear - new Date(item.workingTime).getFullYear();
            Object.assign(item, {
              age,
              workingYears
            })
          })
        });
      }
    },
    created () {
      this.getWorkerList();
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

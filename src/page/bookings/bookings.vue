<template>
  <div>
    <div class="title-wrap clearfix">
      <Form
        inline
        label-position="left"
        :model="formParams">
        <FormItem label="状态" :label-width="36">
          <Select v-model="formParams.status" placeholder="状态" style="width:72px">
            <Option :value="0" :key="99999">全部</Option>
            <Option v-for="item in statusList" :value="item.code" :key="item.code">{{item.name}}</Option>
          </Select>
        </FormItem>
        <FormItem>
          <Input clearable placeholder="姓名" v-model="formParams.name"/>
        </FormItem>
        <FormItem>
          <Input clearable placeholder="电话" v-model="formParams.phone"/>
        </FormItem>
        <FormItem>
          <DatePicker type="datetimerange" placeholder="上门时间" v-model="formParams.time"
                      style="width: 280px"></DatePicker>
        </FormItem>
        <FormItem>
          <Button @click="handleSearch" type="primary">搜索</Button>
        </FormItem>
      </Form>
    </div>
    <Table :columns="tableColumns" :data="tableData" height="600">
      <template slot-scope="{ row, index }" slot="img">
        <!--<img :src="row.destroyPic" alt="" height="50px">-->
        <img src="https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3118956596,1809570833&fm=26&gp=0.jpg" alt="" style="display: block" height="50px">
      </template>
      <template slot-scope="{ row, index }" slot="status">
        <Select v-model="row.status" placeholder="状态" size="small" style="width:72px" @on-change="(v)=>{changeHandler(v, row)}">
          <Option v-for="item in statusList" :value="item.code" :key="row.id + item.code">{{item.name}}</Option>
        </Select>
      </template>
      <!--<template slot-scope="{ row, index }" slot="operate">
        <Button size="small" style="margin-right: 5px" @click="previewArticle(row)">预览</Button>
        <Button size="small" type="primary" style="margin-right: 5px" @click="editArticle(row)">编辑</Button>
        <Button size="small" type="error" @click="removeArticle(row)">删除</Button>
      </template>-->
    </Table>
    <Page :total="100" show-elevator style="margin-top: 10px;"/>
  </div>
</template>

<script>
import {
  getOrders,
  updateStatus
} from '@/api/bookings'

export default {
  name: 'bookings',
  data () {
    return {
      statusList: [
        {
          code: 0,
          name: '未派单'
        },
        {
          code: 1,
          name: '进行中'
        },
        {
          code: 2,
          name: '已完成'
        },
        {
          code: 3,
          name: '已取消'
        }
      ],
      formParams: {
        status: 0,
        pageNum: 1,
        pageSize: 30,
        id: '',
        customName: '',
        customTel: '',
        startTime: '',
        endTime: ''
      },
      tableColumns: [
        {
          title: '姓名',
          key: 'customName'
        },
        {
          title: '电话',
          key: 'customTel'
        },
        {
          title: '上门时间',
          key: 'repairTime'
        },
        {
          title: '服务类型',
          key: 'workerType'
        },
        {
          title: '图片',
          slot: 'img'
        },
        {
          title: '备注',
          key: 'remark'
        },
        {
          title: '状态',
          slot: 'status'
        }
      ],
      tableData: []
    }
  },
  methods: {
    handleSearch () {
      this.getOrders()
    },
    getOrders () {
      getOrders(this.formParams).then(res => {
        this.tableData = res.data.data.list
      })
    },
    changeHandler (val, row) {
      updateStatus({
        id: row.id,
        status: val
      }).then(res => {
        this.$Message.info(res.data.errmsg)
        // this.$Modal.info({
        //   title: '警告',
        //   content: '<p>确定要删除吗？</p>'
        // })
      }).catch((err)=>{
        this.$Message.error(err.data.errmsg)
      })
    }
  },
  created () {
    this.getOrders()
  }
}
</script>

<style scoped>

</style>

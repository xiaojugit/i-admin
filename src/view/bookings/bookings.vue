<template>
  <div>
    <div class="title-wrap clearfix">
      <Form
        inline
        label-position="left"
        :model="formParams">
        <FormItem label="状态" :label-width="36">
          <Select v-model="formParams.status" placeholder="状态" style="width:72px">
            <Option :value="0" :key="0">全部</Option>
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
    <Table :columns="columns1" :data="data1" height="600">
      <template slot-scope="{ row, index }" slot="status">
        <Select v-model="row.status" placeholder="状态" size="small" style="width:72px" @on-change="changeHandler">
          <Option v-for="item in statusList" :value="item.code" :key="item.code">{{item.name}}</Option>
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
          code: 1,
          name: '未派单'
        },
        {
          code: 2,
          name: '进行中'
        },
        {
          code: 3,
          name: '已完成'
        },
        {
          code: 4,
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
      columns1: [
        {
          title: '姓名',
          key: 'name'
        },
        {
          title: '电话',
          key: 'age'
        },
        {
          title: '上门时间',
          key: 'age'
        },
        {
          title: '服务类型',
          key: 'address'
        },
        {
          title: '图片',
          key: 'age'
        },
        {
          title: '备注',
          key: 'age'
        },
        {
          title: '状态',
          slot: 'status',
          key: 'age'
        }
        // {
        //   title: '操作',
        //   slot: 'operate',
        //   width: 170
        // }
      ],
      data1: [
        {
          name: 'John Brown',
          age: 18,
          address: 'New York No. 1 Lake Park',
          date: '2016-10-03',
          status: 1
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
    handleSearch () {
      this.getOrders()
    },
    getOrders () {
      getOrders(this.formParams).then(res => {
        console.log(res)
      })
    },
    changeHandler () {
      updateStatus({}).then(res => {
        console.log(res)
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

<template>
  <div>
    <div class="title-wrap clearfix">
      <Button class="reload" @click="handleSearch" type="primary">刷新</Button>
      <Form
        inline
        label-position="left"
        :model="formParams">
        <FormItem label="状态" :label-width="36">
          <Select v-model="formParams.status" placeholder="状态" style="width:72px">
            <Option :value="-1" :key="99999">全部</Option>
            <Option v-for="item in statusList" :value="item.code" :key="item.code">{{item.name}}</Option>
          </Select>
        </FormItem>
        <FormItem>
          <Input clearable placeholder="姓名" v-model="formParams.customName"/>
        </FormItem>
        <FormItem>
          <Input clearable placeholder="电话" v-model="formParams.customTel"/>
        </FormItem>
        <FormItem>
          <DatePicker type="datetimerange" placeholder="上门时间" v-model="serviceTime"
                      style="width: 280px"></DatePicker>
        </FormItem>
        <FormItem>
          <Button @click="handleSearch" type="primary">搜索</Button>
        </FormItem>
      </Form>
    </div>
    <Table :columns="tableColumns" :data="tableData" height="600">
      <template slot-scope="{ row, index }" slot="serviceType">
        <span>{{serviceTypeList[row.workType]}}</span>
      </template>
      <template slot-scope="{ row, index }" slot="img">
        <img :src="row.destroyPic" alt="" style="display: block" height="50px">
      </template>
      <template slot-scope="{ row, index }" slot="status">
        <Select v-model="row.status" placeholder="状态" size="small" style="width:72px"
                @on-change="(v)=>{changeHandler(v, row)}">
          <Option v-for="item in statusList" :value="item.code" :key="row.id + item.code">{{item.name}}</Option>
        </Select>
      </template>
    </Table>
    <Page :total="total" show-elevator style="margin-top: 10px;" @on-change="changePageHandler"/>
  </div>
</template>

<script>
  import {
    getOrders,
    updateStatus
  } from '@/api/bookings'

  import {
    getDate
  } from '@/libs/tools'

  export default {
    name: 'bookings',
    data() {
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
        serviceTypeList: {
          1: '美的空气能维修',
          2: '美的中央空调维修',
          3: '日立中央空调维修',
          4: '清洗保养'
        },
        serviceTime: [],
        formParams: {
          status: -1,
          pageNum: 1,
          pageSize: 30,
          id: '',
          customName: '',
          customTel: '',
          startTime: 0,
          endTime: Date.now()
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
            title: '地址',
            key: 'address'
          },
          {
            title: '上门时间',
            key: 'repairTimeStr'
          },
          {
            title: '服务类型',
            slot: 'serviceType'
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
        tableData: [],
        total: 0
      }
    },
    methods: {
      handleSearch() {
        this.formParams.pageNum = 1;
        this.getOrders()
      },
      getOrders() {
        let params = JSON.parse(JSON.stringify(this.formParams));
        if (this.serviceTime[0] && this.serviceTime[1]) {
          params.startTime = Date.parse(this.serviceTime[0]);
          params.endTime = Date.parse(this.serviceTime[1]);
        } else {
          delete params.startTime;
          delete params.endTime;
        }
        if (params.status === -1) {
          delete params.status
        }
        this.tableData = [];
        this.total = 0;
        getOrders(params).then(res => {
          this.tableData = res.data.data.list.map(item => {
            let _item = Object.assign({}, item);
            // _item.repairTimeStr = getDate(_item.repairTime / 1000, 'year');
            return _item
          });
          this.total = res.data.data.total
        })
      },
      changePageHandler(page) {
        this.formParams.pageNum = page;
        this.getOrders()
      },
      changeHandler(val, row) {
        updateStatus({
          id: row.id,
          status: val
        }).then(res => {
          this.$Message.info(res.data.errmsg)
          // this.$Modal.info({
          //   title: '警告',
          //   content: '<p>确定要删除吗？</p>'
          // })
        }).catch((err) => {
          this.$Message.error(err.data.errmsg)
        })
      }
    },
    created() {
      this.getOrders()
    }
  }
</script>

<style scoped>
  .title-wrap {
    position: relative;
  }

  .reload {
    position: absolute;
    right: 0;
  }
</style>

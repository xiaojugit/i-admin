<template>
  <div>
    <div class="title-wrap clearfix">
      <Form
        inline
        label-position="left"
        :model="formParams">
        <FormItem label="状态" :label-width="36">
          <Select v-model="formParams.searchType" class="search-col" placeholder="状态">
            <Option :value="2" :key="2">test</Option>
          </Select>
        </FormItem>
        <FormItem>
          <Input clearable placeholder="姓名" v-model="formParams.searchType"/>
        </FormItem>
        <FormItem>
          <Input clearable placeholder="电话" v-model="formParams.searchType"/>
        </FormItem>
        <FormItem>
          <DatePicker type="datetimerange" placeholder="上门时间" style="width: 280px"></DatePicker>
        </FormItem>
        <FormItem>
          <Button @click="handleSearch" class="search-btn" type="primary">
            <Icon type="search"/>&nbsp;&nbsp;搜索
          </Button>
        </FormItem>
      </Form>
    </div>
    <Table :columns="columns1" :data="data1" height="600"></Table>
    <Page :total="100" show-elevator style="margin-top: 10px;"/>
  </div>
</template>

<script>
export default {
  name: 'bookings',
  data () {
    return {
      formParams: {},
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
  }
}
</script>

<style scoped>

</style>

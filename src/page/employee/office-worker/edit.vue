<template>
  <div>
    <Drawer
      v-model="valueObj.show"
      title="上传图片"
      width="35%">
      <Form
        class="edit-form"
        ref="editForm"
        :label-width="100"
        :model="formParams"
        :rules="rules">
        <FormItem label="账号" prop="account">
          <i-input v-model="formParams.account" clearable placeholder="用来登录后天的账号，不能修改，输入字母和数字"/>
        </FormItem>
        <FormItem label="密码" prop="password">
          <i-input type="password" v-model="formParams.password" clearable placeholder="密码"/>
        </FormItem>
        <FormItem label="姓名" prop="name">
          <i-input v-model="formParams.name" clearable placeholder="姓名"/>
        </FormItem>
        <FormItem label="年龄" prop="age">
          <i-input v-model="formParams.age" clearable placeholder="年龄"/>
        </FormItem>
        <FormItem label="身份证号" prop="idNumber">
          <i-input v-model="formParams.idNumber" clearable placeholder="身份证号"/>
        </FormItem>
        <FormItem label="电话" prop="phone">
          <i-input v-model="formParams.phone" clearable placeholder="电话"/>
        </FormItem>
        <FormItem label="住址" prop="address">
          <i-input v-model="formParams.address" clearable placeholder="住址"/>
        </FormItem>
        <FormItem label="照片" prop="photo">
          <Button icon="ios-cloud-upload-outline" @click="uploadImage">上传图片</Button>
        </FormItem>
        <FormItem>
          <Button @click="handleSubmit" type="primary">提交</Button>
        </FormItem>
      </Form>
    </Drawer>
    <cropper-image :modal="modal"></cropper-image>
  </div>
</template>

<script>
import CropperImage from '@/page/cropper-image/cropper-image.vue'

export default {
  name: 'edit',
  components: { CropperImage },
  props: {
    valueObj: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      modal: {
        show: false
      },
      formParams: {},
      rules: {
        account: [
          { required: true, message: '账号不能为空', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '姓名不能为空', trigger: 'blur' }
        ],
        age: [
          { required: true, message: '年龄不能为空', trigger: 'blur' }
        ],
        idNumber: [
          { required: true, message: '身份证号不能为空', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '电话不能为空', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '住址不能为空', trigger: 'blur' }
        ],
        photo: [
          { required: true, message: '照片不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    uploadImage () {
      this.modal.show = true
    },
    handleSubmit() {
      console.log(111);
    }
  }
}
</script>

<style scoped>

</style>

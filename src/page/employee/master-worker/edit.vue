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
        <FormItem label="姓名" prop="workerName">
          <i-input v-model="formParams.workerName" clearable placeholder="姓名"/>
        </FormItem>
        <FormItem label="生日" prop="birthdayObj">
          <DatePicker v-model="formParams.birthdayObj" type="date" placeholder="生日"></DatePicker>
        </FormItem>
        <FormItem label="工龄" prop="workingTimeObj">
          <DatePicker v-model="formParams.workingTimeObj" type="year" placeholder="参加工作年"></DatePicker>
        </FormItem>
        <FormItem label="身份证号" prop="workerId">
          <i-input v-model="formParams.workerId" clearable placeholder="身份证号"/>
        </FormItem>
        <FormItem label="电话" prop="workerTel">
          <i-input v-model="formParams.workerTel" clearable placeholder="电话"/>
        </FormItem>
        <FormItem label="住址" prop="workerAddr">
          <i-input v-model="formParams.workerAddr" clearable placeholder="住址"/>
        </FormItem>
        <FormItem label="照片" prop="workerPhoto">
          <Button icon="ios-cloud-upload-outline" @click="uploadImage">上传图片</Button>
        </FormItem>
        <FormItem>
          <Button @click="handleSubmit" type="primary">提交</Button>
        </FormItem>
      </Form>
    </Drawer>
    <cropper-image :modal="modal" @on-upload-success="uploadSuccess"></cropper-image>
  </div>
</template>

<script>
  import CropperImage from '@/page/cropper-image/cropper-image.vue'
  import {
    addWorker
  } from '@/api/employees'

  export default {
    name: 'edit',
    components: {CropperImage},
    props: {
      valueObj: {
        type: Object,
        default: () => {
          return {}
        }
      },
      workerData: {
        type: Object,
        default: () => {
          return {}
        }
      },
    },
    data() {
      return {
        modal: {
          show: false
        },
        formParams: {},
        rules: {
          workerName: [
            {required: true, message: '姓名不能为空', trigger: 'blur'}
          ],
          birthdayObj: [
            {type: 'date', required: true, message: '生日不能为空', trigger: 'blur'}
          ],
          workingTimeObj: [
            {type: 'date', required: true, message: '工龄不能为空', trigger: 'blur'}
          ],
          workerId: [
            {required: true, message: '身份证号不能为空', trigger: 'blur'}
          ],
          workerTel: [
            {required: true, message: '电话不能为空', trigger: 'blur'}
          ],
          workerAddr: [
            {required: true, message: '住址不能为空', trigger: 'blur'}
          ],
          workerPhoto: [
            {required: true, message: '照片不能为空', trigger: 'blur'}
          ]
        }
      }
    },
    watch: {
      workerData: {
        handler: function (data) {
          if (Object.keys(data).length > 0) {
            this.formParams = Object.assign({}, this.formParams, {
              id: data.id,
              workerName: data.workerName,
              birthdayObj: data.birthday && new Date(data.birthday),
              workingTimeObj: data.workingTime && new Date(data.workingTime),
              workerId: data.workerId,
              workerTel: data.workerTel,
              workerAddr: data.workerAddr,
              workerPhoto: data.workerPhoto
            })
          } else {
            this.formParams = {}
          }
        }
        ,
        deep: true
      }
    },
    methods: {
      uploadImage() {
        this.modal.show = true
      },

      uploadSuccess(data) {
        this.formParams.workerPhoto = data.url;
      },

      handleSubmit() {
        this.formParams.birthday = this.formParams.birthdayObj.getTime();
        this.formParams.workingTime = this.formParams.workingTimeObj.getTime();
        this.$refs.editForm.validate((valid) => {
          if (valid) {
            addWorker(this.formParams).then(res => {
              this.$Message.success(res.data.message);
              this.$emit('on-edit-success');
              this.valueObj.show = false;
            }).catch(err => {
              this.$Message.error(err.data.message)
            });
          }
        })
      }
    }

  }
</script>

<style scoped>

</style>

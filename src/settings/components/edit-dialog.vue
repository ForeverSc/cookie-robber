<template>
  <el-dialog
    :title="title"
    :visible.sync="visible"
    :before-close="handleRawClose">
    <el-form :model="form" :rules="rules" ref="form">
      <el-form-item label="本地开发域名" prop="local">
        <el-input v-model="form.local"></el-input>
      </el-form-item>
      <el-form-item label="线上环境域名" prop="online">
        <el-input v-model="form.online"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="tip">
        <el-input v-model="form.tip"></el-input>
      </el-form-item>
      <el-form-item prop="bind">
        <el-checkbox v-model="form.bind">是否立刻绑定</el-checkbox>
      </el-form-item>
    </el-form>
    <div slot="footer"
      class="dialog-footer">
      <el-button @click="handleCancel">取 消</el-button>
      <el-button type="primary" @click="handleEnsure">确 定 </el-button>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    name: 'edit-dialog',
    props: {
      type: {
        type: String,
        default: 'add'
      },
      visible: {
        type: Boolean,
        default: false
      },
      binding: {
        type: Object,
        default: {}
      }
    },
    data () {
      return {
        form: {
          local: '',
          online: '',
          tip: '',
          bind: true
        },
        rules: {
          local: [
            {
              required: true,
              message: '请输入本地开发域名',
              trigger: 'change'
            }
          ],
          online: [
            {
              required: true,
              message: '请输入线上开发域名',
              trigger: 'change'
            }
          ]
        }
      }
    },
    watch: {
      binding (val) {
        this.form = val
      }
    },
    computed: {
      title () {
        return this.type === 'add' ? '新增绑定' : '编辑绑定'
      }
    },
    methods: {
      handleRawClose () {
        this.$emit('update:visible', false)
        this.resetFormData()
      },
      handleCancel () {
        this.$emit('update:visible', false)
        this.resetFormData()
      },
      handleEnsure () {
        this.$refs.form.validate(valid => {
          if (!valid) return
          this.$emit('update:visible', false)
          this.$emit('ensure-click', this.type, Object.assign({}, this.form))
          this.resetFormData()
        })
      },
      resetFormData () {
        this.$refs.form.resetFields()
      }
    }
  }
</script>
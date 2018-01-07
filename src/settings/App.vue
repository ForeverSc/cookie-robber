<template>
  <div class="table-wrapper">
    <el-table
      ref="table"
      :data="tableData">
      <el-table-column
        label="状态"
        width="55">
        <template slot-scope="scope">
          <el-checkbox
            v-model="scope.row.bind"
            @change="handleChangeBindState(scope.row)">
          </el-checkbox>
        </template>
      </el-table-column>
      <el-table-column
        label="本地开发域名"
        prop="local"
        width="360">
      </el-table-column>
      <el-table-column
        label="线上环境域名"
        prop="online"
        width="360">
      </el-table-column>
      <el-table-column
        label="备注"
        prop="tip"
        width="260">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="table-btns">
      <el-button class="add-btn" @click="handleAdd">新增绑定</el-button>
    </div>
    <edit-dialog
      :type="type"
      :visible.sync="showDialog"
      :binding="binding"
      @ensure-click="handleEnsureClick">
    </edit-dialog>
  </div> 
</template>

<script>
  import Binding from './class/Binding.js'
  import Bindings from './class/Bindings.js'
  import EditDialog from './components/edit-dialog.vue'
  import runtime from '../api/runtime.js'

  export default {
    components: {
      EditDialog
    },
    data () {
      return {
        type: 'add',
        showDialog: false,
        binding: new Binding(),
        bindings: new Bindings()
      }
    },
    computed: {
      tableData () {
        return this.bindings.get()
      }
    },
    methods: {
      handleEdit (binding) {
        this.type = 'edit'
        this.showDialog = true
        this.binding = Object.assign({}, binding)
      },
      handleDelete ({ id }) {
        this.bindings.delete(id)
      },
      handleAdd () {
        this.type = 'add'
        this.showDialog = true
        this.binding = new Binding()
      },
      handleEnsureClick (type, binding) {
        if (this.type === 'add') {
          const newBinding = new Binding(binding)

          this.bindings.add(newBinding)
        } else {
          this.bindings.update(binding)
        }
        if (binding.bind) { // 立刻绑定
          runtime.sendMessage({
            type: 'update',
            binding
          })
        }
      },
      handleChangeBindState (binding) {
        this.bindings.update(binding)
      }
    }
  }
</script>

<style lang="less">
  .table-wrapper {
    height: 80%;
    .table-btns {
      margin-top: 20px;
      height: 20%;
    }
  }
</style>

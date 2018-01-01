<template>
  <div class="table-wrapper">
    <el-table
      ref="table"
      @selection-change="handleSelectionChange"
      :data="tableData">
      <el-table-column
        type="selection"
        width="55">
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
      <el-button class="add-btn" @click="handleClearAll">清除所有绑定</el-button>
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
  import storage from '../util/storage.js'
  import Binding from './class/Binding.js'
  import Bindings from './class/Bindings.js'
  import EditDialog from './components/edit-dialog.vue'

  export default {
    components: {
      EditDialog
    },
    data() {
      return {
        type: 'add',
        showDialog: false,
        binding: new Binding(),
        bindings: new Bindings()
      }
    },
    computed: {
      tableData() {
        return this.bindings.get()
      }
    },
    methods: {
      handleEdit({ id }) {
        this.type = 'edit'
        this.showDialog = true
        this.binding = this.bindings.search(id)
      },
      handleDelete({ id }) {
        this.bindings.delete(id)
      },
      handleAdd() {
        this.type = 'add'
        this.showDialog = true
        this.binding = new Binding()
      },
      handleEnsureClick(type, binding) {
        if (this.type === 'add') {
          const newBinding = new Binding(binding)

          this.bindings.add(newBinding)
        } else {
          this.bindings.update(binding)
        }
      },
      handleSelectionChange() {

      },
      handleClearAll() {
        this.$refs.table.clearSelection()
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

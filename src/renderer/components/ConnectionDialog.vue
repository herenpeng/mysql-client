<template>
    <el-dialog
            :title="dialogTitle"
            :visible.sync="dialogVisible"
            width="50%"
            :before-close="handleClose">
        <el-form label-position="right" label-width="80px" :model="connection" style="width: 300px;">
            <el-form-item label="名称">
                <el-input v-model="connection.name"></el-input>
            </el-form-item>
            <el-form-item label="主机">
                <el-input v-model="connection.host"></el-input>
            </el-form-item>
            <el-form-item label="端口">
                <el-input v-model="connection.port"></el-input>
            </el-form-item>
            <el-form-item label="用户名">
                <el-input v-model="connection.username"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="connection.password"></el-input>
            </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
            <el-button type="success" @click="testConnection" style="float: left">测试连接</el-button>
            <el-button @click="handleClose">取 消</el-button>
            <el-button type="primary" @click="updateIndex===-1?createConnection():updateConnection()">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
import store from '@/store'
import dataSource from '@/util/dataSource'
import {mapGetters} from 'vuex'

export default {
  name: 'ConnectionDialog',
  computed: {
    ...mapGetters([
      'connections',
      'dialogTitle',
      'dialogVisible',
      'updateIndex'
    ])
  },
  data () {
    return {
      connection: {
        'name': '',
        'host': '127.0.0.1',
        'port': '3306',
        'username': 'root',
        'password': ''
      }
    }
  },
  methods: {
    testConnection () {
      dataSource.getConn(this.connection).then(conn => {
        if (conn !== null) {
          this.$message({
            type: 'success',
            message: '连接成功'
          })
        }
      }).catch(err => {
        console.log(err)
        this.$message.error('链接失败，请检查网络或链接信息')
      })
    },
    createConnection () {
      store.dispatch('connection/createConnection', this.connection)
      this.handleClose()
    },
    updateConnection () {
      store.dispatch('connection/updateConnection', this.connection, this.updateIndex)
      this.handleClose()
    },
    handleClose () {
      store.dispatch('connection/closeDialog', this.connection, this.updateIndex)
    }
  }
}
</script>

<style scoped>

</style>

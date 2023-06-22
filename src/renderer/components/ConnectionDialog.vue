<template>
    <el-dialog
            :title="updateIndex===-1?'创建链接':'更新链接'"
            :visible.sync="dialogVisible"
            width="50%"
            @open="openDialog"
            :before-close="handleClose">
        <el-form label-position="right" :rules="rules" label-width="80px" :model="connection" ref="connectionForm" style="width: 300px;">
            <el-form-item label="名称" prop="name">
                <el-input v-model="connection.name"></el-input>
            </el-form-item>
            <el-form-item label="主机" prop="host">
                <el-input v-model="connection.host"></el-input>
            </el-form-item>
            <el-form-item label="端口" prop="port">
                <el-input v-model.number="connection.port"></el-input>
            </el-form-item>
            <el-form-item label="用户名" prop="username">
                <el-input v-model="connection.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
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
import mysqlClient from '@/util/mysqlClient'
import {mapGetters} from 'vuex'

export default {
  name: 'ConnectionDialog',
  computed: {
    ...mapGetters([
      'connections',
      'dialogVisible',
      'updateIndex'
    ])
  },
  data () {
    return {
      rules: {
        name: [
          { required: true, message: '名称不能为空' }
        ],
        host: [
          { required: true, message: '主机不能为空' }
        ],
        port: [
          { required: true, message: '端口不能为空' },
          { type: 'number', message: '端口必须为数字' }
        ]
      },
      connection: {}
    }
  },
  methods: {
    openDialog () {
      if (this.updateIndex === -1) {
        this.connection = {
          'name': '',
          'host': '127.0.0.1',
          'port': 3306,
          'username': '',
          'password': ''
        }
      } else {
        this.connection = this.connections[this.updateIndex]
      }
    },
    testConnection () {
      mysqlClient.getConn(this.connection).then(conn => {
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
      console.log(this.connection)
      this.$refs['connectionForm'].validate((valid) => {
        console.log(valid)
        if (valid) {
          store.dispatch('connection/createConnection', this.connection)
          this.handleClose()
        } else {
          console.log('系统错误')
          return false
        }
      })
    },
    updateConnection () {
      console.log(this.connection)
      this.$refs['connectionForm'].validate((valid) => {
        console.log(valid)
        if (valid) {
          store.dispatch('connection/updateConnection', this.connection, this.updateIndex)
          this.handleClose()
        } else {
          console.log('系统错误')
          return false
        }
      })
    },
    handleClose () {
      store.dispatch('connection/closeDialog', this.connection, this.updateIndex)
    }
  }
}
</script>

<style scoped>

</style>

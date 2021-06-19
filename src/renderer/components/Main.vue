<template>
    <div v-if="commandLineShow">
        <div>
            <i class="el-icon-caret-right el-icon--right run"
               @click="run"/>
            <i class="el-icon-close el-icon--right close-command"
                @click="closeCommand"></i>
            <span class="info">
                <span v-if="info.connectionName">正在链接：{{ info.connectionName }}</span>
                <span v-if="info.useDatabaseName">当前数据库：{{ info.useDatabaseName }}</span>
            </span>
        </div>

        <CommandLine @command-change="commandChange"/>

        <div class="error-message" v-if="message.data">
            <el-alert
                    :title="message.data"
                    :type="message.type"
                    effect="dark">
            </el-alert>
        </div>
        <div class="data" v-if="tableData">
            <table cellspacing="0">
                <tr v-for="(row, index) in tableData" v-if="index === 0">
                    <td class="column-name" v-for="(value, key) of row" :key="key" style="text-align: center;">{{ key }}</td>
                </tr>
                <tr v-for="(row, index) in tableData" :key="index">
                    <td v-for="(value, key) of row" :key="key"><input :value="value | valueFilter"/></td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
import CommandLine from '@/components/CommandLine'
import database from '@/util/database'
import utils from '@/util/utils'

export default {
  name: 'Main',
  components: { CommandLine },
  props: {
    commandLineShow: {
      type: Boolean,
      default: false
    },
    info: {
      type: Object,
      default: {
        conn: null,
        connectionName: null,
        useDatabaseName: null
      }
    },
    message: {
      type: Object,
      default: { data: null, type: null }
    }
  },
  filters: {
    valueFilter (value) {
      if (value instanceof Date) {
        return utils.dateFormat(value)
      }
      return value
    }
  },
  data () {
    return {
      command: null,
      tableData: null
    }
  },
  methods: {
    run () {
      if (!this.info.connectionName) {
        this.$message({
          type: 'info',
          message: '请选择链接'
        })
        return
      }
      if (!this.info.useDatabaseName) {
        this.$message({
          type: 'info',
          message: '请选择数据库'
        })
        return
      }
      if (this.info.conn) {
        database.query(this.info.conn, this.command, (err, data) => {
          if (err) {
            this.showMessage(err.message, 'error')
            this.$message.error('SQL查询错误，请检查SQL格式')
            this.tableData = null
            return
          }
          // 如果是 select 语句，则使用表格展示
          if (this.command.indexOf('select') === 0) {
            this.showMessage(null)
            this.tableData = data
          } else {
            this.showMessage('OK 执行成功，受影响的行数:' + data.affectedRows, 'success')
            this.tableData = null
          }
        })
      }
    },
    closeCommand () {
      this.$emit('close-command')
    },
    commandChange (command) {
      this.command = command
    },
    showMessage (message, type) {
      this.$emit('show-message', message, type)
    }
  }
}
</script>

<style scoped>
i {
    border-radius: 5px;
    padding: 3px;
    box-shadow: 0 2px 4px rgb(103, 194, 58), 0 0 6px rgb(64, 158, 255);
}
.run {
    color: #67C23A;
}
.close-command {
    color: black;
}
.info {
    float:right;
}
.info span {
    background-color: #67C23A;
}
.info span:last-child {
    margin-left: 5px;
}
.error-message {
    margin-top: 5px;
}
.data {
    height: 300px;
    margin-top: 5px;
    overflow-x: scroll;
    overflow-y: scroll;
    bottom: 0;
    right: 0;
    left: 0;
    border: 3px solid #67C23A;
    border-radius: 5px;
}
.data table tr td {
    border: 1px solid black;
    z-index: 2;
}
.data .column-name {
    position: sticky;
    top: 0; /* 列首永远固定在头部  */
    z-index: 1;
    background-color: #67C23A;
}
/*.data table tr td:first-child, .data table tr td:first-child input {*/
/*    position: sticky;*/
/*    left: 0; !* 首行永远固定在左侧 *!*/
/*    z-index: 1;*/
/*    background-color: #67C23A;*/
/*}*/
.data input {
    text-align: center;
    width: 90px;
}
</style>

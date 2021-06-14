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

        <div class="error-message" v-if="errorMessage">
            <el-alert
                    :title="errorMessage"
                    type="error"
                    effect="dark">
            </el-alert>
        </div>
        <div class="data">
            <table cellspacing="0">
                <tr v-for="(row, index) in tableData" :key="index">
                    <td class="column-name" v-if="index === 0" v-for="(value, key) of row" style="text-align: center;">{{ key }}</td>
                </tr>
                <tr v-for="(row, index) in tableData" :key="index">
                    <td v-for="(value, key) of row"><input :value="value | valueFilter"/></td>
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
    errorMessage: {
      type: String,
      default: null
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
        this.errorMessage = '请选择链接'
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
            this.showMessage(err.message)
            this.$message.error('SQL查询错误，请检查SQL格式')
            return
          }
          this.tableData = data
        })
      }
    },
    closeCommand () {
      this.$emit('close-command')
    },
    commandChange (command) {
      this.command = command
    },
    showMessage (message) {
      // this.errorMessage = message
      this.$emit('show-message', message)
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

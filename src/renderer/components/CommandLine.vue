<template>
    <div>
        <div>
            <i class="el-icon-caret-right el-icon--right run"
               @click="run"/>
            <span class="info">
                <span v-if="connName">正在链接：{{ connName }}</span>
                <span v-if="databaseName">当前数据库：{{ databaseName }}</span>
            </span>
        </div>
        <div class="command">
            <div class="lineNumber">
                <textarea v-model="lineNumber" wrap="off" cols="2" disabled></textarea>
            </div>
            <textarea @input="handleTextareaInput" v-model="commandContent"
                      class="command-content"></textarea>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import store from '@/store'
import mysqlClient from '@/util/mysqlClient'
import Message from '@/components/Message'
import TableData from '@/components/TableData'

export default {
  name: 'CommandLine',
  components: { Message, TableData },
  computed: {
    ...mapGetters([
      'conn',
      'connName',
      'databaseName'
    ])
  },
  data () {
    return {
      commandContent: '',
      lineNumber: ''
    }
  },
  methods: {
  // 处理命令行行号的方法
    handleTextareaInput () {
      let command = this.commandContent
      command = command.replace(/\r/gi, '')
      command = command.split('\n')
      let len = command.length
      this.lineNumber = ''
      for (let i = 1; i <= len; i++) {
        this.lineNumber += i + '\n'
      }
    },
    run () {
      if (!this.connName) {
        this.$message({
          type: 'info',
          message: '请选择链接'
        })
        return
      }
      if (!this.databaseName) {
        this.$message({
          type: 'info',
          message: '请选择数据库'
        })
        return
      }
      if (this.conn) {
        mysqlClient.query(this.conn, this.commandContent).then(data => {
          // 如果是 select 语句，则使用表格展示
          if (this.commandContent.indexOf('select') === 0) {
            store.dispatch('tab/openTab', {tabName: 'command', tableData: data})
          } else {
            store.dispatch('tab/openTab', {tabName: 'command', message: {title: this.commandContent, data: 'affectedRows:' + data.affectedRows, type: 'success'}})
          }
        }).catch(err => {
          // console.log(err)
          store.dispatch('tab/openTab', {tabName: 'command', message: {title: this.commandContent, data: err.message, type: 'error'}})
        })
      }
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
.info {
    float:right;
}
.info span {
    background-color: #67C23A;
}
.info span:last-child {
    margin-left: 5px;
}
.command {
    display: flex;
    height: 300px;
}
.lineNumber {
    width: 40px;
    height: 100%;
    text-align: left;
}
.lineNumber textarea {
    padding: 10px 4px;
    height: 100%;
    width: 100%;
    font-size: 18px;
    line-height: 24px;
    text-align: right;
    font-weight: bold;
    resize: none;
    outline: none;
    overflow-y: hidden;
    overflow-x: hidden;
    border: 0;
    background-color: #313335;
    color: white;
    box-sizing: border-box;
}
.command-content {
    padding: 10px 8px;
    width: 100%;
    height: 100%;
    font-size: 18px;
    line-height: 24px;
    border: 1px solid #eaeaea;
    background-color: #2B2B2B;
    color: #FEC56B;
    box-sizing: border-box;
    outline: none;
    resize: none;
}
</style>

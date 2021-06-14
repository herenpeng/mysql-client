<template>
    <div class="command">
        <div class="lineNumber"><textarea v-model="lineNumber" wrap="off" cols="2" disabled></textarea></div>
        <textarea @input="handleTextareaInput" v-model="commandContent"
                  class="command-content"></textarea>
    </div>
</template>

<script>
  export default {
    name: 'CommandLine',
    data () {
      return {
        commandContent: '',
        lineNumber: ''
      }
    },
    watch: {
      commandContent () {
        this.commandChange()
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
      commandChange () {
        this.$emit('command-change', this.commandContent)
      }
    }
  }
</script>

<style scoped>
.command {
    display: flex;
    height: 300px;
}
.lineNumber {
    width: 40px;
    height:100%;
    text-align:left;
}
.lineNumber textarea {
    padding:10px 4px;
    height:100%;
    width: 100%;
    font-size: 18px;
    line-height: 24px;
    text-align: right;
    font-weight: bold;
    resize: none;
    outline:none;
    overflow-y: hidden;
    overflow-x: hidden;
    border: 0;
    background-color: #000000;
    color: white;
    box-sizing: border-box;
}
.command-content {
    padding:10px 8px;
    width:100%;
    height:100%;
    font-size: 18px;
    line-height: 24px;
    border:1px solid #eaeaea;
    background-color: #000000;
    color: #00FF00;
    box-sizing: border-box;
    outline:none;
    resize: none;
}
</style>

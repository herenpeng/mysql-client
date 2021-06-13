<template>
    <div v-if="commandLineShow">
        <div>
            <i class="el-icon-caret-right el-icon--right run"
               @click="run"/>
            <i class="el-icon-close el-icon--right close-command"
                @click="closeCommand"></i>
        </div>

        <CommandLine/>

        <div class="data">
            <el-table
                    :data="tableData"
                    height="250"
                    border
                    style="width: 100%">
                <el-table-column
                        prop="date"
                        label="日期"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="姓名"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="地址">
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import CommandLine from '@/components/CommandLine'

export default {
  name: 'Main',
  components: { CommandLine },
  props: {
    commandLineShow: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      command: null,
      tableData: []
    }
  },
  methods: {
    run () {

    },
    closeCommand () {
      this.$emit('close-command')
    },
    commandChange () {
      console.log(this.command)
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
.command-line {
    background-color: #000000;
    color: white;
    width: 100%;
    height: 500px;
}
.data {
    width: 100%;
    height: 300px;
}
</style>

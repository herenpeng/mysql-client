<template>
    <div class="table-data" v-if="tableData">
        <table cellspacing="0">
            <tr v-for="(row, index) in tableData" v-if="index === 0">
                <td class="column-name" v-for="(value, key) of row" :key="key" style="text-align: center;">{{ key }}</td>
            </tr>
            <tr v-for="(row, index) in tableData" :key="index">
                <td v-for="(value, key) of row" :key="key"><input :value="value | valueFilter"/></td>
            </tr>
        </table>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import utils from '@/util/utils'

export default {
  name: 'TableData',
  computed: {
    ...mapGetters([
      'tableData'
    ])
  },
  filters: {
    valueFilter (value) {
      if (value instanceof Date) {
        return utils.dateFormat(value)
      }
      return value
    }
  }
}
</script>

<style scoped>
.table-data {
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
.table-data table tr td {
    border: 1px solid black;
    z-index: 2;
}
.table-data .column-name {
    position: sticky;
    top: 0; /* 列首永远固定在头部  */
    z-index: 1;
    background-color: #67C23A;
}
/*.table-data table tr td:first-child, .data table tr td:first-child input {*/
/*    position: sticky;*/
/*    left: 0; !* 首行永远固定在左侧 *!*/
/*    z-index: 1;*/
/*    background-color: #67C23A;*/
/*}*/
.table-data input {
    text-align: center;
    width: 90px;
}
</style>

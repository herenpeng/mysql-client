<template>
    <div class="table-data" v-if="currentTab.tableData">
        <table cellspacing="0">
            <tr v-for="(row, index) in currentTab.tableData" v-if="index === 0">
                <td class="column-name" v-for="(value, key) of row" :key="key" style="text-align: center;">{{ key }}</td>
            </tr>
            <tr v-for="(row, index) in currentTab.tableData" :key="index">
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
      'currentTab'
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
    height: 675px;
    overflow: scroll;
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
.table-data input {
    text-align: center;
    width: 90px;
}
</style>

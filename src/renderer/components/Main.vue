<template>
    <div>
        <ConnectionDialog/>

        <template>
            <el-tabs type="border-card" v-model="currentTab.tabName" closable @tab-click="clickTab" @tab-remove="removeTab">
                <el-tab-pane v-for="(value, name,index) in tabMap" :key="index"
                             :label="name==='command'?'命令行工具':name" :name="name" >
                    <CommandLine v-if="name==='command'"/>

                    <Message/>

                    <TableData/>
                </el-tab-pane>
            </el-tabs>
        </template>

    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CommandLine from '@/components/CommandLine'
import ConnectionDialog from '@/components/ConnectionDialog'
import Message from '@/components/Message'
import TableData from '@/components/TableData'
import store from '@/store'

export default {
  name: 'Main',
  components: { CommandLine, ConnectionDialog, Message, TableData },
  computed: {
    ...mapGetters([
      'tabMap',
      'currentTab'
    ])
  },
  created () {
    console.log(JSON.stringify(this.currentTab))
    this.tabName = this.currentTab.tabName
  },
  methods: {
    clickTab (tab) {
      store.dispatch('tab/openTab', {tabName: tab.name})
    },
    removeTab (tabName) {
      store.dispatch('tab/closeTab', tabName)
    }
  }
}
</script>

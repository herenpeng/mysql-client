<template>
    <div>
        <ConnectionDialog/>

        <template>
            <el-tabs type="border-card" :value="currentTab" closable @tab-click="clickTab" @tab-remove="removeTab">
                <el-tab-pane v-if="showCommand" label="命令行工具" name="command">
                    <CommandLine/>
                </el-tab-pane>
                <el-tab-pane v-for="(name,index) in tabNames" :key="index"
                             :label="name" :name="name" >
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
      'showCommand',
      'currentTab',
      'tabNames'
    ])
  },
  methods: {
    clickTab (tab) {
      store.dispatch('main/openTab', tab.name)
    },
    removeTab (tabName) {
      if (tabName === 'command') {
        store.dispatch('main/closeCommand')
      } else {
        store.dispatch('main/closeTab', tabName)
        store.dispatch('message/setMessage', {tabName: tabName})
      }
    }
  }
}
</script>

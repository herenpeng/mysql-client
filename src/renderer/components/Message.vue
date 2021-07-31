<template>
    <div class="message" v-if="currentTab.message">
        <el-alert
                :title="currentTab.message.title"
                :type="currentTab.message.type"
                :description="currentTab.message.data"
                effect="dark"
                show-icon
                @close="closeAlert">
        </el-alert>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import store from '@/store'

export default {
  name: 'Message',
  computed: {
    ...mapGetters([
      'currentTab'
    ])
  },
  methods: {
    closeAlert () {
      // this.currentTab.message = null
      store.dispatch('tab/openTab', this.currentTab)
    }
  }
}
</script>

<style scoped>
.message {
    margin-top: 5px;
}
</style>

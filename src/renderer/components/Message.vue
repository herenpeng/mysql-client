<template>
    <div class="message" v-if="message[currentTab]">
        <el-alert
                :title="message[currentTab].title"
                :type="message[currentTab].type"
                :description="message[currentTab].data"
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
      'message',
      'currentTab'
    ])
  },
  methods: {
    closeAlert () {
      store.dispatch('message/setMessage', {tabName: this.currentTab})
    }
  }
}
</script>

<style scoped>
.message {
    margin-top: 5px;
}
</style>

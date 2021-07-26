<template>
    <div class="message" v-if="message[defaultTab]">
        <el-alert
                :title="message[defaultTab].title"
                :type="message[defaultTab].type"
                :description="message[defaultTab].data"
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
      'defaultTab'
    ])
  },
  methods: {
    closeAlert () {
      store.dispatch('message/setMessage', name, null)
    }
  }
}
</script>

<style scoped>
.message {
    margin-top: 5px;
}
</style>

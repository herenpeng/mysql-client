<template>
    <div class="message" v-if="message">
        <el-alert
                :title="message.title"
                :type="message.type"
                :description="message.data"
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
      'message'
    ])
  },
  methods: {
    closeAlert () {
      store.dispatch('message/setMessage', null)
    }
  }
}
</script>

<style scoped>
.message {
    margin-top: 5px;
}
</style>

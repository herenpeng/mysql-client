<template>
    <div class="message" v-if="message[name]">
        <el-alert
                :title="message[name].title"
                :type="message[name].type"
                :description="message[name].data"
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
  props: {
    name: {
      type: String,
      default: 'default'
    }
  },
  computed: {
    ...mapGetters([
      'message'
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

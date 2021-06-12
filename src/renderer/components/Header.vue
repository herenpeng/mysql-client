<template>
    <div>
        <el-button type="success" @click="openCreateConnectionDialog">创建连接<i
                class="el-icon-circle-plus-outline el-icon--right"></i></el-button>

        <ConnectionDialog :dialogTitle="dialogTitle" @get-connections="getConnections"/>
    </div>
</template>

<script>
import ConnectionDialog from '@/components/ConnectionDialog'

export default {
  name: 'Header',
  components: { ConnectionDialog },
  data () {
    return {
      dialogTitle: null
    }
  },
  methods: {
    openCreateConnectionDialog () {
      this.dialogTitle = 'create'
    },
    getConnections () {
      this.dialogTitle = null
      this.$emit('get-connections')
    }
  }
}
</script>

<style scoped>
</style>

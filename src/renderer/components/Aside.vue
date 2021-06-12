<template>
<div class="aside">
    <div v-for="(conn, index) in connections" :key="index" class="connection-label">
        <span>{{ conn.name }}</span>
        <div style="float: right;">
            <i class="el-icon-edit" @click="openUpdateConnectionDialog(index)"></i>
            <i class="el-icon-delete" @click="deleteConnection(index)"></i>
        </div>
    </div>

    <ConnectionDialog :dialogTitle="dialogTitle" :connectionIndex="connectionIndex" @get-connections="getConnections"/>
</div>
</template>

<script>
import storage from '@/util/storage'
import ConnectionDialog from '@/components/ConnectionDialog'

export default {
  name: 'Aside',
  components: { ConnectionDialog },
  props: {
    connections: {
      type: Array,
      default: []
    }
  },
  data () {
    return {
      dialogTitle: null,
      connectionIndex: -1
    }
  },
  methods: {
    openUpdateConnectionDialog (index) {
      this.dialogTitle = 'update'
      this.connectionIndex = index
    },
    deleteConnection (index) {
      storage.deleteConnection(index)
      this.$emit('get-connections')
    },
    getConnections () {
      this.dialogTitle = null
      this.$emit('get-connections')
    }
  }
}
</script>

<style scoped>
.connection-label {
    line-height: 50px;
    border-radius: 5px;
    padding-left: 5px;
    cursor: pointer;
}
.connection-label:hover {
    background-color: #11ff00;
}
.connection-label i {
    padding: 5px;
    margin-right: 5px;
    border-radius: 5px;
}
.connection-label i:hover {
    background-color: #dedede;
}
</style>

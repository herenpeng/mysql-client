<template>
    <div class="border-radius-little el-dropdown-menu" @mouseleave="mouseDown">
        <div v-for="(item, index) in rightMenuList" :key="item.name">
            <RightMenuItem :id="item.id" :icon="item.icon" :name="item.name" @clickItem="clickItem"></RightMenuItem>
        </div>
    </div>
</template>

<script>
  import store from '@/store'
  import RightMenuItem from '@/components/RightMenuItem'
  import {mapGetters} from 'vuex'

  export default {
    name: 'RightMenu',
    components: { RightMenuItem },
    computed: {
      ...mapGetters([
        'rightMenuIndex'
      ])
    },
    data () {
      return {
        rightMenuList: [{
          icon: 'el-icon-edit',
          name: '编辑链接',
          id: 'edit'
        }, {
          icon: 'el-icon-delete',
          name: '删除链接',
          id: 'delete'
        }]
      }
    },
    props: ['index'],
    methods: {
      mouseDown () {
        store.dispatch('rightMenu/changeShowRightMenu', false)
      },
      clickItem (id) {
        if (id === 'edit') {
          this.openUpdateDialog()
        } else if (id === 'delete') {
          this.deleteConnection()
        }
      },
      openUpdateDialog () {
        store.dispatch('connection/openUpdateDialog', this.index)
      },
      deleteConnection () {
        let index = this.index
        this.$confirm('此操作将删除该链接, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('connection/deleteConnection', index).then(() => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
.border-radius-little {
    padding: 10px 0 10px 0;
    border-radius: 10px;
}
</style>

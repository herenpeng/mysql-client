<template>
    <div class="right-menu-item" @mouseover="handleOver" @mouseleave="handleLeave" @click="clickItem"
         :style="{ backgroundColor: color }">
        <div style="width: 100%;" class=""><i :class="icon"></i>{{ name }}</div>
    </div>
</template>

<script>
  export default {
    name: 'RightMenuItem',
    data () {
      return {
        color: 'white'
      }
    },
    props: ['id', 'icon', 'name'],
    methods: {
      handleOver () {
        this.color = '#479bfa'
      },
      handleLeave () {
        this.color = 'white'
      },
      clickItem () {
        this.$emit('clickItem', this.id)
      }
    }
  }
</script>

<style lang="scss" scoped>
    .right-menu-item {
        padding: 3px 6px 3px 6px;
        height: 18px;
        text-align: start;
    }
</style>

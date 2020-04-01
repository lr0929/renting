<template>
  <div id="app">
    <router-view />
    <!-- 加载动画  默认隐藏 -->
    <loading v-show="loading"></loading>
  </div>
</template>

<script>
  import {
    mapActions,
    mapGetters
  } from "vuex"
  import loading from "./components/loading/loading.vue"
  export default {
    name: 'App',
    components:{
      loading:loading
    },
     computed: {
          ...mapGetters([
            'loading'
          ])
        },
  }
</script>

<style>
</style>

<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import '@/assets/index.css'
export default {
  name: 'app'
}
</script>

<style scoped lang="postcss">
#app {
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  // font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 20px;
}
</style>

<template>
  <el-container class="home">
    <el-aside style="width: auto">
      <home-frame :iframeUrl="iframeUrl"/>
    </el-aside>
    <el-main style="margin-left:20px;">
      <home-form @setIfame="setIfame"/>
    </el-main>
  </el-container>
</template>

<script>
import homeFrame from '@/components/children/home-frame'
import homeForm from '@/components/children/home-form'
import config from '@/config'
export default {
  name: 'home',
  components: {
    homeFrame,
    homeForm
  },
  data () {
    return {
      iframeUrl: ''
    }
  },
  methods: {
    setIfame (data) {
      // console.log('setIfame', data)
      this.iframeUrl = `${location.origin}${config.proxyPath}${data.visitPath}`
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="postcss">
</style>

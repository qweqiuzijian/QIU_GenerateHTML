<template>
  <div class="home-frame">
    <div class="header">
      <el-tag type="info">预览区</el-tag>
      <el-button icon="el-icon-refresh" circle type="primary" @click="refresh" :disabled="!iframeUrl?true:false"></el-button>
    </div>
    <div class="iframe-wraper" v-loading="loading" element-loading-background="rgba(0, 0, 0, 0.8)">
      <iframe @load="pageLoad" ref="iframeNode" :src="iframeUrl" frameborder="0" v-if="iframeUrl"></iframe>
      <div class="no-data" v-show="!iframeUrl">
        <img src="../../assets/image/order_nodata.png">
        <p>暂无内容</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home-frame',
  data () {
    return {
      loading: false
    }
  },
  props: {
    iframeUrl: {
      type: String,
      default: ''
    }
  },
  watch: {
    iframeUrl: {
      handler (n) {
        if (n) {
          this.$nextTick(() => {
            this.refresh()
          })
        }
      },
      immediate: true
    }
  },
  methods: {
    refresh () {
      let iframeNode = this.$refs.iframeNode
      iframeNode.setAttribute('src', this.iframeUrl)
      this.loading = true
    },
    pageLoad () {
      setTimeout(() => {
        this.loading = false
      }, 500)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="postcss">
:root {
 --text-color: red;
}
.home-frame{
  .header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom:5px;
  }
}
.iframe-wraper{
  width:375px;
  height:600px;
  iframe {
    width:100%;
    height:100%;
  }
}
.no-data{
  width:100%;
  height:100%;
  background: #fbfbfb;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  &>img{
    width:129px;
    display: block;
  }
  &>p{
    margin-top: 20px;
  }
}
</style>

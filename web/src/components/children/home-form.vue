<template>
  <el-card class="box-card" shadow="hover">
    <div slot="header" class="clearfix">
      <span class="fl">页面配置</span>
      <div class="fr flex-align-center" style="padding: 3px 0;margin-left:10px;">
        <el-tooltip content="预览后可以发布至腾讯云，返回页面访问地址" placement="bottom" effect="light">
          <i class="el-icon-info"></i>
        </el-tooltip>
        <el-button class="fr" type="text" size="medium" :disabled="!sources?true:false" @click="publish">一键发布</el-button>
      </div>
      <div class="fr flex-align-center" style="padding: 3px 0;">
        <el-tooltip content="预览后可以直接下载资源，解压文件手动添加至目标服务器" placement="bottom" effect="light">
          <i class="el-icon-info"></i>
        </el-tooltip>
        <el-button class="fr" type="text" size="medium" :disabled="!sources?true:false" @click="onDownload">资源下载</el-button>
      </div>
    </div>
    <div class="body">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item label="页面标题" prop="title">
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="插入图片">
          <el-switch v-model="ruleForm.loadImg"></el-switch>
        </el-form-item>
        <el-collapse-transition>
          <div v-show="ruleForm.loadImg" style="padding-left:100px;margin-bottom:20px;">
            <el-upload
            class="elupload"
            ref="upload"
            list-type="picture-card"
            :action="uploadUrl"
            :limit="10"
            name="imgfile"
            :multiple="true"
            :on-change="uploadChange"
            :auto-upload="false">
              <i class="el-icon-plus" slot="trigger"></i>
            </el-upload>
            <div v-if="fileList.length>0" v-for="(i, idx) in fileList" :key="idx" class="path-wrapper">
              <el-input placeholder="请输入内容" v-model="ruleForm.path[idx]">
                <template slot="prepend">图片{{idx+1}}链接</template>
              </el-input>
            </div>
          </div>
        </el-collapse-transition>
        <el-form-item label="备注" prop="desc">
          <el-input type="textarea" v-model="ruleForm.desc"></el-input>
        </el-form-item>
        <el-form-item>
          <!-- <el-button type="primary" @click="submitUpload">upload</el-button> -->
          <el-button type="primary" @click="submitForm('ruleForm')">立即预览</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="dialog">
      <el-dialog title="发布成功" :visible.sync="dialogFormVisible">
        <input type="text" class="copy-target" :value="pageVisitPath">
        <el-input v-model="pageVisitPath" readonly>
          <template slot="prepend">访问地址</template>
          <el-button slot="append" data-clipboard-target=".copy-target" :disabled="!pageVisitPath?true:false" v-copy>复制</el-button>
        </el-input>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogFormVisible = false" size="medium">关 闭</el-button>
        </div>
      </el-dialog>
    </div>
  </el-card>
</template>

<script>
import Vue from 'vue'
import Clipboard from 'clipboard'
import api from '@/api'
import {downLoad} from '@/common/utils'
import config from '@/config'

export default {
  name: 'home-form',
  data () {
    return {
      dialogFormVisible: false,
      pageVisitPath: '',
      uploadUrl: `${location.origin}/api/uploadImage`,
      fileList: [],
      pageInfo: '',
      ruleForm: {
        title: '',
        desc: '',
        loadImg: true,
        path: []
      },
      rules: {
        title: [
          { required: false, message: '请输入页面标题', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    sources () {
      return (this.pageInfo &&
              this.pageInfo.sources
      ) || ''
    }
  },
  directives: {
    copy: {
      inserted: function (el) {
        let clipboard = new Clipboard(el)
        clipboard.on('success', function(e) {
          Vue.prototype.$notify({
            title: '提示',
            message: '复制成功',
            type: 'success'
          })
          e.clearSelection()
        })
      }
    }
  },
  methods: {
    async submitUpload() {
      // this.$refs.upload.submit()
      let fileList = this.fileList.map(i => i.raw)
      return await api.uploadImage(fileList)
    },
    async createPage (params) {
      return await api.createPage(params)
    },
    async getSources (params) {
      return await api.getSources(params)
    },
    async submitAction () {
      let list = []
      if (this.fileList.length > 0 && this.ruleForm.loadImg) {
        list = await this.submitUpload()
      }
      let params = Object.assign({}, this.ruleForm, {list})
      return await this.createPage(params)
    },
    async publish () {
      let sources = this.sources
      if (!sources) return
      let loading = this.$loading({
        lock: true,
        text: '正在发布，请耐心等待～',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      let rs = await api.publish(sources).catch(err => {this.$message.error(err)}).finally(() => {loading.close()})
      this.pageVisitPath = rs.visitPath
      this.dialogFormVisible = true
    },
    uploadChange () {
      this.fileList = this.$refs.upload.uploadFiles
    },
    onDownload () {
      let sources = this.sources
      if (!sources) return
      let loading = this.$loading({
        lock: true,
        text: '压缩资源中，请耐心等待～',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      this.getSources(sources)
      .then(data => {
        downLoad(`${location.origin}${config.proxyPath}${data.visitPath}`)
      })
      .catch(error => {
        this.$message.error(error)
      })
      .finally(() => {
        loading.close()
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let loading = this.$loading({
            lock: true,
            text: '正在提交配置，耐心等待～',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          })
          this.submitAction()
          .then(data => {
            this.pageInfo = data
            // console.log('data', data)
            this.$emit('setIfame', data)
          })
          .catch(error => {
            this.$message.error(error)
          })
          .finally(() => {
            loading.close()
          })
        } else {
          console.log('error submit!!')
          return false
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="postcss">
.box-card{
  width:100%;
  height:100%;
  box-sizing: border-box;
  overflow: auto;
}
.path-wrapper{
  margin-top:10px;
}
.dialog-footer{
  display: flex;
  justify-content: center;
}
</style>


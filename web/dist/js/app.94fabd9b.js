(function(e){function t(t){for(var a,i,l=t[0],s=t[1],c=t[2],f=0,m=[];f<l.length;f++)i=l[f],n[i]&&m.push(n[i][0]),n[i]=0;for(a in s)Object.prototype.hasOwnProperty.call(s,a)&&(e[a]=s[a]);u&&u(t);while(m.length)m.shift()();return o.push.apply(o,c||[]),r()}function r(){for(var e,t=0;t<o.length;t++){for(var r=o[t],a=!0,l=1;l<r.length;l++){var s=r[l];0!==n[s]&&(a=!1)}a&&(o.splice(t--,1),e=i(i.s=r[0]))}return e}var a={},n={app:0},o=[];function i(t){if(a[t])return a[t].exports;var r=a[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,i),r.l=!0,r.exports}i.m=e,i.c=a,i.d=function(e,t,r){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(i.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)i.d(r,a,function(t){return e[t]}.bind(null,a));return r},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/";var l=window["webpackJsonp"]=window["webpackJsonp"]||[],s=l.push.bind(l);l.push=t,l=l.slice();for(var c=0;c<l.length;c++)t(l[c]);var u=s;o.push([0,"chunk-vendors"]),r()})({0:function(e,t,r){e.exports=r("56d7")},"10ba":function(e,t,r){},"121a":function(e,t,r){"use strict";var a=r("10ba"),n=r.n(a);n.a},"4c06":function(e,t,r){},"4dfe":function(e,t,r){"use strict";var a=r("e340"),n=r.n(a);n.a},"56d7":function(e,t,r){"use strict";r.r(t);r("cadf"),r("551c"),r("097d");var a=r("2b0e"),n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{attrs:{id:"app"}},[r("router-view")],1)},o=[],i=(r("d940"),{name:"app"}),l=i,s=(r("e52e"),r("2877")),c=Object(s["a"])(l,n,o,!1,null,"178533a4",null);c.options.__file="App.vue";var u=c.exports,f=(r("0fae"),r("5c96").default);a["default"].use(f,{size:"small",zIndex:3e3});var m=r("a18c").default;a["default"].config.productionTip=!1,new a["default"]({router:m,render:function(e){return e(u)}}).$mount("#app")},"9cb8":function(e,t,r){"use strict";var a=r("4c06"),n=r.n(a);n.a},a18c:function(e,t,r){"use strict";r.r(t);var a=r("8c4f"),n=r("2b0e"),o=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("el-container",{staticClass:"home"},[r("el-aside",{staticStyle:{width:"auto"}},[r("home-frame",{attrs:{iframeUrl:e.iframeUrl}})],1),r("el-main",{staticStyle:{"margin-left":"20px"}},[r("home-form",{on:{setIfame:e.setIfame}})],1)],1)},i=[],l=(r("cadf"),r("551c"),r("097d"),function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"home-frame"},[a("div",{staticClass:"header"},[a("el-tag",{attrs:{type:"info"}},[e._v("预览区")]),a("el-button",{attrs:{icon:"el-icon-refresh",circle:"",type:"primary",disabled:!e.iframeUrl},on:{click:e.refresh}})],1),a("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticClass:"iframe-wraper",attrs:{"element-loading-background":"rgba(0, 0, 0, 0.8)"}},[e.iframeUrl?a("iframe",{ref:"iframeNode",attrs:{src:e.iframeUrl,frameborder:"0"},on:{load:e.pageLoad}}):e._e(),a("div",{directives:[{name:"show",rawName:"v-show",value:!e.iframeUrl,expression:"!iframeUrl"}],staticClass:"no-data"},[a("img",{attrs:{src:r("fc4c")}}),a("p",[e._v("暂无内容")])])])])}),s=[],c={name:"home-frame",data:function(){return{loading:!1}},props:{iframeUrl:{type:String,default:""}},watch:{iframeUrl:{handler:function(e){var t=this;e&&this.$nextTick(function(){t.refresh()})},immediate:!0}},methods:{refresh:function(){var e=this.$refs.iframeNode;e.setAttribute("src",this.iframeUrl),this.loading=!0},pageLoad:function(){var e=this;setTimeout(function(){e.loading=!1},500)}}},u=c,f=(r("9cb8"),r("2877")),m=Object(f["a"])(u,l,s,!1,null,"bebb6758",null);m.options.__file="home-frame.vue";var p=m.exports,d=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("el-card",{staticClass:"box-card",attrs:{shadow:"hover"}},[r("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[r("span",{staticClass:"fl"},[e._v("页面配置")]),r("el-button",{staticClass:"fr",staticStyle:{padding:"3px 0","margin-left":"10px"},attrs:{type:"text",size:"medium"}},[e._v("一键发布")]),r("el-button",{staticClass:"fr",staticStyle:{padding:"3px 0"},attrs:{type:"text",size:"medium"}},[e._v("资源打包")])],1),r("div",{staticClass:"body"},[r("el-form",{ref:"ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-width":"100px"}},[r("el-form-item",{attrs:{label:"页面标题",prop:"title"}},[r("el-input",{model:{value:e.ruleForm.title,callback:function(t){e.$set(e.ruleForm,"title",t)},expression:"ruleForm.title"}})],1),r("el-form-item",{attrs:{label:"插入图片"}},[r("el-switch",{model:{value:e.ruleForm.loadImg,callback:function(t){e.$set(e.ruleForm,"loadImg",t)},expression:"ruleForm.loadImg"}})],1),r("el-collapse-transition",[r("div",{directives:[{name:"show",rawName:"v-show",value:e.ruleForm.loadImg,expression:"ruleForm.loadImg"}],staticStyle:{"padding-left":"100px","margin-bottom":"20px"}},[r("el-upload",{ref:"upload",staticClass:"elupload",attrs:{"list-type":"picture-card",action:e.uploadUrl,limit:10,name:"imgfile",multiple:!0,"on-change":e.uploadChange,"auto-upload":!1}},[r("i",{staticClass:"el-icon-plus",attrs:{slot:"trigger"},slot:"trigger"})]),e._l(e.fileList,function(t,a){return e.fileList.length>0?r("div",{key:a,staticClass:"path-wrapper"},[r("el-input",{attrs:{placeholder:"请输入内容"},model:{value:e.ruleForm.path[a],callback:function(t){e.$set(e.ruleForm.path,a,t)},expression:"ruleForm.path[idx]"}},[r("template",{slot:"prepend"},[e._v("图片"+e._s(a+1)+"链接")])],2)],1):e._e()})],2)]),r("el-form-item",{attrs:{label:"备注",prop:"desc"}},[r("el-input",{attrs:{type:"textarea"},model:{value:e.ruleForm.desc,callback:function(t){e.$set(e.ruleForm,"desc",t)},expression:"ruleForm.desc"}})],1),r("el-form-item",[r("el-button",{attrs:{type:"primary"},on:{click:function(t){e.submitForm("ruleForm")}}},[e._v("立即预览")]),r("el-button",{on:{click:function(t){e.resetForm("ruleForm")}}},[e._v("重置")])],1)],1)],1)])},h=[],g=(r("f751"),r("96cf"),r("3040")),v=(r("ac6a"),r("c5f6"),r("bc3a")),b=r.n(v),x="/api",_={proxyPath:x},y=b.a.create({baseURL:"".concat(location.origin).concat(_.proxyPath,"/")});y.interceptors.request.use(function(e){return e.rqTime=Date.now(),e}),y.interceptors.response.use(function(e){return new Promise(function(t,r){var a=e.data;if(a.ret&&0!==Number(a.ret))return r(a.retinfo||"后台开小差～");t(a.data)})},function(e){return Promise.reject(e.message?e.message:"网络异常！")});var w=y,F=function(e){var t=e._interface,r=e.params;return w.post(t,r)},k={fetch:function(e){var t=e._interface,r=e.params;return F({_interface:t,params:r})}},$={uploadImage:function(e){var t=new FormData;return e.forEach(function(e){t.append("imgfile",e)}),k.fetch({_interface:"uploadImage",params:t})},createPage:function(e){return k.fetch({_interface:"createPage",params:e})}},I={name:"home-form",data:function(){return{uploadUrl:"".concat(location.origin,"/api/uploadImage"),fileList:[],ruleForm:{title:"",desc:"",loadImg:!0,path:[]},rules:{title:[{required:!0,message:"请输入页面标题",trigger:"blur"},{min:3,max:12,message:"长度在 3 到 12 个字符",trigger:"blur"}]}}},computed:{},methods:{submitUpload:function(){var e=this.fileList.map(function(e){return e.raw});return $.uploadImage(e)},createPage:function(e){return $.createPage(e)},uploadChange:function(){this.fileList=this.$refs.upload.uploadFiles},submitAction:function(){var e=Object(g["a"])(regeneratorRuntime.mark(function e(){var t,r;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:if(t=[],!(this.fileList.length>0&&this.ruleForm.loadImg)){e.next=5;break}return e.next=4,this.submitUpload();case 4:t=e.sent;case 5:return r=Object.assign({},this.ruleForm,{list:t}),e.next=8,this.createPage(r);case 8:return e.abrupt("return",e.sent);case 9:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}(),submitForm:function(e){var t=this;this.$refs[e].validate(function(e){if(!e)return console.log("error submit!!"),!1;var r=t.$loading({lock:!0,text:"正在提交配置，耐心等待～",spinner:"el-icon-loading",background:"rgba(0, 0, 0, 0.7)"});t.submitAction().then(function(e){console.log("data",e),t.$emit("setIfame",e)}).catch(function(e){t.$message.error(e)}).finally(function(){r.close()})})},resetForm:function(e){this.$refs[e].resetFields()}}},P=I,U=(r("121a"),Object(f["a"])(P,d,h,!1,null,"2bd1dafe",null));U.options.__file="home-form.vue";var C=U.exports,j={name:"home",components:{homeFrame:p,homeForm:C},data:function(){return{iframeUrl:""}},methods:{setIfame:function(e){console.log("setIfame",e),this.iframeUrl="".concat(location.origin).concat(_.proxyPath).concat(e.visitPath)}}},O=j,S=(r("4dfe"),Object(f["a"])(O,o,i,!1,null,"4176508e",null));S.options.__file="home.vue";var L=S.exports;n["default"].use(a["a"]);var E=[{path:"/",component:L}],T=new a["a"]({routes:E}),N="";T.beforeEach(function(e,t,r){N=n["default"].prototype.$loading({lock:!0,text:"Loading",spinner:"el-icon-loading",background:"rgba(0, 0, 0, 0.7)"}),r()}),T.afterEach(function(){setTimeout(function(){N&&N.close()},500)});t["default"]=T},d940:function(e,t,r){},e313:function(e,t,r){},e340:function(e,t,r){},e52e:function(e,t,r){"use strict";var a=r("e313"),n=r.n(a);n.a},fc4c:function(e,t,r){e.exports=r.p+"img/order_nodata.72981447.png"}});
//# sourceMappingURL=app.94fabd9b.js.map
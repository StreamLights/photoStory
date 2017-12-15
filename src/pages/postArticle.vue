<template>
    <div>
        <div v-show="isShowEdit">
            <div class="topMenu">发布</div>
            <div class="title">文章标题：</div>
            <input type="text" class="titleContent" v-model="titleContent">
            <div id="editArea"></div>
            <div class="submit" @click="postArticle">发送</div>
        </div>
        <div class="noLoginArea" v-if="!isShowEdit">
            <div class="bgcat"></div>
            <div class="goLogin" @click="goLogin">去登陆</div>
        </div>
    </div>
</template>
<script>
    import axios from 'axios'
    import editor from 'wangeditor'
    let simplemde;
    export default {
        data: function() {
            return {
                isShowEdit: true,
                titleContent: '',
                editorContent: ''
            }
        },
        methods: {
            goLogin: function() {
                this.$router.push({
                    path: 'userinfo'
                });
            },
            postArticle: function() {
                let _this = this;
                axios({
                    method: 'post',
                    url: 'p0ms255om.bkt.clouddn.com',
                    data: {
                        title: _this.titleContent,
                        content: _this.editorContent
                    },
                    withCredentials: true
                })
                .then(function(result) {
                    console.log(result);
                })
                .catch(function(err) {
                    console.log(err);
                })
                console.log(this.editorContent);
            }
        },
        beforeMount: function() {
            let _this = this;
            axios({
                method: 'post',
                    url: 'http://localhost:3001/user/checkLogin',
                    withCredentials: true
                })
                .then(function(result) {
                    if(result.data.status === 1) {
                        _this.isShowEdit = false;
                    }
                })
                .catch(function(err) {
                })
        },
        mounted: function() {
            let editorArea = new editor('#editArea');
            // 配置菜单
            editorArea.customConfig.menus = [
                'head',
                'bold',
                'underline',
                'link',
                'emotion',
                'image',
                'undo'
            ];
            editorArea.customConfig.uploadImgShowBase64 = true;   // 使用 base64 保存图片
            editorArea.customConfig.uploadImgMaxSize = 3 * 1024 * 1024;   // 上传图片大小限制为 3m
            editorArea.customConfig.uploadImgMaxLength = 5;  // 最大上传图片数量5张
            editorArea.customConfig.withCredentials = true;  // 解决跨域传输
            editorArea.customConfig.qiniu = true;
            editorArea.customConfig.onchange = (html) => {
                this.editorContent = html;
            }
            editorArea.create();
            function uploadInit() {
                // 获取相关 DOM 节点的 ID
                var btnId = editorArea.imgMenuId;
                var containerId = editorArea.toolbarElemId;
                var textElemId = editorArea.textElemId;
                var uploader = Qiniu.uploader({
                    runtimes: 'html5,flash,html4',      // 上传模式,依次退化
                    browse_button: btnId,               // 上传选择的点选按钮，**必需**
                    domain: 'p0ms255om.bkt.clouddn.com',     // bucket 域名，下载资源时用到，如：'http://xxx.bkt.clouddn.com/' **必需**
                    uptoken: "0MLvWPnyya1WtPnXFy9KLyGHyFPNdZceomL",
                    container: containerId,             // 上传区域 DOM ID，默认是 browser_button 的父元素，
                    max_file_size: '100mb',             // 最大文件体积限制
                    max_retries: 3,                     // 上传失败最大重试次数
                    drop_element: textElemId,           //拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
                    chunk_size: '4mb',                  // 分块上传时，每块的体积
                    auto_start: true,                   // 选择文件后自动上传，若关闭需要自己绑定事件触发上传,
                });
            }
        }
    }
</script>
<style scoped>
    .topMenu {
        height: 45px;
        background-color: #ffffff;
        text-align: center;
        line-height: 45px;
        font-size: 16px;
        color: #FABC63;
        letter-spacing: 1px;
    }
    .title {
        font-size: 18px;
        font-weight: 600;
        color: #ffffff;
        padding: 10px 0;
        background-color: #FABC63;
        padding-bottom: 10px;
    }
    .titleContent {
        width: 100%;
        height: 28px;
        margin-bottom: 5px;
        outline: none;
        border: transparent;
        color: darkgray;
        border-bottom: 1px dashed darkgrey;
    }
    .submit {
        width: 200px;
        height: 36px;
        border-radius: 18px;
        font-size: 18px;
        line-height: 36px;
        text-align: center;
        color: #ffffff;
        background-color: #FABC63;
        margin: 50px auto;
    }
    .noLoginArea {
        position: absolute;
        height: 100%;
        width: 100%;
        background-color: #FABC63;
    }
    .bgcat {
        height: 150px;
        background-image: url('../assets/postArticle/noLogin.png');
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        margin-top: 30px;
    }
    .goLogin {
        width: 100px;
        color: #ffffff;
        border: 1px solid #ffffff;
        margin: 45px auto 0;
        font-size: 20px;
        padding: 5px 10px;
        text-align: center;
        border-radius: 18px;
    }
</style>

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
                    url: 'http://localhost:3001/article/post',
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
                'undo'
            ];
            editorArea.customConfig.uploadImgMaxSize = 3 * 1024 * 1024;   // 上传图片大小限制为 3m
            editorArea.customConfig.uploadImgMaxLength = 5;  // 最大上传图片数量5张
            editorArea.customConfig.withCredentials = true;  // 解决跨域传输
            editorArea.customConfig.qiniu = true;
            editorArea.customConfig.onchange = (html) => {
                this.editorContent = html;
            }
            editorArea.create();
            editorArea.txt.html('<p>说点想说的吧~</p>');
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

<template>
    <div class="container">
        <div class="topMenu">
            <div class="leftLogo"></div>
            <div class="right" v-show="!isLogin"><span class="login" @click="showLogin">登录</span>|<span class="register" @click="showRegister">注册</span></div>
            <div class="rightUserInfo" v-show="isLogin"><span>欢迎！{{username}}</span></div>
        </div>
        <div class="showBanner">
            <turn-photo></turn-photo>
        </div>
        <div class="articleList">
            <div v-for="item in articleList" class="content">
                <div class="center">
                    <div class="artLeft">
                        <h2>{{item.title}}</h2>
                        <p>{{item.content}}</p>
                        <i></i><span>{{item.title}}</span>             
                    </div>
                    <div class="artRight">
                        <img src="../assets/articleListPic/article/hangzhou.jpg" alt="杭州">
                    </div>
                </div>
            </div>
        </div>
        <login v-show="isShowLogin" @closeLogin="closeLogin"></login>
        <register v-if="isShowRegister" @closeRegister="closeRegister"></register>
    </div>
</template>
<script>
    import axios from 'axios'
    import TurnPhoto from '../components/turnPhoto.vue'
    import Register from '../components/register.vue'
    import Login from '../components/login.vue'
    function checkLogin() {
        return axios({
            method: 'post',
            url: 'http://localhost:3001/user/checkLogin',
            withCredentials: true
        })
    }
    function getArticleList() {
        return axios({
            method: 'post',
            url: 'http://localhost:3001/article/articleList',
            data: {
                page: 0
            }
        })
    }
    export default {
        components: {
            TurnPhoto,
            Register,
            Login
        },
        data () {
            return {
                isShowRegister: false,            // 控制是否显示注册页面
                isShowLogin: false,               // 控制是否显示登陆页面
                isLogin: false,                   // 用于判断用户登陆
                username: '',
                articleList: []
            }
        },
        methods: {
            showRegister: function() {
                this.isShowRegister = true;
            },
            closeRegister: function() {
                this.isShowRegister = false;
            },
            showLogin: function() {
                this.isShowLogin = true;
            },
            closeLogin: function(username) {
                if (username) {
                    this.isLogin = true;
                    this.username = username;
                }             
                this.isShowLogin = false;
            }
        },
        beforeMount: function() {
            let _this = this;
             axios.all([checkLogin(),getArticleList()])
            .then(axios.spread(function(checkResult, articleList) {
                if(checkResult.data.status === 0){
                    _this.isLogin = true;
                    _this.username = sessionStorage.getItem('wc_username');
                }
                _this.articleList = articleList.data.content;
            }));
        }

    }
</script>
<style scoped>
    .container {
        background-color: #eeeeee;
    }
    .topMenu {
        position: fixed;
        z-index: 9999;
        background-color: #ffffff;
        top: 0px;  
        height: 45px;
        width: 100%;
    }
    .leftLogo {
        float: left;
        height: 30px;
        width: 100px;
        margin: 8px 0px 0px 15px;
        background: url('../assets/logo.svg');
        background-size: contain;
        background-repeat: no-repeat;
    }
    .right {
        float: right;
        height: 42px;
        width: 100px;
        text-align: right;
        margin-right: 15px;
        line-height: 42px;
        color: #FABC63;
    }
    .rightUserInfo {
        float: right;
        height: 42px;
        width: 200px;
        text-align: right;
        margin-right: 15px;
        line-height: 42px;
        font-size: 14px;
        color: #FABC63;
    }
    .login {
        margin-right: 8px;
    }
    .register {
        margin-left: 8px;
    }
    .showBanner {
        margin-top: 45px;
    }
    .turnPhoto {
        height: 180px;
        width: 100%;
        background-color: red;
    }
    .articleList {
        margin-top: 15px;     
        max-width: 520px;
        margin: 0 auto;
    }
    .content {
        background-color: #ffffff;
        margin-top: 10px;
    }
    .center {
        width: 90%;
        margin: 0 auto 10px;
    }
    .center > .artLeft {
        display: inline-block;
        width: 65%;
    }
    .center > .artLeft > h2 {
        margin: 20px 0 10px 0;
        font-size: 21px;
        font-weight: normal;
    }
    .center > .artLeft > p {
        margin: 0;
        font-size: 12px;
        color: gray;
        height: 32px;
        margin-bottom: 10px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
    }
    .center > .artLeft > i {
        float: left;
        height: 12px;
        width: 12px;
        margin-bottom: 20px;
        border-radius: 6px;       
        background: url('../assets/articleListPic/user/userIcon.png');
        background-size: 100% 100%;
    }
    .center > .artLeft > span {
        float: left;
        margin: 0 0 20px 5px;
        font-size: 12px;
        color: gray;
        line-height: 12px;

    }
    .center > .artRight {
        float: right;
        margin-top: 25px;
        height: 100px;
        width: 30%;
    }
    .center > .artRight > img {
        width: 100%;
        vertical-align: middle;
    }
</style>
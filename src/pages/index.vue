<template>
    <div class="container">
        <div class="topMenu">
            <div class="leftLogo"></div>
            <div class="right" v-show="!isLogin"><span @click="goLogin">登录</span></div>
            <div class="rightUserInfo" v-show="isLogin"><span>欢迎！{{username}}</span></div>
        </div>
        <div class="showBanner">
            <turn-photo></turn-photo>
        </div>
        <div class="articleList">
            <div class="content" v-for="item in articleList">
                <div class="center" @click="scanArticle(item._id)">
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
    </div>
</template>
<script>
    import axios from 'axios'
    import TurnPhoto from '../components/turnPhoto.vue'
    function checkLogin() {
        return axios({
            method: 'post',
            url: 'http://localhost:3001/user/checkLogin',
            withCredentials: true
        })
    }
    function getArticleList(page) {
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
            TurnPhoto
        },
        data () {
            return {
                isLogin: false,                   // 用于判断用户登陆
                username: '',
                articleList: []
            }
        },
        methods: {
            arrIndexOf: function(arr, v) {
                for(var i =0 ; i<arr.length ; i++){
                 if(arr[i] == v){
                    return i;
                  }
               }
                return -1;
            },
            addClass: function(obj,className) {
                if(obj.className == '') {
                    obj.className = className;
                } else {
                    var arrClassName = obj.className.split(' ');
                    var _index = this.$options.methods.arrIndexOf(arrClassName,className);
                if(_index == -1) {
                    obj.className +=' ' + className;
                    }
                }
            },
            scanArticle: function(_id) {
                let articleId = _id;
                this.$router.push({
                    name: 'article',
                    params: { articleId }
                });
            },
            goLogin: function() {
                this.$router.push({
                    path: '/userinfo'
                });
            },
            goRegister: function() {
                
            }
        },
        updated: function() {
            // let _this = this;
            // let centerEle = document.getElementsByClassName('center');
            // if(centerEle.length) {
            //     return;
            // }
            // for(var i=centerEle.length-1; i>=centerEle.length-3; i--) {
            //     _this.addClass(centerEle[i], 'showCenter');
            // }
            console.log('暂时注释');
        },
        beforeMount: function() {
            let _this = this;
            axios.all([checkLogin(),getArticleList()])
            .then(axios.spread(function(checkResult, articleList) {
                if(checkResult.data.status === 0){
                    _this.isLogin = true;
                    _this.username = sessionStorage.getItem('wc_username');
                }
                if(articleList.data.content.length != 0) {
                    _this.articleList =  _this.articleList.concat(articleList.data.content);
                }
            }));
        },
        mounted: function() {
            let _this = this;
            let page = 0;
            let noLast = true;         // 控制反复发送请求
            let articleSection = document.getElementsByClassName('articleList')[0];
            articleSection.addEventListener('touchstart', function() {
                let noBottom = true;       // 控制反复触发touchmove事件
                let docHeight = document.documentElement.scrollHeight;
                let screenHeight = document.documentElement.clientHeight;
                articleSection.addEventListener('touchmove', function() {
                    let disTop = document.body.scrollTop;
                    if( disTop + screenHeight >= docHeight ) {
                        if(noBottom && noLast) {
                            page = page + 1;
                            axios({
                                method: 'post',
                                url: 'http://localhost:3001/article/articleList',
                                data: {
                                    page: page
                                }
                            })
                            .then(function(result) {
                                if(result.data.status === 2) {
                                    noLast = false;
                                }
                                _this.articleList =  _this.articleList.concat(result.data.content);
                            })
                            .catch(function(err) {
                                console.log('has error: ' + err);
                            })
                            noBottom = false;
                        }
                    }
                });
                articleSection.addEventListener('touchend', function() {
                });
            },false);
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
        width: 52%;
        text-align: right;
        margin-right: 15px;
        line-height: 42px;
        font-size: 14px;
        color: #FABC63;
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
        transition: all 1s;
    }
    .showCenter {
        opacity: 1;
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
<template>
   <div>
       <div v-show="isShowInfo" class="container">
           <div class="topMenu">我的</div>
           <div class="top">
               <div @click="changeImg" class="topLeft">
                   <img :src="headImg">
               </div>
               <div class="topRight">
                   <h2 class="userName">{{username}}</h2>
                   <p class="userId">ID:&nbsp;{{username}}</p>
                   <i class="light"></i>
                   <p class="fans">关注&nbsp;0&nbsp;&nbsp;&nbsp;&nbsp;被关注&nbsp;0</p>
               </div>
           </div>
           <div class="menuInfo" @click="goExit">退出当前账号</div>
       </div>
       <popover v-if="isShowPopover" @closePopover="closePopover"></popover>
       <router-view></router-view>
   </div>
</template>
<script>
    import axios from 'axios'
    import popover from '../components/popover.vue'
    export default {
        data: function() {
            return {
                username: '',
                isShowPopover: false,
                isShowInfo: false,
                headImg: require('../assets/articleListPic/user/userIcon.png'),
            }
        },
        components: {
            popover
        },
        methods: {
            changeImg: function() {
                this.isShowPopover = true;
            },
            closePopover: function() {  
                this.isShowPopover = false;
            },
            goExit: function() {
                let _this = this;
                axios({
                    method: 'post',
                    url: 'http://localhost:3001/user/logout',
                    withCredentials: true 
                }).then(function() {
                    _this.$router.push({
                        path: '/'
                    });
                });   
            }
        },
        beforeMount: function() {
            let _this = this;
            axios({
                method: 'post',
                url: 'http://localhost:3001/user/getUserInfo',
                withCredentials: true
            })
            .then(function(result) {
                // 用户未登录
                if(result.data.status && result.data.status === 1) {
                    _this.$router.push({
                        path: 'userinfo/login'
                    });
                    return;
                }
                // 用户已登录
                _this.isShowInfo = true;
                _this.username = result.data.content.username;
                if (result.data.content.userhead) {
                    _this.headImg = result.data.content.userhead;
                }
            });
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
    .top {
        background-color: #FABC63;
    }
    .topLeft {
        display: inline-block;
        vertical-align: top;
        width: 65px;
        height: 65px;
        border-radius: 50%;
        background-size: 100%;
        margin: 30px 20px;
        overflow: hidden;
    }
    .topLeft > img {
        width: 65px;
        height: 65px;
    }
    .topRight {
        display: inline-block;
        vertical-align: top;
        height: 80px;      
    }
    .userName {
        font-size: 20px;
        font-weight: normal;
        margin: 20px 0 5px 0;
        color: #ffffff;
    }
    .userId {
        height: 24px;
        color: #ffffff;
        font-size: 12px;
        line-height: 24px;
        margin: 0px;
    }
    .light {
        width: calc(100% - 110px);
        height: 1px;
        border-bottom: 1px solid #ffffff;
        position: absolute;
    }
    .fans {
        font-size: 14px;
        color: #ffffff;
        margin-top: 5px;
    }
    .menuInfo {
        height: 38px;
        font-size: 16px;
        line-height: 38px;
        text-indent: 20px;
        background-color: #ffffff;
        border-top: 1px solid darkgray;
        border-bottom: 1px solid darkgray;
    }
</style>


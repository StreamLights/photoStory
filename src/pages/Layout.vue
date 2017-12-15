<template>
    <div>
        <router-view></router-view>
        <div class="block"></div>
        <div class="bottomBar">
            <div class="leftItem" @click="goIndex">
                <i class="icon leftIcon"></i><span class="itemTag">首页</span>
            </div>
            <div class="middleItem" @click="goPostArticle">
                <i class="icon middleIcon"></i>
                <span class="itemTag">发布</span>
            </div>
            <div class="rightItem" @click="goUser">
                <i class="icon rightIcon"></i>
                <span class="itemTag">用户</span>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        methods: {
            goIndex() {
               this.$router.push({
                   path: '/'
               });
            },
            goPostArticle() {
                this.$router.push({
                    path: '/postArticle'
                });
            },
            goUser() {
                this.$router.push({
                    path: '/userinfo'
                });
            }
        }
    }
</script>
<style>
    body {
        padding: 0;
        margin: 0;
        font-family: "微软雅黑";
    }
</style>
<style scoped>
    .block {
        position: relative;
        bottom: 0px;
        width: 100%;
        height: 45px;
    }
    .bottomBar {
        position: fixed;
        bottom: 0px;
        z-index: 9999;
        width: 100%;
        height: 45px;
        display: -webkit-flex; /* Safari */
        display: flex;  
        justify-content: space-between;
        padding-top: 3px;
        background-color: #ffffff;

        border-top: 1px solid #eeeeee;
    }
    .leftItem, .middleItem, .rightItem{
        width: 100px;
        text-align: center;
    }
    .icon {
        display: inline-block;
        width: 25px;
        height: 25px;
    }
    .itemTag {
        display: block;
        font-size: 12px;
        color: #FABC63;
        text-align: center;
        width: 100px;
        margin-top: -3px;
    }
    .leftIcon {
        background: url('../assets/bottomIcon/index.png');
        background-size: contain;
    }
    .middleIcon {
        background: url('../assets/bottomIcon/post.png');
        background-size: contain;
    }
    .rightIcon {
        background: url('../assets/bottomIcon/user.png');
        background-size: contain;
    }
</style>
    


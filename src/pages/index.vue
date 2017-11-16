<template>
    <div>
        <div class="topMenu">
            <div class="leftLogo"></div>
            <div class="right">登录&nbsp;|&nbsp;注册</div>
        </div>
        <div class="showBanner">
            <turn-photo></turn-photo>
        </div>
        <div class="articleList">
            <div class="content"></div>
            <div class="content"></div>
            <div class="content"></div>
            <div class="content"></div>
            <div class="content"></div>
            <div class="content"></div>
        </div>
        <register></register>
    </div>
</template>
<script>
    import TurnPhoto from '../components/turnPhoto.vue'
    import Register from '../components/register.vue'
    export default {
        components: {
            TurnPhoto,
            Register
        },
        data: function() {
            return {

            }
        }
    }
</script>
<style scoped>
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
        width: 92%;
        margin: 0 auto;
    }
    .content {
        height: 85px;
        background-color: #ffffff;
        margin-top: 10px;
        border-radius: 10px;
    }
</style>
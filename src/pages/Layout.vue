<template>
    <div>
        <router-view></router-view>
        <div class="bottomBar">
            <div class="leftItem">
                <i class="icon leftIcon"></i><span class="itemTag">首页</span>
            </div>
            <div class="middleItem">
                <i class="icon middleIcon"></i>
                <span class="itemTag">发布</span>
            </div>
            <div class="rightItem">
                <i class="icon rightIcon"></i>
                <span class="itemTag">用户</span>
            </div>
        </div>
    </div>
</template>
<script>
</script>
<style>
    body {
        padding: 0;
        margin: 0;
        background-color: #f3f4f8;
        font-family: "微软雅黑";
    }
</style>
<style scoped>
    .bottomBar {
        position: fixed;
        bottom: 0px;
        z-index: 9999;
        width: 100%;
        height: 45px;
        display: -webkit-flex; /* Safari */
        display: flex;  
        justify-content: space-between;
        background-color: #ffffff;
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
    


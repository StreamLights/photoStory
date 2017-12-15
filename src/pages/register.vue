<template>
    <div>
        <div class="topMenu">注册</div>
         <p class="welcome">欢迎来到暖猫故事！请先注册</p>
        <form class="registerArea">
            <span class="tag">用户名：</span>
             <transition name="fade">
                <div v-if="isShowMes" class="showMessage">{{regMes}}</div>
            </transition>
            <div class="wrapText">
                <input type="text" class="username" v-model="username">
            </div>
            <span class="tag">密码：</span>
            <div class="wrapText">
                <input type="password" class="password" v-model="password">
            </div>
            <div class="register" @click="register">注册</div>   
        </form>
    </div>
</template>
<script>
    import axios from 'axios';
    export default {
        data: function() {
            return {
                username: '',
                password: '',
                regMes: '',                             // 控制tip的显示
                isShowMes: false,
            }
        },
        methods: {
            register: function() {
                let _this = this;
                axios({
                    method: 'post',
                    url: '/api/user/register',
                    data: {
                        username: this.username,
                        password: this.password
                    }
                })
                .then(function(response) {
                    if(response.data && response.data.status === 1){
                        _this.isShowMes = true;
                        setTimeout(function() {
                            _this.isShowMes = false;
                        },1000);
                        _this.regMes = response.data.msg;
                        return;
                    }
                    this.$emit('closeRegister');
                })
                .catch(function(err) {
                    console.log(err);
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
        border-bottom: 1px solid #eeeeee;
    }
    .welcome {
        width: 80%;
        color: #FABC63;
        font-size: 30px;
        margin: 50px auto 0px;
    }
    .registerArea {
        margin-top: 20px;
    }
    .tag {
        display: inline-block;
        color: #FABC63;
        font-size: 12px;
        margin: 20px 0 0 10%;
    }
    .wrapText {
        width: 80%;
        height: 35px;
        border: 1px solid #FABC63;
        margin: 0 auto;
        border-radius: 10px;
        margin-top:5px;
    }
    .username, .password {       
        z-index: 999999;
        background: transparent;
        outline: none;
        color: #FABC63;
        margin: 7px 0 0 10px;
        border: transparent;
        width: 95%;
    }
    .register {    
        width: 40%;
        height: 35px;
        background: #FABC63;
        border-radius: 10px;
        font-size: 15px;
        font-weight: 500;
        line-height: 35px;
        text-align: center;
        margin: 30px auto;
        color: #ffffff;
    }
    .showMessage {
        display: inline-block;
        width: 150px;
        color: #FABC63;
        font-size: 12px;
        line-height: 12px;
        text-align: center;
    }
    .fade-enter,  .fade-leave-to {
        opacity: 0;
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter-to {
        opacity: 1;
    }
</style>

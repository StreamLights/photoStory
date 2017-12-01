<template>
    <div class="mask">
        <div class="close" @click="closeMyself"></div>
        <div class="warmCat"></div>
        <form class="loginArea">
            <span class="tag">用户名：</span>
            <div class="wrapText">
                <input type="text" class="username" v-model="username">
            </div>
            <span class="tag">密码：</span>
            <div class="wrapText">
                <input type="password" class="password" v-model="password">
            </div>
            <div class="register" @click="login">登陆</div>   
        </form>
        <transition name="fade">
            <div v-if="isShowMes" class="showMessage">{{regMes}}</div>
        </transition>
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
            login: function() {
                let _this = this;
                axios({
                    method: 'post',
                    url: 'http://localhost:3001/user/login',
                    data: {
                        username: this.username,
                        password: this.password
                    },
                    withCredentials: true           // 设置withCredentials,否则即使服务器同意发送Cookie，浏览器也不会发送。或者，服务器要求设置Cookie，浏览器也不会处理。
                })
                .then(function(response) {
                    if(response.data && response.data.status === 1) {
                        _this.isShowMes = true;
                        setTimeout(function() {
                            _this.isShowMes = false;
                        },1000);
                        _this.regMes = response.data.msg;
                        return;
                    }
                    sessionStorage.setItem("wc_username", _this.username);
                    _this.$emit('closeLogin', _this.username);
                })
                .catch(function(err) {
                    console.log(err);
                });
            },
            closeMyself: function() {
                this.$emit('closeLogin');
            }
        }
    }
</script>
<style scoped>
    .mask {
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,.6);
        position: fixed;
        top: 0;
        left: 0;
        z-index: 99999;
    }
    .warmCat {
        width: 190px;
        height: 190px;
        margin: 7% auto 0;
        background: url('../assets/register/cat.svg');
        background-size: 100% 100%;
    }
    .close {
        width: 30px;
        height: 30px;
        margin: 30px 0 0 80%;
        background: url('../assets/close.png');
        background-size: 100% 100%;
    }
    .loginArea {
        margin-top: 50px;
    }
    .tag {
        display: block;
        color: #ffffff;
        font-size: 12px;
        margin: 20px 0 0 10%;
    }
    .wrapText {
        width: 80%;
        height: 35px;
        border: 1px solid #ffffff;
        margin: 0 auto;
        border-radius: 10px;
        margin-top:5px;
    }
    .username, .password {       
        z-index: 999999;
        background: transparent;
        outline: none;
        color: #ffffff;
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
    }
    .showMessage {
        position: absolute;
        top: 300px;
        left: calc(50% - 75px);
        width: 150px;
        height: 25px;
        border: 1px solid #ffffff;
        color: #ffffff;
        border-radius: 10px;
        font-size: 12px;
        line-height: 25px;
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

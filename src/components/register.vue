<template>
    <div class="mask">
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
                password: ''
            }
        },
        methods: {
            register: function() {
                axios({
                    method: 'post',
                    url: 'http://localhost:3001/user/register',
                    data: {
                        username: this.username,
                        password: this.password
                    }
                }).then(function(response){
                    console.log('res success !!');
                });
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
        margin: 20% auto 0;
        background: url('../assets/register/cat.svg');
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
        margin: 7px 0 0 7px;
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

</style>

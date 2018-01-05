<template>
    <div>
        <div class="topMenu">
            <i class="left" @click="goBack"></i>
            <i class="right"></i>
        </div>
        <h2>{{title}}</h2>
        <div class="userSection">
            <div>
                <i class="userIcon"></i><span class="userId">{{author}}</span>
            </div>
            <p class="userInfo">2017-12-15 12:48 字数 xx&nbsp;·&nbsp;阅读xx</p>
        </div>
        <div class="article" v-html="content"></div>
    </div>
</template>
<script>
    import axios from 'axios'
    export default {
        data() {
            return {
                author: '',
                title: '',
                content: ''
            }
        },
        methods: {
            goBack: function() {
                this.$router.go(-1);
            }
        },
        created: function() {
            let _this = this;
            axios({
                method: 'get',
                url: 'http://localhost:3001/article/detail',
                params: {
                    id: _this.$route.params.articleId
                }
                })
                .then(function(result) {
                    let articleDetail = result.data.articleDetail;
                    _this.author = articleDetail.author;
                    _this.title = articleDetail.title;
                    _this.content = articleDetail.content;
                })
                .catch(function(err) {
                    console.log('has error: ' + err);
                })
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
    .left {
        display: block;
        float: left;
        height: 45px;
        width: 45px;
        background-image: url('../assets/back.png');
        background-position: 10px center;
        background-repeat: no-repeat;
    }
    .right {
        display: block;
        float: right;
        height: 45px;
        width: 45px;
        background-image: url('../assets/more.png');
        background-position: 5px center;
        background-repeat: no-repeat;
    }
    h2 {
        padding: 0 15px;
    }
    .userSection {
        padding: 0 15px;
    }
    .userIcon {
        display: inline-block;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: yellow;
    }
    .userId {
        display: inline-block;
        vertical-align: top;
        height: 40px;
        line-height: 40px;
        margin-left: 10px;
    }
    .userInfo {
        margin: 10px 0;
        font-size: 12px;
        color: gray; 
    }
</style>
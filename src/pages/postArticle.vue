<template>
    <div style="background-color: #ffffff">
       <div class="topMenu">发布</div>
       <div class="title">文章标题：</div>
       <input type="text" class="titleContent" v-model="titleContent">
       <textarea id="editArea"></textarea>
       <div class="submit" @click="postArticle">发送</div>
    </div>
</template>
<script>
    import axios from 'axios'
    import SimpleMDE from 'simplemde'
    let simplemde;
    export default {
        data: function() {
            return {
                titleContent: ''
            }
        },
        methods: {
            postArticle: function() {
                let _this = this;
                axios({
                    method: 'post',
                    url: 'http://localhost:3001/article/post',
                    data: {
                        title: _this.titleContent,
                        content: simplemde.value()
                    },
                    withCredentials: true
                })
                .then(function(result) {
                })
                .catch(function(err) {
                })
            }
        },
        mounted: function() {
                simplemde = new SimpleMDE({
                toolbar: ['bold', 'italic', 'heading', '|', 'image', 'preview'],
                autofocus: true,
                placeholder: "想说点什么?",
                element: document.getElementById('editArea'),
                previewRender: function(plainText) {
		            return marked(plainText); // Returns HTML from a custom parser
	            }
            });
        }
    }
</script>
<style scoped>
    @import '~simplemde/dist/simplemde.min.css';
    .topMenu {
        height: 45px;
        background-color: #ffffff;
        text-align: center;
        line-height: 45px;
        font-size: 16px;
        color: #FABC63;
        letter-spacing: 1px;
    }
    .title {
        font-size: 18px;
        font-weight: 600;
        color: #ffffff;
        padding: 10px 0;
        background-color: #FABC63;
        margin-bottom: 10px;
    }
    .titleContent {
        width: 100%;
        height: 28px;
        margin-bottom: 20px;
        border: 1px solid darkgrey;
        border-radius: 5px;
    }
    .submit {
        width: 200px;
        height: 36px;
        border-radius: 18px;
        font-size: 18px;
        line-height: 36px;
        text-align: center;
        color: #ffffff;
        background-color: #FABC63;
        margin: 50px auto;
    }
</style>

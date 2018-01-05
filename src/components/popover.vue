<template>
    <div class="mask">
        <div class="close" @click="closeMyself"></div>
        <div class="showHead"></div>
        <div class="wrap">
            上传图片
            <input type="file" class="btn" @change="upload($event)">
        </div>
        <div class="wrap">
            确认
            <button class="btn" @click="submit($event)"></button>
        </div>
    </div>
</template>
<script>
    export default {
        data: function() {
            return {
                imgSrc: ''
            }
        },
        methods: {
            closeMyself: function() {
                this.$emit('closePopover');
            },  
            upload: function(event) {
                let windowURL = window.URL || window.webkitURL;
                let img = this.$el.querySelector('.showHead');
                this.file = event.target.files[0];
                this.src = windowURL.createObjectURL(event.target.files[0]);
                img.style.backgroundImage = 'url(' + this.src + ')';
            },   
            submit: function(event) {
                event.preventDefault();//取消默认行为
                let config = {
                    headers: {
                        'Content-Type': 'multipart/form-data'  //以表单传数据的格式来传递fromdata
                    }
                };
                let formdata = new FormData();
                formdata.append('file', this.file);              //将文件存入formdata
                this.$http.post('http://localhost:3001/user/postHeadImg', formdata, config)
                .then((res) => {
                }).catch((error) =>{
                });
            }      
        }
    }
</script>
<style scoped>
    .mask {
        position: fixed;
        z-index: 99999;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,.4);
    }
    .close {
        width: 30px;
        height: 30px;
        margin: 30px 0 0 80%;
        background: url('../assets/close.png');
        background-size: 100% 100%;
    }
    .showHead {
        width: 150px;
        height: 150px;
        margin: 30px auto 50px;
        border: 1px solid #ffffff;
        background-image: url('../assets/articleListPic/user/userIcon.png');
        background-size: 100%;
    }
    .wrap {
        position: relative;
        height: 40px;
        width: 50%;
        color: #ffffff;
        line-height: 40px;
        text-align: center;
        background-color: #FABC63;
        border-radius: 20px;
        margin: 0 auto 20px;
    }
    .btn {
        position: absolute;
        top: 0;
        left: 0;
        filter: alpha(opacity=0);
        opacity: 0;
        height: 40px;
        width: 100%;
    }
</style>

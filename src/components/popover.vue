<template>
    <div class="mask">
        <div class="close" @click="closeMyself"></div>
        <div class="showHead"></div>
        <div class="wrap">
            上传图片
            <input type="file" class="chooseImg" @change="change" accept="image/jpeg, image/jpg">
        </div>
        <div class="submit" @click="submit">确认</div>
    </div>
</template>
<script>
    import axios from 'axios'
    // 利用canvas进行图片压缩
    function comPressedImg(image) {
        let compressedImage;
        let canvas = document.createElement('canvas');
        let dstWidth = 150, dstHeight = 150;
        canvas.getContext("2d").drawImage(image, dstWidth, dstHeight);   // 这里传入img元素对象
        compressedImage = canvas.toDataURL("image/jpg", 0.7);
        return compressedImage;
    }
    export default {
        data: function() {
            return {
                headImg: '',
                hasHeadImg: false
            }
        },
        methods: {
            closeMyself: function() {
                this.$emit('closePopover');
            },
            change: function(ev) {
                let _this = this;
                let img = document.createElement('img');
                let imgSrc = '';
                for(var i=0, f; f=ev.target.files[i]; i++) {
                    if(f.type.indexOf('image') !==0) {
                        continue;
                    }
                    let reader = new FileReader();
                    reader.onload = function(ev) {
                        let headImg = document.getElementsByClassName('showHead')[0];
                        imgSrc = ev.target.result;
                        img.src = imgSrc;
                        headImg.style.backgroundImage = "url('"+ imgSrc +"')";
                        _this.headImg = comPressedImg(img);
                        _this.hasHeadImg = true;
                    }
                    reader.readAsDataURL(f);
                }
            },
            submit: function() {
                let _this = this;
                if(!this.hasHeadImg) {
                    return;
                }
                axios({
                    method: 'post',
                    url: 'http://localhost:3001/user/postHeadImg',
                    withCredentials: true,
                    data: {
                        headImg: _this.headImg
                    }
                }).then(function(result) {
                    if(result.status == 0) {
                        _this.$emit('closePopover');
                    }
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
        margin: 0 auto;
    }
    .chooseImg {
        position: absolute;
        top: 0;
        left: 0;
        filter: alpha(opacity=0);
        opacity: 0;
        height: 40px;
        width: 100%;
    }
    .submit {
        height: 40px;
        width: 50%;
        color: #ffffff;
        line-height: 40px;
        text-align: center;
        background-color: #FABC63;
        border-radius: 20px;
        margin: 30px auto;
    }
</style>

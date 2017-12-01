<template>
    <div class="container">
        <ul class="bannerContainer">
            <li class="showBanner s1"></li>
            <li class="showBanner s2"></li>
            <li class="showBanner s3"></li>
            <li class="showBanner s4"></li>
            <li class="showBanner s5"></li>
        </ul>
        <ul class="indicator">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
        </ul>
    </div>  
</template>
<script>
    export default {
        data: function() {
            return {
                
            }
        },
        mounted: function() {
            let screenWidth = document.documentElement.clientWidth;
            let bannerCtr = document.getElementsByClassName('bannerContainer')[0];
            let indicator = document.getElementsByClassName('indicator')[0];
            let indicatorLi = indicator.children;
            indicatorLi[0].style.opacity = 1;
            bannerCtr.addEventListener('touchstart',function(ev) {
                let posX = event.changedTouches[0].clientX;
                let ulPosX = Number((bannerCtr.style.left).slice(0,-2));
                let photoPage = Math.abs(parseInt(ulPosX/screenWidth));
                let long = 0;
                bannerCtr.addEventListener('touchmove',function(ev) {
                    let mposX = event.changedTouches[0].clientX;
                    long = mposX - posX;
                    bannerCtr.style.left = ulPosX + long + 'px';
                },false);
                bannerCtr.addEventListener('touchend',function(ev) {
                    let ulPosX = Number((bannerCtr.style.left).slice(0,-2));
                    if(ulPosX >= 0) {
                        bannerCtr.style.left = 0 + 'px';
                    }
                    if(ulPosX < Number('-' + (screenWidth * 4))) {
                        bannerCtr.style.left = Number('-' + (screenWidth * 4)) + 'px';
                    }
                    if(long <0 && photoPage != 4) {
                        bannerCtr.style.left = '-' + ((photoPage + 1) * screenWidth) + 'px';
                        for(let i=0; i<indicatorLi.length; i++) {
                            indicatorLi[i].style.opacity = 0.3;
                        }  
                        indicatorLi[photoPage + 1].style.opacity = 1; 
                    }
                    if(long > 0 && photoPage != 0) {
                        bannerCtr.style.left = '-' + ((photoPage - 1) * screenWidth) + 'px';
                        for(let i=0; i<indicatorLi.length; i++) {
                            indicatorLi[i].style.opacity = 0.3;
                        }  
                        indicatorLi[photoPage - 1].style.opacity = 1; 
                    }
                },false);
            },false);
        }
    }
</script>
<style scoped>
    .container {
        position: relative;     
        overflow: hidden;
    }
    .bannerContainer {
        position: relative;
        list-style: none;
        height: 180px;
        padding: 0;
        margin: 0;
    }
    .showBanner {
        position: absolute;
        top: 0;
        width: 100%;
        height: 180px;   
        background-position: center center;
        background-repeat: no-repeat;
        background-size: auto 100%;
    }
    .s1 {
        background-image: url('../assets/bannerShow/caonima.jpg');
        left: 0%;
    }
    .s2 {
        background-image: url('../assets/bannerShow/boat.jpg');
        left: 100%;
    }
    .s3 {
        background-image: url('../assets/bannerShow/car.jpg');
        left: 200%;
    }
    .s4 {
        background-image: url('../assets/bannerShow/fish.jpg');
        left: 300%;
    }
    .s5 {
        background-image: url('../assets/bannerShow/monkey.jpg');
        left: 400%;
    }
    .indicator {
        display: inline-block;
        padding: 0px;
        margin: -5px auto 0;
        position: absolute;
        bottom: 5px;
        left: calc(50% - 63px);
    }
    .indicator > li {
        display: inline-block;
        width: 20px;
        height: 4px;
        background-color: #ffffff;
        opacity: .3;
        margin-left: 3px;
    }
</style>

<template>
    <div class="container">
        <div class="showBanner"></div>
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

        }
    }
</script>
<style scoped>
    .container {
        position: relative;
    }
    .showBanner {
        height: 180px;
        background: url('../assets/bannerShow/caonima.jpg');   
        background-position: center center;
        background-repeat: no-repeat;
        background-size: auto 100%;
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
        background-color: black;
        margin-left: 3px;
    }
</style>

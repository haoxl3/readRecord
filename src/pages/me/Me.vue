<template>
    <div class="container">
        <div class="userinfo">
            <img :src="userinfo.avatarUrl" alt="">
            <p>{{userinfo.nickName}}</p>
        </div>
        <YearProgress></YearProgress>
        <button class="btn" @click="scanBook">添加图书</button>    
    </div>
</template>
<script>
export default {
    data() {
        return {
            userinfo: {}
        }
    },
    methods: {
        scanBook() {
            wx.scanCode({
                success: (res) => {
                    console.log(res)
                }
            })
        }
    },
    created() {
        this.userinfo = wx.getStorageSync('userinfo')
    }
}
</script>
<style lang="scss">
.container{
    padding: 0 30rpx;
    .userinfo{
        margin-top: 100rpx;
    }
}
</style>


<template>
    <div class="container">
        <div class="userinfo">
            <img :src="userinfo.avatarUrl" alt="">
            <p>{{userinfo.nickName}}</p>
        </div>
        <YearProgress></YearProgress>
        <button open-type="getUserInfo" lang="zh_CN" @click="getUserInfo">获取用户信息</button>
        <button class="btn" @click="scanBook">添加图书</button>    
    </div>
</template>
<script>
import {get, showSuccess} from '@/util'
import qcloud from 'wafer2-client-sdk/index.js'
import config from '@/config'
import YearProgress from '@/components/YearProgress'
export default {
    data() {
        return {
            userinfo: {}
        }
    },
    components: {
        YearProgress
    },
    methods: {
        scanBook() {
            wx.scanCode({
                success: (res) => {
                    console.log(res)
                }
            })
        },
        async getUserInfo() {
            let user = wx.getStorageSync('userinfo')
            console.log('user='+user)
            qcloud.setLoginUrl(config.loginUrl)
            console.log(config.loginUrl)
            if(user) {
                qcloud.loginWithCode({
                    success: res => {
                        console.log(res)
                        showSuccess('登录成功')
                    },
                    fail: err => {
                        console.error(err)
                    }
                })
            } else {
                // 首次登录
                qcloud.login({
                    success: res => {
                        showSuccess('登录成功')
                        console.log(res)
                        this.userinfo = res 
                    },
                    fail: err => {
                        console.log('登录失败---', err)
                    }
                })
            }
        }
    },
    created() {
        this.userinfo = wx.getStorageSync('userinfo')
    }
}
</script>
<style lang="scss">
.container{
    padding:0 30rpx;

}  
.userinfo{
    margin-top:100rpx;
    text-align:center;
    img{
        width: 150rpx;
        height:150rpx;
        margin: 20rpx;
        border-radius: 50%;
    }
}
</style>


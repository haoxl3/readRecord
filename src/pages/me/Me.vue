<template>
    <div class="container">
        <p>openId={{userinfo.openId}}</p>
        <div class="userinfo" open-type="getUserInfo"  @click="getUserInfo" lang="zh_CN">
            <img :src="userinfo.avatarUrl" alt="">
            <button open-type="getUserInfo"  @click="getUserInfo" lang="zh_CN">{{userinfo.nickName}}</button>
        </div>
        <YearProgress></YearProgress>
        <button class="btn" v-if="userinfo.openId" @click="scanBook">添加图书{{userinfo.openId}}</button>    
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
            userinfo: {
                avatarUrl: '../../../static/img/unlogin.png',
                nickName: '点击登录'
            }
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
            qcloud.setLoginUrl(config.loginUrl)
            if(user) {
                qcloud.loginWithCode({
                    success: res => {
                        showSuccess('登录成功2')
                        this.userinfo = res
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
                        this.userinfo = res
                        wx.setStorageSync('userinfo',res)
                        // qcloud.request({
                        //     url: config.userUrl,
                        //     login: true,
                        //     success(userRes) {
                        //         showSuccess('登录成功')
                        //         wx.setStorageSync('userinfo',userRes.data.data)
                        //         // this.userinfo = userRes.data.data
                        //     }
                        // })
                    },
                    fail: err => {
                        console.log('登录失败---', err)
                    }
                })
            }
        }
    },
    // created() {
    //     this.userinfo = wx.getStorageSync('userinfo')
    // }
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
    button{
        background: none;
        border: 1px solid transparent;
        width: 120px;
        height: 30px;
        margin: auto;
        text-align: center;
        line-height: 30px;
        &::after{
            border: none;
        }
    }
}
</style>


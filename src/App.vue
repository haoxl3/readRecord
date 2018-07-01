<template>
  <button @click="getUserInfo">用户授权信息</button>
</template>
<script>
import {get, showSuccess} from './util'
import qcloud from 'wafer2-client-sdk'
import config from './config'
export default {
  // async created () {
  //   let user = wx.getStorageSync('userinfo')
  //   console.log('user='+user)
  //   if(!user) {
  //     qcloud.setLoginUrl(config.loginUrl)
  //     qcloud.login({
  //       success: function(userinfo) {
  //         console.log('登录成功', userinfo)
  //         showSuccess('登录成功')
  //         wx.setStorageSync('userinfo', userinfo)
  //       },
  //       fail: function(err) {
  //         console.log('登录失败---', err)
  //       }
  //     })
  //   }
  //   const res = await get('/weapp/demo')
  //   console.log(123, res)
  // }
  // methods: {
  //   async getUserInfo() {
  //     let user = wx.getStorageSync('userinfo')
  //     console.log('user='+user)
  //     if(!user) {
  //       qcloud.setLoginUrl(config.loginUrl)
  //       qcloud.login({
  //         success: function(userinfo) {
  //           console.log('登录成功', userinfo)
  //           showSuccess('登录成功')
  //           wx.setStorageSync('userinfo', userinfo)
  //         },
  //         fail: function(err) {
  //           console.log('登录失败---', err)
  //         }
  //       })
  //     }
  //     const res = await get('/weapp/demo')
  //     console.log(123, res)
  //   }
  // }
}
</script>

<style>
.text-footer{
  text-align: center;
  font-size: 12px;
  margin-bottom: 5px;
}
.text-primary{
  color:#EA5149;
}
.page-title{
  padding-left: 20px;
  background: #eee;
  line-height: 40px;
  font-size: 14px;
}
.right{
  float: right;
}
.btn{
  color: #fff;
  background: #EA5A49;
  margin-bottom: 10px;
  padding-left: 15px;
  border-radius: 2px;
  font-size: 16px;
  line-height: 40px;
  height: 40px;
  width: 100%;
}
.btn:active{
  background: #FA5A49;
}
</style>

<template>
    <div>
        <comment-list v-if="userinfo.openId" type='user' :comments="comments"></comment-list>
        <div v-if="userinfo.openId">
            <Card v-for="book in books" :key="book.id" :book="book"></Card>
            <div v-if="!books.length">暂时还没有添加过书，快去添加吧！</div>
        </div>
    </div>
</template>
<script>
import {get} from '@/util'
import CommentList from '@/components/CommentList'
import Card from '@/components/Card'
export default {
    data() {
        return {
            comments: [],
            userinfo: {},
            books: []
        }
    },
    components: {
        CommentList,
        Card
    },
    methods: {
        init() {
            wx.showNavigationBarLoading()
            this.getComments()
            this.getBooks()
            wx.hideNavigationBarLoading()
        },
        async getComments() {
            const comments = await get('/weapp/commentlist',{
                openid: this.userinfo.openId
            })
            this.comments = comments.list
        },
        async getBooks() {
            const books = await get('/weapp/booklist', {
                openid: this.userinfo.openId
            })
            this.books = books.list
        }
    },
    onPullDownRefresh() {
        tis.init()
        wx.stopPullDownRefresh()
    },
    onShow() {
        if(!this.userinfo.openId) {
            let userinfo = wx.getStorageSync('userinfo')
            if(userinfo) {
                this.userinfo = userinfo
                this.init()
            }
        }
    }
}
</script>
<style>

</style>


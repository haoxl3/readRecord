<template>
    <div>
        <TopSwiper :tops='tops'></TopSwiper>
        <Card v-for="book in books" :book="book" :key="book.id">{{book.title}}</Card>
        <p class="text-footer" v-if="!more">没有更多数据</p>
    </div>
</template>
<script>
import {get} from '@/util'
import Card from '@/components/Card'
import TopSwiper from '@/components/TopSwiper'
export default {
    data() {
        return {
            books: [],
            page: 0,
            more: true,
            tops: []
        }
    },
    components: {
        Card,
        TopSwiper
    },
    methods: {
        async getList(init) {
            if(init) {
                this.page = 0
                this.more = true
            }
            wx.showNavigationBarLoading()
            const books = await get('/weapp/booklist',{page:this.page})
            // 显示底部的“没有更多”提示
            if(books.list.length < 10 && this.page > 0){
                this.more = false
            }
            // 初始时直接赋值，滑动翻页时向books后面追加数据
            if(init) {
                this.books = books.list
                wx.stopPullDownRefresh()
            } else {
                this.books = this.books.concat(books.list)
            }
            wx.hideNavigationBarLoading()
            console.log('books')
            console.log(books)
        },
        async getTop() {
            const tops = await get('/weapp/top')
            this.tops = tops.list
        }
    },
    onPullDownRefresh() {
        this.getList(true)
        this.getTop()
    },
    onReachBottom() {
        if(!this.more){
            return false
        }
        this.page = this.page + 1
        this.getList()
    },
    mounted() {
        this.getList(true)
        this.getTop()
    }
}
</script>
<style>

</style>


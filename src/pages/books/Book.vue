<template>
    <div>
        books={{books}}
        <Card v-for="book in books" :book="book" :key="book.id">{{book.title}}</Card>
    </div>
</template>
<script>
import {get} from '@/util'
import Card from '@/components/Card'
export default {
    data() {
        return {
            books: []
        }
    },
    components: {
        Card
    },
    methods: {
        async getList() {
            wx.showNavigationBarLoading()
            const books = await get('/weapp/booklist')
            this.books = books.list
            wx.stopPullDownRefresh()
            wx.hideNavigationBarLoading()
            console.log('books')
            console.log(books)
        }
    },
    onPullDownRefresh() {
        this.getList()
    },
    mounted() {
        this.getList()
    }
}
</script>
<style>

</style>


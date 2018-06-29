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
            const books = await get('/weapp/booklist')
            // this.books = books.list
            console.log('books')
            console.log(books)
        }
    },
    created() {
        this.getList()
    }
}
</script>
<style>

</style>


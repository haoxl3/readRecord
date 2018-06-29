import Vue from 'vue'
import Book from './Book'

const app = new Vue(Book)
app.$mount()

// 相当于window的配置
export default{
    config: {
        enablePullDownRefresh: true
    }
}

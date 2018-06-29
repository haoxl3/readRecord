const https = require('https')
//获取mysql在当前环境下实例
const {mysql} = require('../qcloud')
// 新增图书
module.exports = async (ctx) => {
    const {isbn, openid} = ctx.request.body
    if(isbn && openid) {
        // 读取书码后先从数据库查询看是否已存过
        const findRes = await mysql('books').select().where('isbn', isbn)
        console.log('findRes='+findRes)
        if(findRes.length) {
            ctx.state = {
                code: -1,
                data: {
                    msg: '图书已存在'
                }
            }
            return
        }
        // 1.获取豆瓣信息
        //https://developers.douban.com/wiki/?title=book_v2#get_isbn_book
        let url = 'https://api.douban.com/v2/book/isbn/'+isbn
        const bookinfo = await getJSON(url)
        const rate = bookinfo.rating.average
        const {title,image,alt,publisher,summary,price} = bookinfo
        const tags = bookinfo.tags.map(v => {
            return `${v.title} ${v.count}`
        }).join(',')
        const author = bookinfo.author.join(',')
        // 2.入库,将数据存到books表中
        try{
            await mysql('books').insert({
                isbn,openid,title,image,alt,publisher,summary,price,rate,tags,author
            })
            console.log('come in try')
            ctx.state.data = {
                title,
                msg: 'insert success'
            }
        }catch(e){
            console.log('come in catch')
            ctx.state = {
                code: -1,
                data: {
                    msg: '新增失败：'+e.sqlMessage
                }
            }
        }
    }
}

// node原生下载一个json并转为promise
function getJSON(url) {
    return new Promise((resolve, reject)=>{
        https.get(url, res=> {
            let urlData = ''
            res.on('data', data=>{
                urlData +=data
            })
            res.on('end', data=>{
                const bookinfo = JSON.parse(urlData)
                if(bookinfo.title){
                    resolve(bookinfo)
                }
                reject(bookinfo)
            })
        })
    })
}
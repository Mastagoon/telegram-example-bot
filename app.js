const { Telegraf } = require('telegraf')
require("dotenv").config()
const axios = require("axios")



const search = async(q) => {
    const response = await axios.request({
        url: `https://google-search3.p.rapidapi.com/api/v1/search/q=${q}`,
        method: "GET",
        headers: {
            'x-user-agent': 'desktop',
            'x-proxy-location': 'EU',
            'x-rapidapi-host': 'google-search3.p.rapidapi.com',
            'x-rapidapi-key': process.env.GOOGLE_API_TOKEN
        }
    })
    return response.data.results[0]
}

const bot = new Telegraf(process.env.TOKEN)
bot.launch()

bot.hears('ميدو', (ctx) => {
    console.log("I heard medo")
    console.log(ctx)
    ctx.reply("أهلاً يا ميدو")
})

bot.command("sticker", (ctx) => {
    ctx.reply("Sticker !")
    ctx.replyWithSticker('https://www.gstatic.com/webp/gallery/1.webp')
})

bot.hears("بحث", (ctx) => {
    console.log(ctx)
})

bot.on('text', async(ctx) => {
    if (ctx.update.message.text.startsWith('بحث')) {
        const message = ctx.update.message.text
        const searchString = message.split(" ").slice(1).join(" ")
        const result = await search(searchString)
        ctx.reply(`لقد تم البحث ! النتيجة الأولى هي: ${result.title}\n${result.link}`)
    }
})

// Enable graceful stop
process.once('SIGTERM', () => bot.stop('SIGTERM'))
process.once('SIGINT', () => bot.stop('SIGINT'))
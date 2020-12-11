const router = require('express').Router()
const scrape = require('../../scrape/index.js')
const cheerio = require('cheerio');
const request = require('request');

module.exports = router

const reqListener = async (input) => {
  try {
    const $ = cheerio.load(input)
    let lineup = $('.lineup.medium');
    if(lineup.html() === null) {
      lineup = $('.lineup.large')
      console.log(lineup.html())
    }
    const lineUpHTML = lineup.html();
    console.log(lineUpHTML)
    let re= /<br>|,/
    let arr = lineUpHTML.split(re);
    arr = arr.map(el => {
      if(el !== undefined) {
        return el
      }
    })
    arr = arr.map((str, i) => {
      if(i!==0) {
        return str.slice(1,str.length)
      } else {
        return str
      }
    })
    arr = arr.map((str) => {
      let i = str.indexOf('>');
      if(i === -1) {
        return str;
      } else {
        str = str.slice(i+1, str.length+1);
        let j = str.indexOf('<');
        str = str.slice(0, j);
        return str;
      }
    })
  return arr;
  } catch(e) {
    console.error(e)
  }
}

router.get('/', async (req, res, next) => {
  try {
    var final
   let eventUrl = await req.query.eventUrl
   console.log(eventUrl)
    eventUrl = [...eventUrl]
    eventUrl.pop()
    eventUrl.shift()
    eventUrl = eventUrl.join('')
    console.log(eventUrl)
   // const resssy = reqListener(eventUrl)
    const rezzy = await scrape.scraper(eventUrl)
    console.log(rezzy)
   res.send(rezzy)
  } catch(e) {
    console.log(e)
    next(e);
  }
})




const router = require('express').Router()
const scrape = require('../../scrape/index.js')
const cheerio = require('cheerio');

module.exports = router

const reqListener = (input) => {
  try {
    const $ = cheerio.load(input)
    let lineup = $('.lineup.medium');
    if(lineup.html() === null) {
      lineup = $('.lineup.large')
    }
    const lineUpHTML = lineup.html();
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
   let eventUrl = await req.query.eventUrl
    eventUrl = [...eventUrl]
    eventUrl.pop()
    eventUrl.shift()
    eventUrl = eventUrl.join('')
    const response = await scrape.scraper(eventUrl)
    //let arr = reqListener(response)
    //console.log('arr', arr)
    if(response === undefined) {
      res.send(['madonna'])
    } else {
      res.send(response);
    }
  } catch(e) {
    console.log(e)
    next(e);
  }
})




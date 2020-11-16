const router = require('express').Router()
const scrape = require('../../scrape/index.js')
const cheerio = require('cheerio');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

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
const load = (url) => {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      let info = xhr.responseText
      return info;
    }
  }
  xhr.open('GET', url, true);
  xhr.send('');
}

router.get('/', async (req, res, next) => {
  try {
   let eventUrl = await req.query.eventUrl
    eventUrl = [...eventUrl]
    eventUrl.pop()
    eventUrl.shift()
    eventUrl = eventUrl.join('')
    const response = await scrape.scraper(eventUrl)
    let arr = reqListener(response)
    console.log('arr', arr)
    if(arr === undefined) {
      res.send(['madonna'])
    } else {
      res.send(arr);
    }
  } catch(e) {
    console.log(e)
    next(e);
  }
})

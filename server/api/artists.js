const router = require('express').Router()
 const scrape = require('../../scrape/index.js')

module.exports = router


router.get('/', async (req, res, next) => {
  try {
    let {eventUrl} = req.query
    eventUrl = [...eventUrl]
    eventUrl.pop()
    eventUrl.shift()
    eventUrl = eventUrl.join('')
    // console.log(eventUrl)
    //check if http is in link
    const artists = await scrape.scraper(eventUrl);
    // console.log(artists)
    res.send(artists);
  } catch(e) {
    console.log(e)
    next(e);
  }
})

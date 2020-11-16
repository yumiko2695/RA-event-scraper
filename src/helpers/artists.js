const scrape = require('../../scrape/index.js')

export const getArtists = async (url) => {
  let eventUrl = [...url]
  // eventUrl.pop()
  // eventUrl.shift()
  eventUrl = eventUrl.join('')
  let artists = await scrape.scraper(eventUrl)
  return artists;
}


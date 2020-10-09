const fetch = require('node-fetch');
// require('../../../secrets');

//47b83d9adb28b0160e6766f97bf60d99
function search(name) {
  return fetch(`http://ws.audioscrobbler.com/2.0?method=artist.getinfo&artist=${name}&api_key=${process.env.LASTFM_API_KEY}&format=json`)
  .then(response => response.json())
  .then(data => {
    console.log('inside the function')
    console.log(data)
    return data
  }).catch(e => {
    console.log(e)
  })
}

module.exports = {search}

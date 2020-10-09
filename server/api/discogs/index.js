const router = require('express').Router()
const fetch = require('node-fetch')
var Discogs = require('disconnect').Client;
// require('../../../secrets')


var requestData
var accessData

module.exports = router


router.get('/:artist', async (req, res, next) => {
  try {
    const artist = await req.params.artist;
    let releases
    let db = await new Discogs({consumerKey: `${process.env.DISCOGS_CONSUMER_KEY}`,consumerSecret: `${process.env.DISCOGS_CONSUMER_SECRET}`}).database();
      db.search({type:'artist', q: `${artist}`, page:'1', per_page:'5'}, async function(err, data){
        if(data.results[0].title.toLowerCase() === artist.toLowerCase()) {
          let id = await data.results[0].id
          await db.getArtistReleases(id, {page: '1', per_page: '5'}, function(err, data) {
            releases = data
            console.log(releases)
          })
        }
    })
    if(releases !== 'error') {
      res.send(releases);
    }
    next()
  } catch(e) {
     console.log(e);
     next(e)
  }
})


// router.get('/authorize', function(req, res){
//   var oAuth = new Discogs().oauth();
//   oAuth.getRequestToken(
//     'QPZOfgFPhemoWqOgOXHG',
//     'hprzWPmDmuFFLxdRnwiekaOTcyqmHSVa',
//     'http:locahost:5000/oauth/callback', // ?what do i put here?
//     function(err, requestedData){
//       requestData = requestedData;
//       console.log('request data', requestData)
//       // Persist "requestData" here so that the callback handler can
//       // access it later after returning from the authorize url
//       res.redirect(requestData.authorizeUrl);
//     }
//   );
// })
// router.get('/callback', function(req, res){
//   var oAuth = new Discogs(requestData).oauth();
//   oAuth.getAccessToken(
//     req.query.oauth_verifier, // Verification code sent back by Discogs
//     function(err, accessedData){
//       accessData = accessedData
//       console.log('access data', accessData)
//       //search(accessData);
//       // Persist "accessData" here for following OAuth calls
//       oAuth.search()
//       res.send('Received access token!');
//     }
//   );
// })
// router.get('/identity', function(req, res){
//   var dis = new Discogs(accessData);
//   dis.getIdentity(function(err, data){
//     console.log(data)
//     res.send(data);
//   });
// });




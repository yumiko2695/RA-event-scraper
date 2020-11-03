const router = require('express').Router()
const fetch = require('node-fetch')
var Discogs = require('disconnect').Client;
// require('../../../secrets')


var requestData
var accessData

module.exports = router

var idInfo;
var idReleases;

router.get('/profile/:id', async (req, res, next) => {
  try {
    const id = await req.params.id;
    console.log(id)
    let db = await new Discogs({consumerKey: `${process.env.DISCOGS_CONSUMER_KEY}`,consumerSecret: `${process.env.DISCOGS_CONSUMER_SECRET}`}).database()
    db.getArtistReleases(idInfo, {page: '1', per_page: '5'}, function(err, data) {
          console.log('albums', data.releases);
          idReleases = data.releases
        })
        if(idReleases) {
          res.send(idReleases)
        }
    next()
  } catch(e) {
    console.error(e)
    next(e)
  }
})

router.get('/:artist', async (req, res, next) => {
  try {
    const artist = await req.params.artist;
    let db = await new Discogs({consumerKey: `${process.env.DISCOGS_CONSUMER_KEY}`,consumerSecret: `${process.env.DISCOGS_CONSUMER_SECRET}`}).database();
    db.search({type:'artist', q: `${artist}`, page:'1', per_page:'5'}, async function(err, data){
        if(data.results[0].title.toLowerCase() === artist.toLowerCase()) {
          console.log(data.results)
          let id = await data.results[0].id
          console.log('this is id inside call', id)
          idInfo = id
        }
        })
        if(idInfo) {
          res.send(idInfo)
        }
        next()
    }
    catch(e) {
      console.error(e)
      next(e)
    }
})

//     router.get('/:artist', async (req, res, next) => {
//       try {
//         const artist = await req.params.artist;
//         let db = await new Discogs({consumerKey: `${process.env.DISCOGS_CONSUMER_KEY}`,consumerSecret: `${process.env.DISCOGS_CONSUMER_SECRET}`}).database();
//         db.search({type:'artist', q: `${artist}`, page:'1', per_page:'5'}, async function(err, data){
//             if(data.results[0].title.toLowerCase() === artist.toLowerCase()) {
//             let id = await data.results[0].id
//             console.log('this is id inside call', id)
//             idInfo = id;
//             if(idInfo) {
//               db.getArtistReleases(idInfo, {page: '1', per_page: '5'}, function(err, data) {
//                 console.log('albums', data.releases);
//                 idReleases = data.releases
//               })
//             }
//             }
//         })
//     res.send(idReleases)

//     next()
//   } catch(e) {
//     console.log(e);
//     next(e)
//   }
// })

// router.get('/:artist', async (req, res, next) => {
//   try {
//     const artist = await req.params.artist;
//     let db = await new Discogs({consumerKey: `${process.env.DISCOGS_CONSUMER_KEY}`,consumerSecret: `${process.env.DISCOGS_CONSUMER_SECRET}`}).database();
//     db.search({type:'artist', q: `${artist}`, page:'1', per_page:'5'}, async function(err, data){
//         if(data.results[0].title.toLowerCase() === artist.toLowerCase()) {
//         let id = await data.results[0].id
//         console.log('this is id inside call', id)
//         idInfo = id;
//         if(idInfo) {
//           db.getArtistReleases(idInfo, {page: '1', per_page: '5'}, function(err, data) {
//             console.log('albums', data.releases);
//             idReleases = data.releases
//           })
//         }
//         }
//     })
// //console.log('this is id info', idInfo)
// res.send(idReleases)
// // console.log(info)
// // if(info !== 'error') {
// //   console.log('this is releases', info)
// //   res.send(info);
// // }
// next()
// } catch(e) {
// console.log(e);
// next(e)
// }
// })


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




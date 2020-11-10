const router = require('express').Router()
router.use('/artists', require('./artists'))
router.use('/discogs', require('./discogs'))
router.use('/lastfm', require('./lastfm'))


// router.use((req, res, next) => {
//   try {
//     const error = new Error('Not Found')
//     error.status = 404
//     next(error)
//   } catch(error) {
//     console.log('error', error)
//   }

// })

module.exports = router

const cors = require('cors')
const express = require('express')
const path = require('path')
const helmet = require('helmet')
const morgan = require('morgan')
const session = require('express-session')
const PORT = process.env.PORT || 5000
require('dotenv').config()


express()
  .use(helmet())
  .use(morgan('dev'))
  .use(express.json())
  .use(express.urlencoded({extended:true}))
  .use(cors())
  .use('/api', require('./api'))
  .use(express.static(path.join(__dirname, 'build')))
  .set('views', path.join(__dirname, 'src'))
  .set('view engine', 'html')
  // .get('/', (req, res) => res.render('build/index.html'))
  .get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  })
  .use((err, req, res, next) => {
    console.error(err)
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal server error.')
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

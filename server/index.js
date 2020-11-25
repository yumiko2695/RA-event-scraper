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
  .use(cors({origin: 'true'}))
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


  // Listen on a specific host via the HOST environment variable
var host = process.env.HOST || '127.0.0.1';
// Listen on a specific port via the PORT environment variable
var port = process.env.PORT || 8080;

var cors_proxy = require('cors-anywhere');
cors_proxy.createServer({
    originWhitelist: [], // Allow all origins
    requireHeader: ['origin', 'x-requested-with'],
    removeHeaders: ['cookie', 'cookie2']
}).listen(port, host, function() {
    console.log('Running CORS Anywhere on ' + host + ':' + port);
});

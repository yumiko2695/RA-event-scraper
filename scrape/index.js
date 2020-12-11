
const cheerio = require('cheerio');
const fetch = require('node-fetch');
const request = require('request')

var data;

async function scraper(searchUrl) {
    return fetch(searchUrl)
    .then(response => response.text())
    .then(body => {
      const $ = cheerio.load(body);
      let lineup = $('.lineup.medium');
      if(lineup.html() === null) {
        lineup = $('.lineup.large')
      }
      const lineUpHTML = lineup.html();
      let re= /<br>|,/
      let arr = lineUpHTML.split(re);
      arr = arr.map(el => {
        if(el!==undefined) {
          return el;
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
    // console.log(arr);
    return arr;
    })
}


// function scraper(searchUrl, res) {
//   var final;
//   request(searchUrl, function (error, response, body) {
//     try {
//    console.error('error:', error); // Print the error if one occurred
//    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//   //console.log('body:', body); // Print the HTML for the Google homepage.
//   //console.log(arr);
//     const $ = cheerio.load(body);
// let lineup = $('.lineup.medium');
//   if(lineup.html() === null) {
//       lineup = $('.lineup.large')
//   }
//   const lineUpHTML = lineup.html();
//   let re= /<br>|,/
//   let arr = lineUpHTML.split(re);
//   arr = arr.map(el => {
//     if(el!==undefined) {
//       return el;
//     }
//   })
//   arr = arr.map((str, i) => {
//     if(i!==0) {
//       return str.slice(1,str.length)
//     } else {
//       return str
//     }
//   })
//   arr = arr.map((str) => {
//     let i = str.indexOf('>');
//     if(i === -1) {
//       return str;
//     } else {
//       str = str.slice(i+1, str.length+1);
//       let j = str.indexOf('<');
//       str = str.slice(0, j);
//       return str;
//     }
//   })
//   final = arr;
//   console.log(final)
//   res.data(final)
//   res.send(final)
// } catch(e) {
//   console.log(e)
// }
// })
// //res.send(final)
// };

//   return fetch(searchUrl)
//     .then(response => response.text())
//     .then(body => {
//       const $ = cheerio.load(body);
//       let lineup = $('.lineup.medium');
//       if(lineup.html() === null) {
//         lineup = $('.lineup.large')
//       }
//       const lineUpHTML = lineup.html();
//       let re= /<br>|,/
//       let arr = lineUpHTML.split(re);
//       arr = arr.map(el => {
//         if(el!==undefined) {
//           return el;
//         }
//       })
//       arr = arr.map((str, i) => {
//         if(i!==0) {
//           return str.slice(1,str.length)
//         } else {
//           return str
//         }
//       })
//       arr = arr.map((str) => {
//         let i = str.indexOf('>');
//         if(i === -1) {
//           return str;
//         } else {
//           str = str.slice(i+1, str.length+1);
//           let j = str.indexOf('<');
//           str = str.slice(0, j);
//           return str;
//         }
//       })
//     // console.log(arr);
//     return arr;
//     })
// }

// async function scraper (searchUrl){
//   try {
//     function ninjaGetIp() {
//       return new Promise(function (resolve, reject) {
//           var ipRequest = new XMLHttpRequest();
//           ipRequest.open('GET', searchUrl);
//           ipRequest.send();
//           ipRequest.onload = function () {
//               if (ipRequest.status >= 200 && ipRequest.status < 400) { // If response is all good...
//                   return resolve(ipRequest.responseText);
//               }
//               else {
//                   console.log('There was an error retrieving the public IP.');
//                   return resolve('127.0.0.1');
//               }
//           }
//       });
//   }
//   let info = await ninjaGetIp()
//   return info;
//   const reqListener = (input) => {
//     try {
//       const $ = cheerio.load(input)
//       let lineup = $('.lineup.medium');
//       if(lineup.html() === null) {
//         lineup = $('.lineup.large')
//       }
//       const lineUpHTML = lineup.html();
//       let re= /<br>|,/
//       let arr = lineUpHTML.split(re);
//       arr = arr.map(el => {
//         if(el !== undefined) {
//           return el
//         }
//       })
//       arr = arr.map((str, i) => {
//         if(i!==0) {
//           return str.slice(1,str.length)
//         } else {
//           return str
//         }
//       })
//       arr = arr.map((str) => {
//         let i = str.indexOf('>');
//         if(i === -1) {
//           return str;
//         } else {
//           str = str.slice(i+1, str.length+1);
//           let j = str.indexOf('<');
//           str = str.slice(0, j);
//           return str;
//         }
//       })
//       data = arr;
//     return arr;
//     } catch(e) {
//       console.error(e)
//     }
//   }
//   let array = reqListener(info)
// return array;

  //let info = load(searchUrl, reqListener)
  //sreturn info
// } catch(e) {
//   console.log(e)
// }
// }

// const load = (url, callback) => {
//   var xhr = new XMLHttpRequest();
//   xhr.onreadystatechange = function() {
//     if (xhr.readyState === 4) {
//       var info = xhr.responseText
//       // callback(info);
//       return info;
//     }
//   }
//   xhr.open('GET', url, true);
//   xhr.send('');
// }



module.exports = {scraper}

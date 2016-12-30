'use strict';
const fetch = require('node-fetch');
const Client = require('./index');

let data = JSON.stringify({key: "aGVsbG8="});
let client = new Client();

// client.Put('nase', 'tech')
// .then((data) => {
//   console.log(data);
// })
// .catch((err) => {
//   console.log(error);
//   console.log(err);
// })

// client.Range('nase', {raw: false})
// .then((data) => {
//   console.log(data);
// })
// .catch((err) => {
//   console.log(error);
//   console.log(err);
// })

client.DeleteRange('nase')
.then((data) => {
  console.log(data);
})
.catch((err) => {
  console.log(error);
  console.log(err);
})
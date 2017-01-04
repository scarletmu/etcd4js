'use strict';
'use strict';
const fetch = require('node-fetch');
const util = require('./util');

const normalizeUrl = util.normalizeUrl;

class V2client {
  constructor(host, options){
    this._host = normalizeUrl(host || '127.0.0.1');
  }
  /**
   * set
   * @param key
   * @param value
   */
  set(key, value){
    let body = { key, value };
    return this._Request('keys', key, 'PUT', body);
  }
  // /**
  //  * get
  //  * @param key 
  //  */
  // get(key){
  //   return this._Request('keys', key, 'GET');
  // }  
  // /**
  //  * rm
  //  */
  // rm(key){

  // }
  // /**
  //  * mkdir
  //  */
  // mkdir(key, value){

  // }
  // /**
  //  * rmdir
  //  */
  // rmdir(key){

  // }
  // /**
  //  * updatedir
  //  */
  // updatedir(key){

  // }
  // /**
  //  * ls
  //  */
  // ls(key){

  // }
  // /**
  //  * update
  //  */
  // update(key, value){

  // }
  /**
   * Request
   * @param Service name
   * @param key name
   * @param method Using method
   * @param body
   */
  _Request(service, key, method, body){
    let url = this._host.concat(`/v2/${service}/${key}`) 
    return fetch(url, {method, body})
    .then((res) => {
      return res.json();
    })
  }
}

module.exports = V2client
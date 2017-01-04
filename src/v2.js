'use strict';
'use strict';
const fetch = require('node-fetch');
const util = require('./util');
const formurlencoded = require('form-urlencoded');

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
  set(key, value, ttl){
    let body = { value, ttl };
    return this._Request('keys', key, 'PUT', body);
  }
  /**
   * get
   * @param key 
   */
  get(key){
    return this._Request('keys', key, 'GET');
  }  
   /**
   * update
   */
  update(key, value, ttl){
    return this.set(key, value, ttl);
  }
  /**
   * rm
   */
  rm(key){
    return this._Request('keys', key, 'DELETE')
  }
  /**
   * Refresh TTL
   */
  refresh(key, ttl){
    let body = { ttl, refresh: true, prevExist: true }
    return this._Request('keys', key, 'PUT', body)
  }
  /**
   * wait
   */
  wait(key){
    key = key.concat('?wait=true');
    return this._Request('keys', key, 'GET');
  }
  /**
   * mkdir
   */
  mkdir(key, ttl){
    let body = { dir: true, ttl }
    return this._Request('keys', key, 'PUT', body);
  }
  /**
   * rmdir
   */
  rmdir(key){
    key = key.concat('?dir=true');
    return this._Request('keys', key, 'DELETE');
  }
  /**
   * ls
   */
  ls(key){
    return this.get(key);
  }
 
  /**
   * Request
   * @param Service name
   * @param key name
   * @param method Using method
   * @param body
   */
  _Request(service, key, method, body){
    let url = this._host.concat(`/v2/${service}/${key}`);
    if(body){
      body = formurlencoded(body);
    }
    return fetch(url, {method, body, headers: { 'Content-Type': 'application/x-www-form-urlencoded' }})
    .then((res) => {
      return res.json();
    })
  }
}

module.exports = V2client
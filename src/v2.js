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
  set(key, value, opt){
    if(!opt) opt = {}
    let query = [];
    let body = { 
      value, ttl: opt.ttl ,
      prevExist: opt.prevExist || undefined,
      prevValue: opt.prevExist || undefined,
      prevIndex: opt.prevExist || undefined
    };
    return this._Request('keys', key, 'PUT', body);
  }
  /**
   * create 
   */
  create(key, value){
    let body = { value };
    return this._Request('keys', key, 'POST', body);
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
  rm(key, opt){
    if(!opt) opt = {};
    let query = [];
    if(opt.prevIndex) query.push(`prevIndex=${opt.prevIndex}`);
    if(opt.prevValue) query.push(`prevValue=${opt.prevValue}`);
    if(query.length > 0){
      if(query.length == 1){
        key = key + '?'.concat(query[0]);
      }else{
        key = key + '?'.concat(query.join('&'));
      }
    }
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
    key = key.concat('?recursive=true');
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
    .then((json) => {
      if(json.errorCode){
        return Promise.reject(json);
      }else{
        return Promise.resolve(json);
      }
    })
  }
}

module.exports = V2client
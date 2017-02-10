# Intro

This is a basical client support for etcd v2 and v3 API.  
*Attention* : V2 API full support is still in progress.Basical key/value support already finished.   
*Attention* : Now V3 API only `KV` service can use restful gRPC-gateway.So fully support must waiting 3.1 Release.

## Update Log

Ver 1.1.1 : Add V2 API BasicAuth

## Install && Init

``npm install etcd4js``

## Usage
V3 Api require base64 key/value and range_end.This plugin will auto change it.Just input normal string in function.

``` js
const etcd4js = require('etcd4js'); 
let store = new etcd4js.v3('127.0.0.1:2379');//V3 API
let storev2 = new etcd4js.v2();//V2 API Default Use 127.0.0.1:2379

let username = 'root', password = 'test';
storev2.setAuth(username, password);//Use user to access auth

let key = 'hello';
let value = 'world';

//Use Default Option
store.Put(key, value)
.then((res) => {
  //result
})
.catch((err) => {
  //error
})

//Use Personal Option
store.Range(key, {count_only: true})
.then((res) => {
  //Only Return Count Result
})
.catch((err) => {
  //Error
})

//V2 API also based on Promise.
storev2.set(key, value)
.then((res) => {
  //result
})
.catch((err) => {
  //err
})
```
## V3 KV API 
### `.Put(key, [opt])`

Offical Doc: Put puts the given key into the key-value store. A put request increments the revision of the key-value store and generates one event in the event history.  
#### Default option value
``` js
{
  lease: 0,
  prev_kv: false
}
```

### `.Range(key, value, [opt])`

Offical Doc: Range gets the keys in the range from the key-value store.
  
#### Default option value
``` js
{
  range_end:  //like your key,,
  limit: 0,
  revision: 0,
  seriliazable: false,
  keys_only: false,
  count_only: false,
  raw: false //Personal Option, Default false means that will auto decrypt base64 key/value in return
}
```

### `.DeleteRange(key, [opt])`

Offical Doc: DeleteRange deletes the given range from the key-value store. A delete request increments the revision of the key-value store and generates a delete event in the event history for every deleted key.
  
#### Default option value
``` js
{
  range_end: //like your key
  prev_kv: false
}
```

### `.Compact(revision, [opt])`

Offical Doc: 	Compact compacts the event history in the etcd key-value store. The key-value store should be periodically compacted or the event history will continue to grow indefinitely.
  
#### Default option value
``` js
{
  physical: false
}
```

## V2 Client API 
V2 API will return ETCD raw response in Promise result coz I think that is the best way for everyone's need:)

### `.set(key, value, [opt])`

Setting the value of a key.

#### Default option value

```js
{
  ttl: (none),
  prevIndex: (none),
  prevExist: (none),
  prevValue: (none)
}
```

### `.get(key)`

Get the value of a key.

### `.rm(key, [opt])`

Deleting a key.

#### Default option value

```js
{
  prevIndex: (none),
  prevValue: (none)
}
```

### `.update(key, value, ttl)`

Update a key,same as `.set()` function when key already exists;

### `.create(key, value)`

Creating In-Order Keys

### `.refresh(key, ttl)`

Refresh a key's ttl.

### `.wait(key)`

Waiting Key changed.While key have changed,Promise will return result;

### `.mkdir(key, ttl)`

Creating Directories.

### `.rmdir(key)`

Deleting a Directories.

### `.ls(key)`

Listing a Directories.

## V2 Members API 

`peerUrls` Could be a string or a array;

### `.members()`

Get cluster members list.

### `.addMember(peerUrls)`

Add member to cluster.

### `.delMember(id)`

Deleting a member in cluster.

### `.updateMember(id, peerUrls)`

Update a member's peerurl.
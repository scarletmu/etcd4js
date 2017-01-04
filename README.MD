# Intro

This is a basical client support for etcd v2 and v3 api.  
*Attention* : V2 Api support is in progress.Doc will publish when finish.   
*Attention* : Now V3 api only KV service can use restful gRPC-gateway.Waiting 3.1 Release.

## Install && Init
``npm install etcd4js``

## Usage
V3 Api require base64 key/value and range_end.This plugin will auto change it.Just input normal string in function.

``` js
const etcd4js = require('etcd4js').v3 //If want to use v2  require('etcd4js').v2
let store = new etcd4js('127.0.0.1:2379')

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
```
## V3 API 
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
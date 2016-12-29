# Intro

This is a basical client support for  etcd v3 gRPC-gateway  api


## Install && Init
``` js
const etcd4js = require('etcd4js')
let store = new etcd4js('127.0.0.1:2379')
```

## Usage
Now ``Put()`` and ``Range()`` can work,Other is still in progress.

### `.Put(key, [opt])`

Offical Doc: Put puts the given key into the key-value store. A put request increments the revision of the key-value store and generates one event in the event history.  
#### option value
``` js
{
  lease: 0,
  prev_kv: false
}
```

### `.Range(key, value, [opt])`

Offical Doc: Range gets the keys in the range from the key-value store.
  
#### option value
``` js
{
  range_end: //base64type,
  limit: 0,
  revision: 0,
  seriliazable: false,
  keys_only: false,
  count_only: false
}
```
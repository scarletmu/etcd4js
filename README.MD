# Intro

This is a basical client support for  etcd v3 gRPC-gateway  api


## Install && Init
``` js
const etcd4js = require('etcd4js')
let store = new etcd4js('127.0.0.1:2379')
```

## Usage
Now ``Txn()`` is still in progress.  
V3 Api require base64 key/value and range_end.This plugin will auto change it.Just input normal string in function.

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
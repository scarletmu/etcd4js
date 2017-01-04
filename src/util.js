'use strict';
exports.normalizeUrl = (url) => {
  url = url.indexOf('://') === -1 ? 'http://' + url : url
  url = url.replace(/\/$/, '')
  if (!/:\d+/.test(url)) url += ':2379'
  return url
}

exports.b64 = (str) => {
  let b64str = new Buffer(str).toString('base64');
  return b64str;
}
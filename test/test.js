'use strict';
const Clientv3 = require('../index').v3;
const Clientv2 = require('../index').v2;
const assert = require('assert');
const should = require('should');

let clientv3 = new Clientv3();
let clientv2 = new Clientv2();

describe('V3Api', function(){
  describe('#Put', function(){
    it('should put test data', function(){
      return clientv3.Put('nase', 'tech').should.be.fulfilled()
    })
  })
  describe('#Range', function(){
    it('should get test data', function(){
      return clientv3.Range('nase', {raw: false})
      .then((data) => {
        return data.kvs.should.have.length(1);
      })
    })
  })
  describe('#DeleteRange', function(){
    it('should delete test data', function(){
      return clientv3.DeleteRange('nase').should.be.fulfilled()
    })
  })
})


describe('V2Api', function(){
  describe('#set', function(){
    it('should put test data', function(){
      return clientv2.set('nase', 'tech').should.be.fulfilled()
    })
  })
})

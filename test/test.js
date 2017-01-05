'use strict';
const etcd4js = require('../index');
const assert = require('assert');
const should = require('should');

let clientv3 = new etcd4js.v3();
let clientv2 = new etcd4js.v2();

describe('V3Api', () => {
  describe('#Put', () => {
    it('should put test data', () => {
      return clientv3.Put('nase', 'tech').should.be.fulfilled()
    })
  })
  describe('#Range', () => {
    it('should get test data', () => {
      return clientv3.Range('nase', {raw: false})
      .then((data) => {
        return data.kvs.should.have.length(1);
      })
    })
  })
  describe('#DeleteRange', () => {
    it('should delete test data', () => {
      return clientv3.DeleteRange('nase').should.be.fulfilled()
    })
  })
})


describe('V2Api', () => {
  describe('#set', () => {
    it('Should Set Key: nase value: tech', () => {
      return clientv2.set('nase', 'tech')
      .then((data) => {
        data.node.value.should.equal('tech');
      })
    })
  })
  describe('#refresh', () => {
    it('Should Refresh Key: nase TTL', () => {
      return clientv2.refresh('nase', 50).should.be.fulfilled();
    })
  })
  describe('#get', () => {
    it('Should Get Key: nase Value: tech', () => {
      return clientv2.get('nase')
      .then((data) => {
        data.node.value.should.equal('tech');
      });
    })
  })
  describe('#update', () => {
    it('Should Update Key: nase Value: well', () => {
      return clientv2.update('nase', 'well')
      .then((data) => {
        data.node.value.should.equal('well');
      });
    })
  })
  describe('#rm', () => {
    it('Should rm Key: nase', () => {
      return clientv2.rm('nase').should.be.fulfilled();
    })
  })
  describe('#wait', () => {
    it('Should Complete Wait in Key: running', () => {
      //Moke Add
      setTimeout(() => {
        clientv2.set('running', 'test')
        .then((data) => {})
      }, 20)
      return clientv2.wait('running').should.be.fulfilled();
    })
   
  })
  describe('Dir', () => {
    describe('#mkdir', () => {
      it('Should Add Dir: node', () => {
        return clientv2.mkdir('node').should.be.fulfilled();
      })
    })

    describe('#ls', () => {
      it('Should Add Moke Data to Dir: node', () => {
        return clientv2.set('node/foo', 'tech')
        .then((data) => {
          data.node.value.should.equal('tech');
        })
      })
      it('Should List Dir: node', () => {
        return clientv2.ls('node')
        .then((data) => {
          data.node.nodes.length.should.equal(1);
        })
      })
    })

    describe('#rmdir', () => {
      it('Should Remove Dir : node', () => {
        return clientv2.rmdir('node').should.be.fulfilled();
      })
    })
  })
})

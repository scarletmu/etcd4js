'use strict';
const etcd4js = require('../index');
const assert = require('assert');
const should = require('should');

let clientv3 = new etcd4js.v3();
let clientv2 = new etcd4js.v2();

describe('V3Api', () => {
  describe('#Put', () => {
    it('should put test data', () => {
      return clientv3.Put('keytest', 'tech').should.be.fulfilled()
    })
  })
  describe('#Range', () => {
    it('should get test data', () => {
      return clientv3.Range('keytest', {raw: false})
      .then((data) => {
        return data.kvs.should.have.length(1);
      })
    })
  })
  describe('#DeleteRange', () => {
    it('should delete test data', () => {
      return clientv3.DeleteRange('keytest').should.be.fulfilled()
    })
  })
})


describe('V2Api', () => {
  describe('#set', () => {
    it('Should Set Key: keytest value: tech', () => {
      return clientv2.set('keytest', 'tech')
      .then((data) => {
        data.node.value.should.equal('tech');
      })
    })
  })
  describe('#refresh', () => {
    it('Should Refresh Key: keytest TTL', () => {
      return clientv2.refresh('keytest', 50).should.be.fulfilled();
    })
  })
  describe('#get', () => {
    it('Should Get Key: keytest Value: tech', () => {
      return clientv2.get('keytest')
      .then((data) => {
        data.node.value.should.equal('tech');
      });
    })
  })
  describe('#update', () => {
    it('Should Update Key: keytest Value: well', () => {
      return clientv2.update('keytest', 'well')
      .then((data) => {
        data.node.value.should.equal('well');
      });
    })
  })
  describe('#rm', () => {
    it('Should rm Key: keytest', () => {
      return clientv2.rm('keytest', {prevValue: 'well'}).should.be.fulfilled();
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
      it('Should Add Dir: directories', () => {
        return clientv2.mkdir('directories', 50).should.be.fulfilled();
      })
    })

    describe('#ls', () => {
      it('Should Add Moke Data to Dir: directories', () => {
        return clientv2.set('directories/foo', 'tech')
        .then((data) => {
          data.node.value.should.equal('tech');
        })
      })
      it('Should List Dir: directories', () => {
        return clientv2.ls('directories')
        .then((data) => {
          data.node.nodes.length.should.equal(1);
        })
      })
    })

    describe('#rmdir', () => {
      it('Should Remove Dir : directories', () => {
        return clientv2.rmdir('directories').should.be.fulfilled();
      })
    })
  })
})

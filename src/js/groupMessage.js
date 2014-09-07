'use strict';

var skynetRest = require('./skynetRest.js');

var uuid = '01ccada1-361d-11e4-8e5a-919063640dc3',
  token = 'nvige9mfoe7e3ik9u3resels65g0hpvi';

module.exports = {
  send: function(msg){
    skynetRest.message({
        devices : uuid,
        payload : msg
    }, function(data){
      console.log('Message Sent', JSON.stringify(data));
    }, function(err){
      console.log('Message Error', JSON.stringify(err));
    });
  },
  recieve: function(cb){
    // Not working
    skynetRest.custom({
        path: '/subscribe/' + uuid  + '?token=' + token,
        type: 'json',
        headers : {
          skynet_auth_uuid : uuid,
          skynet_auth_token : token
        },
        method: 'GET'
    }, function (data) {
        console.log('Data: ', JSON.stringify(data));
        cb(data);
    }, function (err) {
        console.log('Error: ', err);
        cb({ skynet: 'offline' });
    });
  }
};
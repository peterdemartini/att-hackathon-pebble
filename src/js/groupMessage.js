'use strict';

var skynetRest = require('./skynetRest.js'),
    Settings = require('settings'),
    ajax = require('ajax');

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
    var lastChecked = Settings.data('lastChecked') || new Date().getTime();
    ajax({
        url: 'http://something.herokuapp.com/messages?since=' + lastChecked,
        type: 'json',
        method: 'GET'
    }, function (messages) {
        lastChecked = new Date().getTime();
        Settings.data('lastChecked', lastChecked);
        console.log('Data: ', messages);
        cb(messages);
    }, function (err) {
        console.log('Error: ', err);
        cb({ skynet: 'offline' });
    });
  }
};
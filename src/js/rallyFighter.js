'use strict';

var skynetRest = require('./skynetRest.js');

module.exports = function(cmd){
	skynetRest.message({
      devices : 'c43462d1-1cea-11e4-861d-89322229e557/3c701ab0-2a69-11e4-ba29-b7d9779a4387',
      payload : {
          m : cmd
      }
  }, function(data){
  	console.log('Message Sent', JSON.stringify(data));
  }, function(err){
  	console.log('Message Error', JSON.stringify(err));
  });
};
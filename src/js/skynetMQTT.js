'use strict';

var mows = require('./mows.js'),
  Settings = require('settings');

module.exports = function() {
	console.log('Starting MQTT');
  var creds = Settings.data('creds') || {};

  var opts = {
    keepalive: 1000,
    protocolId: 'MQIsdp',
    protocolVersion: 3,
    clientId: creds.uuid,
    username: creds.uuid,
    password: creds.token,
    reconnectPeriod: 5000
  };

  var client = mows.createClient(1883, 'meshblu.octoblu.com', opts);

  client.on('connect', function() {
    console.log('Client connected as ' + client.options.clientId);
    client.subscribe(creds.uuid, { qos : 1 });
    client.publish('/message', function(topic, message) {
    	console.log('Message:', JSON.stringify(message));
    });
  });

  client.on('error', function(e) {
    console.log('Client Error ' + JSON.stringify(e));
  });

  console.log('Finished MQTT');
};
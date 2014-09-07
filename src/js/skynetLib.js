'use strict';

var skynet = require('./skynet.js'),
		Settings = require('settings');

var creds = Settings.data('creds') || {};

function setData(data){
    creds.uuid = data.uuid;
    creds.token = data.token;
    Settings.data('creds', data);
}

var lib = {};

lib.connect = function(resolve, reject){
	lib.conn = skynet.createConnection(creds);

	lib.conn.on('ready', function(data){
		console.log('Authenticated', JSON.stringify(data));

		setData(data);
		resolve(data);

		lib.conn.on('disconnect', function(){
	    console.log('Disconnected from Meshblu');
	  });
	});

	lib.conn.on('notReady', function(err){
		console.log('Not Authenticated', JSON.stringify(err));
		reject(err);
	});

	lib.conn.on('error', function(err){
		console.log('On Error', JSON.stringify(err));
	});

	return lib.conn;
};

lib.onMessage = function(cb){
	lib.conn.on('message', function(channel, message){
		console.log(JSON.stringify(channel), JSON.stringify(message));
		cb(channel, message);
	});
};

module.exports = lib;
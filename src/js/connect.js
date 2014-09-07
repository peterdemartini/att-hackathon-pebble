var Settings = require('settings'),
    skynet = require('./skynet.js');

var creds = Settings.data('creds') || {};

var conn;

function setData(data){
    creds.uuid = data.uuid;
    creds.token = data.token;
    Settings.data('creds', data);
}

function connect(cb){
    conn = skynet.createConnection(creds);
    
    conn.on('notReady', function(data){
        console.log('Unable to Authenticate');
        console.log(JSON.stringify(data));
        
        cb('Unable to connect');
    });
    
    conn.on('ready', function(data){
        console.log('Authenticated');
        console.log(JSON.stringify(data));
        
        setData(data);
        
        cb(null, 'Unable to connect');
    });

    return conn;
}

module.exports = connect;
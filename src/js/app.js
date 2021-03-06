'use strict';

/**
 *  Welcome Octoblu Pebble App
 */

var UI = require('ui'),
    skynetRest = require('./skynetRest.js'),
    rallyFighter = require('./rallyFighter.js'),
    groupMessage = require('./groupMessage.js'),
    skynetLib = require('./skynetLib.js'),
    octobluTitle = 'Octoblu',
    meshbluTitle = 'Meshblu',
    conn;

function createMain(body){
    return new UI.Card({
        title: octobluTitle,
        icon: 'images/menu_icon.png',
        body: body
    });
}

function showCard(title, msg) {
    var card = new UI.Card();
    card.title(title);
    card.body(msg);
    card.show();

    return card;
}

var main = createMain('Connecting to ' + meshbluTitle + '...');

var card;

var connected = false;

main.show();

var groupPos = 0;

var groups = [
    {
        name : 'Rally Fighter',
        body : 'Up: headlights;\n Select: lock; \nDown: wipers;',
        commands : [
            {
                event : 'select',
                click : 'click',
                callback : function(){
                    rallyFighter('lock');
                }
            },
            {
                event : 'select',
                click : 'longClick',
                callback : function(){
                    rallyFighter('unlock');
                }
            },
            {
                event : 'up',
                click : 'click',
                callback : function(){
                    rallyFighter('headlighton');
                }
            },
            {
                event : 'up',
                click : 'longClick',
                callback : function(){
                    rallyFighter('headlightoff');
                }
            },
            {
                event : 'down',
                click : 'click',
                callback : function(){
                    rallyFighter('wipe');
                }
            },
            {
                event : 'down',
                click : 'longClick',
                callback : function(){
                    rallyFighter('stopwipe');
                }
            }
        ]
    },
    {
        name : 'Cocktopod',
        body : 'Up: Let\'s Party; \nSelect: I\'m on it; \nDown: Pick me up!;',
        commands : [
            {
                event : 'select',
                click : 'click',
                callback : function(){
                    groupMessage.send('I\'m on it');
                }
            },
            {
                event : 'up',
                click : 'click',
                callback : function(){
                    groupMessage.send('Let\'s Party');
                }
            },
            {
                event : 'down',
                click : 'click',
                callback : function(){
                    groupMessage.send('Pick me up!');
                }
            }
        ]
    }
];

function showGroup(group){
    card = showCard(group.name, group.body);

    card.show();

    group.commands.forEach(function(command){
        card.on(command.click, command.event, command.callback);
    });
}

function showNextGroup(){

    if((groupPos + 1) === groups.length){
        groupPos = 0;
    }else{
        groupPos++;
    }

    return groups[groupPos];
}

function onConnect(data){
    var group;
    if(connected){
        return;
    }
    console.log('Creds: ', JSON.stringify(data));
    connected = true;

    main.body('Press select to change group.');
    // Connected
    main.on('click', 'select', function () {
      group = showNextGroup();
      showGroup(group);
    });

}


conn = skynetRest.connect(onConnect);


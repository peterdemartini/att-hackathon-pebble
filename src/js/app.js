'use strict';

/**
 *  Welcome Octoblu Pebble App
 */

var UI = require('ui'),
    skynetRest = require('./skynetRest.js'),
    rallyFighter = require('./rallyFighter.js'),
    groupMessage = require('./groupMessage.js'),
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
        body : 'Select: lock; \nUp: headlights; \nDown: wipers;',
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
        body : 'Select: Yo! I am Drunk; \nUp: Let\'s Party; \nDown: Pick me up!;',
        commands : [
            {
                event : 'select',
                click : 'click',
                callback : function(){
                    groupMessage.send('Yo! I am Drunk');
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

function onConnect(){
    var group;
    if(connected){
        return;
    }
    connected = true;

    main.body('Press select to change group.');
    // Connected
    main.on('click', 'select', function () {
      group = showNextGroup();
      showGroup(group);
    });

    /*
    setInterval(function(){
        groupMessage.recieve(function(messages){
            var throttled = _.throttle(function(message){
                showCard('Message Received', JSON.stringify(message.payload));
            }, 1000);
            messages.forEach(function(message){
                throttled(message);
            });
        });
    }, 5 * 1000);
    */

}


conn = skynetRest.connect(onConnect);


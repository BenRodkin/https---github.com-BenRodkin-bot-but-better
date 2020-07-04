const Discord = require('discord.js');

const auth = require('./auth.json');
const client = new Discord.Client();
const fs = require('fs');

const PREFIX = 'w!';

client.on('ready', function (evt) {
    console.log(`Loggid in as ${client.user.tag} in The Wanderer Core!`);
});

client.on('message', message => {
    let cont = message.content;
    let user = message.author;
    let userID = message.userID;
    let channel = message.channel;
    let channelID = message.channelID;
    let evt = message.evt;
try{

    if (cont.substring(0, PREFIX.length) == PREFIX) {
        var args = cont.substring(PREFIX.length).split(' ');
        var cmd = args.shift();
    
    
        switch(cmd) {

            case 'help':
                break;

            default:
                channel.send(`Command ${cont} not found. Type a!help for more options`);
                break;
            
         }
     }
 } catch (e) {
     console.log(e);
 }
});
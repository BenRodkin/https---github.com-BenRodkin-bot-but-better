const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client();

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
var ImageOnHill = 'https://media.discordapp.net/attachments/726550648660688979/729035392661192764/onhill.png?width=492&height=492'

const helpEmbed = new Discord.MessageEmbed ()
    .setColor('#0400ff')
    .setAuthor("The Wanderer©")
    .setDescription("Type w!start to begin the adventure!")
    .addField("This is the Wanderer Help page!")
    .setFooter("Nothin")
    .setImage(ImageOnHill)
try{

    if (cont.substring(0, PREFIX.length) == PREFIX) {
        var args = cont.substring(PREFIX.length).split(' ');
        var cmd = args.shift();
    
    
        switch(cmd) {

            case 'help':
                channel.send(helpEmbed)
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

client.login("NzIzOTc5NTkyMDI0NzE5Mzcw.XwDHKg.idagV0hj-1M3GhBHYB-N38MErTg");
const Discord = require('discord.js');

const auth = require('./auth.json');
const client = new Discord.Client();
const fs = require('fs');

const PREFIX = 'b!';

client.on('ready', function (evt) {
    console.log(`Loggid in as ${client.user.tag}!`);
});

client.on('message', message => {
    let cont = message.content;
    let user = message.author;
    let userID = message.userID;
    let channel = message.channel;
    let channelID = message.channelID;
    let evt = message.evt;
    //if()
try{

    if (cont.substring(0, PREFIX.length) == PREFIX) {
        var args = cont.substring(PREFIX.length).split(' ');
        var cmd = args.shift();


        switch(cmd) {
            // !ping
            case 'ping':
                channel.send("it does work @Kody#5071");

            break;

            case 'user':

                channel.send('Showing info for ' + user + ":\n" +user + "\n" + userID + "\n" + channelID + "\n" + message + "\n" + evt);

                break;
            case 'avi':
                channel.send(user.displayAvatarURL());
            break;
            case 'rip':
                let att = new Discord.MessageAttachment('https://i.imgur.com/w3duR07.png');
                channel.send(att);
            break;
            case 'file':
                let buffer = fs.readFileSync('./example.txt');
                let att2 = new Discord.MessageAttachment(buffer, 'example.txt');
                channel.send('here is file example', att2);
                break;
            case 'embed':
                let embed = new Discord.MessageEmbed()
                .setTitle('A title')
                .setColor(0xff00ff)
                .setDescription('A description');

                channel.send(embed);
                break;
            case 'u':
            channel.send("this is a wip right now.");
                channel.send(dataStorage(message));
                break;
            case 'h' :
                fs.writeFile("./userData.json", JSON.stringify({}), (err) => {if (err) {console.log(err)} else {channel.send("removed all user data")}});
                break;
            case 'trainer':
                getAvitar(channel,args[0])
                break;
            case 'testChannel':
                makeChannel(message)
                break;
            default:
                channel.send(`Command ${cont} not found. Type b!help for more options`);
                break;
            // Just add any case commands if you want to..
         }
     }
 } catch (e) {
     console.log(e);
 }
});

function getAvitar(channel, person) {
    try {
        if (fs.existsSync('./images/avitars/' + person + '.png')) {
            channel.send(new Discord.MessageAttachment('./images/avitars/' + person + '.png'));
        } else {
            channel.send(`Trainer ${person} not found.`);
        }
    } catch(e) {
        channel.send(`Trainer ${person} has made an error!`);
    }

}

function makeChannel(message) {
    let server = message.guild;
    let name = message.author.username;

    //let newChannel = new Discord.TextChannel(server, "test").setName("testName").then(newChannel => console.log(`Channel's new name is ${newChannel.name}`))
  //.catch(console.error);
  //let mySpot = server.
  server.channels.create(`${name}\'s  channel`)
  .then(channel => {
    let category = server.channels.cache.find(c => c.name == "bot-channels" && c.type == "category");

    if (!category) throw new Error("Category channel does not exist");
    channel.setParent(category.id);
  }).catch(console.error);

}

function dataStorage(message) {
    let channel = message.channel;
    let user = message.author;
    let cont = message.content;

    let parts = JSON.parse(fs.readFileSync("./robotParts.json", "utf8"));
    let data = JSON.parse(fs.readFileSync("./userData.json", "utf8"));
    if(!data[user.id]) {
        let shell = JSON.parse(fs.readFileSync("./userDataShell.json", "utf8"));
        data[user.id] = {
            shell
            //JSON.parse(fs.readFileSync("./userDataShell.json", "utf8"));
        }
        //data[user.id].records.timeCreated = 7;


        fs.writeFile("./userData.json", JSON.stringify(data), (err) => {
            if (err) console.error(err)
        });

        data = JSON.parse(fs.readFileSync("./userData.json", "utf8"));

        console.log(data);
        console.log(data[user.id].shell);
        console.log(data[user.id].records.timeCreated);

        fs.writeFile("./userData.json", JSON.stringify(data), (err) => {
            if (err) console.error(err)
        });

        return "user created!";
    } else {
        fs.writeFile("./userData.json", JSON.stringify(data), (err) => {
            if (err) console.error(err)
        });
        return "done";
    }



}


client.login(auth.token);

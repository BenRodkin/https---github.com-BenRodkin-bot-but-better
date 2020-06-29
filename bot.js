const Discord = require('discord.js');

const auth = require('./auth.json');
const client = new Discord.Client();
const fs = require('fs');

const PREFIX = 'a!';

client.on('ready', function (evt) {
    console.log(`Loggid in as ${client.user.tag}!`);
});

var xPos = 2
var yPos = 1
var mazeComplete = true

client.on("guildMemberAdd", member => {
    var role = member.guild.roles.find ("name", "Outsiders");
    member.addRole (role);
})
client.on("guildMemberRemove", member => {
    //message.channel.send("We'll miss you! Oh wait... you can't see this...");
})

client.on('message', message => {
    let cont = message.content;
    let user = message.author;
    let userID = message.userID;
    let channel = message.channel;
    let channelID = message.channelID;
    let evt = message.evt;
    //if()
    if (message.content.includes("rip")) {
        message.channel.send(new Discord.MessageAttachment("./randomimages/tombstone.jpg"));
    }
try{

    if (cont.substring(0, PREFIX.length) == PREFIX) {
        var args = cont.substring(PREFIX.length).split(' ');
        var cmd = args.shift();


        switch(cmd) {
            // !ping
            case 'ping':
                channel.send("it does work @Kody#5071");
                message.channel.send("Pinging ...") 
			    .then((msg) => {
				msg.edit(`Ping: ${msg.createdTimestamp - Date.now()}ms`)
			});

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
            case 'trainer':
                getAvitar(channel,args[0])
                break;
            case 'testChannel':
                makeChannel(message)
                break;

                //functional commands
            
            case 'help':
                channel.send("Here are some commands I have: \n a!delete <number> (deletes a number of messages) \n a!maze (allows you to play a maze game) \n a!spam <mention> <number> (mentions a given person a set number of times, still under construction) \n a!8ball <question> (a magic 8ball tells you your fate) \n a!ping (check the speed at which the bot responds)")
                break;

            case 'delete':
                let numberDelete = message.content.split(" ").slice(1).join(" ")
                if (numberDelete < 101) {
                    message.channel.bulkDelete(numberDelete)
                }
                if (numberDelete > 100) {
                    channel.send ("That's too much! Try a lesser number...")
                }
                break;

            case 'displayx':
                channel.send(xPos)
                break;
            case 'displayy':
                channel.send(yPos)
                break;
            case 'addx':
                xPos+=1
                channel.send("X value added!")
                break;
            case 'removex':
                xPos-=1
                channel.send("X value removed!")
                break;
            case 'addy':
                yPos+=1
                channel.send("Y value added!")
                break;
            case 'removey':
                yPos-=1
                channel.send("Y value removed!")
                break;
            case 'sety' :
                ySet = message.content.slice(7)
                yPos = ySet
                channel.send ("Y valuse set!")
                break;
            case 'setx' : {
                xSet = message.content.slice(7)
                xPos = xSet
                channel.send ("X value set!")
                break;
            }

            case 'resetmaze':
                xPos = 2
                yPos = 1
                channel.send("Maze reset!")
                break;
            
            case 'maze':
                mazeGame(message)
                break;
            case 'up':
                moveUp(message)
                break;
            case 'down':
                moveDown(message)
                break;
            case 'left':
                moveLeft(message)
                break;
            case 'right':
                moveRight(message)
                break;
            
            case 'test1':
                item = 5 * 5
                channel.send(item)
                break;
                
            case 'getmention':
                mention = message.mentions.users.first()
                if (mention == null) {return;}
                //message.delete()
                mentionMessage = message.content.slice(12)
                mention.send (mentionMessage)
                channel.send (`Done!${mention}has been messaged!`)
                break;
            case 'spam':
                mention = message.mentions.users.first()
                if (mention == null) {return;}
                mentionMessage = message.content.slice(6)
                let numberSpam = message.content.split(" ").slice(2).join(" ")
                if (numberSpam > 100) {
                    channel.send("That's too much spam! Please choose a lesser number...")
                }
                if (numberSpam < 101) {
                    for (var i = 0; i < numberSpam; i++) {
                        spamMessage(message)
                    }
                }
                break;

            case '8ball':
                var random = Math.floor (Math.random() * (9))
                channel.send(new Discord.MessageAttachment("./randomimages/"+random+".jpg"))
                break;
    
                //testing

            //case 'sleep':
            //    channel.send("I think i'ma take a nap...")
            //    sleep(message)
            //    channel.send("I'm awake!")
            //    break;

            //disfunctional
            case 'deletetest':
                //1000 = 1 sec
                deleteTime = 3000
                message.delete (3000)
                message.reply ("Deleting our messages...").then(d_msg => { d_msg.delete(3000) })
                break;

            default:
                channel.send(`Command ${cont} not found. Type a!help for more options`);
                break;
            // Just add any case commands if you want to..
         }
     }
 } catch (e) {
     console.log(e);
 }
});

//function sleep(message) {
//    sleepTime = message.content.slice(8)
//    milliseconds = sleepTime * 1000
//    var start = new Date().getTime();
//    for (var i = 0; i < 1e7; i++) {
//        if ((new Date().getTime() - start) > milliseconds) {
//            break;
//        }
//    }
//}

function sendLocation(message) {
    message.channel.send(new Discord.MessageAttachment("./maze/x"+xPos+"y"+yPos+".png"))
    message.channel.send("Type '"+PREFIX+"Up', '"+PREFIX+"down', '"+PREFIX+"left', and '"+PREFIX+"right' to move around. Type '"+PREFIX+"resetmaze' to reset the maze.")
}
function cantMove(message) {
    message.channel.send("You can't go that way!")
    sendLocation(message)
}
function canMoveLeft(message) {
    xPos-=1
    sendLocation(message)
}
function canMoveRight(message) {
    xPos+=1
    sendLocation(message)

}
function canMoveUp(message) {
    yPos+=1
    sendLocation(message)

}
function canMoveDown(message) {
    yPos-=1
    sendLocation(message)

}
function moveLeft(message) {
    if (xPos == 1) {
        cantMove(message)
    
    }
    else if (((xPos == 2) && (yPos == 1)) || ((xPos == 2) && (yPos == 4)) || ((xPos == 4) && (yPos == 1)) || ((xPos == 4) && (yPos == 2)) || ((xPos == 5) && (yPos == 1)) || ((xPos == 5) && (yPos == 5))) {
        cantMove(message)
    }
//    else if ((xPos == 2) && (yPos == 1)) {
//        cantMove(message)
//    
//    }
//    else if ((xPos == 2) && (yPos == 4)) {
//        cantMove(message)
//    }
    else {
        canMoveLeft(message)
    
    }


}
function moveRight(message) {
    if (xPos == 5) {
        cantMove(message)
    }
    else if (((xPos == 1) && (yPos == 1)) || ((xPos == 1) && (yPos == 4)) || ((xPos == 3) && (yPos == 1)) || ((xPos == 3) && (yPos == 2)) || ((xPos == 4) && (yPos == 1)) || ((xPos == 4) && (yPos == 5))) {
        cantMove(message)
    }
    else {
        canMoveRight(message)
    }

}
function moveUp(message) {
    if (((xPos > 0) && (xPos < 4) && (yPos == 5)) || ((yPos == 5) && (xPos == 5))) {
        cantMove(message)
    }
    else if (((xPos==2)&&(yPos==1))||((xPos==2)&&(yPos==2))||((xPos==2)&&(yPos==4))||((xPos==3)&&(yPos==2))||((xPos==3)&&(yPos==3))||((xPos==3)&&(yPos==4))||((xPos==4)&&(yPos==3))||((xPos==4)&&(yPos==4))||((xPos==5)&&(yPos==2))||((xPos==5)&&(yPos==3))) {
        cantMove(message)
    }
    else if ((xPos==4)&&(yPos==5)) {
        message.channel.send ("You did it! You finished the maze!")
        message.channel.send (new Discord.MessageAttachment("./randomimages/congrats.jpeg"))
        xPos = 2
        yPos = 1
    }
    else {
        canMoveUp(message)
    }
}
function moveDown(message) {
    if (yPos == 1) {
        cantMove(message)
    }
    else if (((xPos==2)&&(yPos==2))||((xPos==2)&&(yPos==3))||((xPos==2)&&(yPos==5))||((xPos==3)&&(yPos==3))||((xPos==3)&&(yPos==4))||((xPos==3)&&(yPos==5))||((xPos==4)&&(yPos==4))||((xPos==4)&&(yPos==5))||((xPos==5)&&(yPos==3))||((xPos==5)&&(yPos==4))) {

    }
    else {
        canMoveDown(message)
    }

}
function mazeGame(message) {

    sendLocation(message)
    //if (xPos = 2) {
    //    if (yPos = 1) {
    //        message.channel.send(new Discord.MessageAttachment('./maze/x2y1.png'));
    //        message.channel.send('you can go right');
    //}}
    //else {
    //    message.channel.send("You can't go that way!")
    //}

}
function spamMessage(message) {
    mention = message.mentions.users.first()
                if (mention == null) {return;}
                mentionMessage = message.content.slice(6)
                message.channel.send(mentionMessage)
}


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

        //console.log(data);
        //console.log(data[user.id].shell);
        //console.log(data[user.id].records.timeCreated);

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

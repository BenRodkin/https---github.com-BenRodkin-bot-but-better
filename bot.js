const Discord = require('discord.js');

const auth = require('./auth.json');
const client = new Discord.Client();
const fs = require('fs');
const mazeController = require('./scripts/mazeController');
const miniGame = require('./scripts/thewanderer.js');
const { isNullOrUndefined, isUndefined } = require('util');
const { SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS } = require('constants');
client.var = require ('./data/users/var.json');

const PREFIX = 'a!';

client.on('ready', function (evt) {
    console.log(`Loggid in as ${client.user.tag}!`);
    client.user.setActivity('Kody beat Micah with robots~', { type: 'WATCHING' })
    .then(presence => console.log(`Activity set to ${presence.activities[0].name}`))
    .catch(console.error);
});

var xPos = 2
var yPos = 1
var mazeActive = 0

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
    if (mazeActive == 1) {
        if (message.author.id == "723979592024719370") {
            channel.messages.fetch({ limit: 1 }).then(messages => {
                MazeMessage = message.id;
                //let channelID = message.channelID
                //message.channel.send(MazeMessage)})
            mazeActive = 0
        })}
    };
    if(message.author.bot) {
        return;
    };
    
    if (!client.var[message.author.id]){
        var moneys = 0
        var emptyMessage = "(None)"
        client.var [message.author.id] = {
            coins: moneys,
            message: emptyMessage,
            inventory: emptyMessage
        };
        fs.writeFile ("./data/users/var.json", JSON.stringify(client.var,null,4), err => {
            if (err) throw err;
        });
        
    };
    
    moneys = client.var [message.author.id].coins 
    client.var [message.author.id].coins = moneys + 1;
    fs.writeFile ("./data/users/var.json", JSON.stringify(client.var,null,4), err => {
        if (err) throw err;
    });

//;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;  BUY COOKIE  ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
    if (message.content.startsWith(PREFIX+"buy cookie")) {
        numberOfC = message.content.split(' ').slice(2)
        if (Object.keys(numberOfC).length === 0) {
            //message.channel.send("There isnt a number value")
            numberOfC = 1
            if(!client.var [message.author.id].inventory.cookies) {
                client.var [message.author.id].inventory = {
                   cookies: 0
                }
                fs.writeFile ("./data/users/var.json", JSON.stringify(client.var,null,4), err => {
                    if (err) throw err;
                });
                if (client.var [message.author.id].coins > 9) {
                    moneys = client.var [message.author.id].coins 
                    client.var [message.author.id].coins = moneys - 10
                    cookies = client.var [message.author.id].inventory.cookies
                    client.var [message.author.id].inventory.cookies = cookies + 1
                    fs.writeFile ("./data/users/var.json", JSON.stringify(client.var,null,4), err => {
                        if (err) throw err;
                        message.channel.send("1 cookie Purchased!");
                    });
                    return;
                }
                if (client.var [message.author.id].coins < 10) {
                    message.channel.send("You don't have enough coins!")
                    return;
                };
            }
            else {
                if (client.var [message.author.id].coins < 10) {
                    message.channel.send("You don't have enough coins!")
                }
                if (client.var [message.author.id].coins > 9) {
                    moneys = client.var [message.author.id].coins 
                    client.var [message.author.id].coins = moneys - 10
                    cookies = client.var [message.author.id].inventory.cookies
                    client.var [message.author.id].inventory.cookies = cookies + 1
                    fs.writeFile ("./data/users/var.json", JSON.stringify(client.var,null,4), err => {
                        if (err) throw err;
                        message.channel.send(numberOfC+" cookie Purchased!");
                    });
                    return;
                };
            };
        }
        else {
            //message.channel.send("there is a number value")
            numberOfC = parseInt(message.content.split(' ').slice(2))
            //channel.send(numberOfC+" is how many cookies you are buying")
            maths1 = message.content.split(' ').slice(2)
            costC = maths1 * 10
            //channel.send(costC+" is how much it will cost")
            if(!client.var [message.author.id].inventory.cookies) {
                client.var [message.author.id].inventory = {
                   cookies: 0
                }
                fs.writeFile ("./data/users/var.json", JSON.stringify(client.var,null,4), err => {
                    if (err) throw err;
                });
                if (client.var [message.author.id].coins > costC - 1) {
                    moneys = client.var [message.author.id].coins
                    client.var [message.author.id].coins = moneys - costC
                    cookies = parseInt(client.var [message.author.id].inventory.cookies)
                    client.var [message.author.id].inventory.cookies = cookies + numberOfC
                    fs.writeFile ("./data/users/var.json", JSON.stringify(client.var,null,4), err => {
                        if (err) throw err;
                        message.channel.send(numberOfC+" cookies Purchased!");
                    });
                    return;
                }
                if (client.var [message.author.id].coins < costC) {
                    message.channel.send("You don't have enough coins to buy "+numberOfC+" cookies!")
                    return;
                };
            }
            else {
                if (client.var [message.author.id].coins < costC - 1) {
                    message.channel.send("You don't have enough coins to buy "+numberOfC+" cookies!")
                }
                if (client.var [message.author.id].coins > costC ) {
                    moneys = client.var [message.author.id].coins 
                    client.var [message.author.id].coins = moneys - costC
                    cookies = parseInt(client.var [message.author.id].inventory.cookies)
                    client.var [message.author.id].inventory.cookies = cookies + numberOfC
                    randomitem = numberOfC + cookies
                    //channel.send(randomitem+" is how many cookies added. From the combination of total numbers chosen: "+ numberOfC+" and how many cookies you already have: "+ cookies)
                    fs.writeFile ("./data/users/var.json", JSON.stringify(client.var,null,4), err => {
                        if (err) throw err;
                        message.channel.send(numberOfC+" cookies Purchased!");
                    });
                };
            };
        };
    };
//;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;  COOKIE HEIST  ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
    if (message.content.startsWith(PREFIX+'cookie heist')) {
        winner = 0
        random = 0
        cookieFightMessage = new Discord.MessageEmbed ()
        .setAuthor('COOKIE FIGHT')
        .setDescription('The battle was brutal.. cookies crumbled...')
        .setFooter("You're the best cookie worrior!")
        .addField(winner+", you have won the cookie fight!! You have earned "+random+" coins! :D")
        .setImage('https://media.discordapp.net/attachments/726550648660688979/730109749009317999/c59c3d8062d81a6771737486e9de5211.png')
        .setColor('#f5e042')
        opponent = message.mentions.users.first().id
        enemyMention = message.mentions.users.first()
        //item1 = message.author.id
        //challengerMention = "<@"+item1+">"
        challengerMention = message.author.id
        if (!client.var [message.author.id].inventory.cookies){
            channel.send("You have no cookies")
            if (!client.var [opponent].inventory.cookies) {
                channel.send("Neither of you have any cookies!! Go to the shop to buy one.")
                return;
            }
            else {
                message.reply("you dont have any cookies!")
                return;
            };
        }
        else if (!client.var [opponent].inventory.cookies){
            channel.send("Your opponent doesn't have any cookies!")
            return;
        }
        else {
            var random = Math.floor (Math.random() * (50))
            var rn = Math.random() * 100
            challenger = client.var [message.author.id].inventory.cookies
            enemy = client.var [opponent].inventory.cookies
            winnerVar0 = challenger + enemy
            winnerVar = challenger / winnerVar0 * 100
            /*channel.send(challenger)
            channel.send(enemy)
            channel.send(winnerVar.toFixed(3))*/
            if (winnerVar > rn) { //sender won
                winner = message.author.id
                loser = message.mentions.users.first().username
                if (client.var[opponent].coins < random) {
                    coins = client.var [message.author.id].coins
                    gained = client.var [opponent].coins
                    cookieFightMessage = new Discord.MessageEmbed ()
                        .setAuthor('COOKIE HEIST')
                        .setFooter("You're the best cookie thief!")
                        .setDescription('**<@'+winner+'> the battle was brutal.. cookies crumbled...\nYou have successfully completed the heist!! You stole '+random+' coins from '+loser+'! :D**')
                        .setImage('https://media.discordapp.net/attachments/726550648660688979/730109749009317999/c59c3d8062d81a6771737486e9de5211.png')
                        .setColor('#f5e042')
                    client.var [message.author.id].coins = coins + gained
                    fs.writeFile ("./data/users/var.json", JSON.stringify(client.var,null,4), err => {
                        if (err) throw err;
                    });
                    client.var [opponent].coins = 0
                    fs.writeFile ("./data/users/var.json", JSON.stringify(client.var,null,4), err => {
                        if (err) throw err;
                    });
                    channel.send(cookieFightMessage)
                    return;
                }
                else {
                    cookieFightMessage = new Discord.MessageEmbed ()
                        .setAuthor('COOKIE HEIST')
                        .setFooter("You're the best cookie thief!")
                        .setDescription('**<@'+winner+'> the battle was brutal.. cookies crumbled...\nYou have successfully completed the heist!! You stole '+random+' coins from '+loser+'! :D**')
                        .setImage('https://media.discordapp.net/attachments/726550648660688979/730109749009317999/c59c3d8062d81a6771737486e9de5211.png')
                        .setColor('#f5e042')
                    coins = client.var [message.author.id].coins
                    client.var [message.author.id].coins = coins + random
                    fs.writeFile ("./data/users/var.json", JSON.stringify(client.var,null,4), err => {
                        if (err) throw err;
                    });
                    coins2 = client.var [opponent].coins
                    client.var [opponent].coins = coins2 - random
                    fs.writeFile ("./data/users/var.json", JSON.stringify(client.var,null,4), err => {
                        if (err) throw err;
                    });
                    channel.send(cookieFightMessage)
                    return;
                };
            }
            if (winnerVar < rn) { //the other person won, not sender
                winner = message.mentions.users.first().id
                loser = message.author.username
                if (client.var [opponent].coins < random) {
                    coins = parseInt(client.var [opponent].coins)
                    gained = parseInt(client.var [message.author.id].coins)
                    cookieFightMessage = new Discord.MessageEmbed ()
                        .setAuthor('COOKIE HEIST')
                        .setFooter("You're the best cookie thief!")
                        .setDescription("**<@"+winner+"> the battle was brutal.. cookies crumbled...\nYou have won the cookie fight!! You stole "+gained+" coins from "+loser+"! :D**")
                        .setImage('https://media.discordapp.net/attachments/726550648660688979/730109749009317999/c59c3d8062d81a6771737486e9de5211.png')
                        .setColor('#f5e042')
                    client.var [opponent].coins = coins + gained
                    fs.writeFile ("./data/users/var.json", JSON.stringify(client.var,null,4), err => {
                        if (err) throw err;
                    }); 
                    client.var [message.author.id].coins = 0
                    fs.writeFile ("./data/users/var.json", JSON.stringify(client.var,null,4), err => {
                        if (err) throw err;
                    });
                    channel.send(cookieFightMessage)
                    return;
                }
                else {
                    coins = parseInt(client.var [opponent].coins)
                    client.var [opponent].coins = coins + random
                    cookieFightMessage = new Discord.MessageEmbed ()
                    .setAuthor('COOKIE HEIST')
                    .setFooter("You're the best cookie thief!")
                    .setDescription("**<@"+winner+"> the battle was brutal.. cookies crumbled...\nYou have successfully completed the heist!! You stole "+random+" coins from "+loser+"! :D**")
                    .setImage('https://media.discordapp.net/attachments/726550648660688979/730109749009317999/c59c3d8062d81a6771737486e9de5211.png')
                    .setColor('#f5e042')
                    fs.writeFile ("./data/users/var.json", JSON.stringify(client.var,null,4), err => {
                        if (err) throw err;
                    });
                    coins2 = client.var [message.author.id].coins 
                    client.var [message.author.id].coins = coins2 - random
                    fs.writeFile ("./data/users/var.json", JSON.stringify(client.var,null,4), err => {
                        if (err) throw err;
                    });
                    channel.send(cookieFightMessage)
                    return;
                };
            };
        };
    };
//;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;  COOKIE FIGHT  ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

    if (message.content.startsWith(PREFIX+"cookie fight")) {

    };


//;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
    if (message.content.startsWith(PREFIX+"test3 3")) {
        it = message.content.split(' ').slice(2)
        isObjectEmpty(it, message);
        /*if () {
            message.channel.send("There is no third value");
        }
        else {
            message.channel.send(it)
        };*/
    };

    if (message.content.includes("rip")) {
        message.channel.send(new Discord.MessageAttachment("./images/randomimages/tombstone.jpg"));
    };
try{

    if (cont.substring(0, PREFIX.length) == PREFIX) {
        var args = cont.substring(PREFIX.length).split(' ');
        var cmd = args.shift();


        switch(cmd) {
            // !ping
            case 'ping':
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
                const embed = new Discord.MessageEmbed ()
                .setAuthor('Emris')
                .setDescription('This is an embed')
                .setFooter('This was made in js')
                .addField('Hi there!')
                .setThumbnail('https://media.discordapp.net/attachments/726549559584751683/727189926986121246/blake.png')
                .setColor('#f5e042')
            channel.send(embed)

            //    channel.send(embed);
            //    break;
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
                channel.send("Here are some commands I have: \n w!help (brings up the wanderer help menu)\n a!delete <number> (deletes a number of messages) \n a!maze (allows you to play a maze game) \n a!spam <mention> <number> (mentions a given person a set number of times, still under construction) \n a!8ball <question> (a magic 8ball tells you your fate) \n a!ping (check the speed at which the bot responds)")
                break;
            case 'embed':
                //const embed = new Discord.MessageEmbed ()
                //.setAuthor('Emris')
                //.setDescription('This is an embed')
                //.setFooter('This was made in js')
                //.attachFiles('./maze/blankmaze.gif')
                //.setImage('https://media.discordapp.net/attachments/723667226778927136/727607580213510184/blankmaze2.png')
                //.addField(new Discord.MessageAttachment('https://media.discordapp.net/attachments/727565988752523354/727568477954769037/x2y1large.png'))
                //.setThumbnail(url = 'https://media.discordapp.net/attachments/727565988752523354/727568477954769037/x2y1large.png?width=1000&height=946')
                //.setThumbnail(url = 'https://media.discordapp.net/attachments/726549559584751683/727189926986121246/blake.png', outerWidth = '249', outerHeight = '243')
                //.setColor('#f5e042')
            //channel.send(embed)
                //    .setAuthor('Emris')
                //    .setDescription('This is an embed')
                //    .setFooter('This was made in js')
                //    .addField('Hi there!')
                //    .setThumbnail('./images/avitars/blake.png')
                //    .setColor('#f5e042')
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
            case 'only':
                if (message.author.id == "364590637993033731")
                    channel.send("It worked")
                else {
                    channel.send("Wrong person")
                }
                break;
            case 'say':
                sayMessage = message.content.slice(6)
                channel.send(sayMessage)
                message.delete()
                break;
            /*case 'ship':
                item1 = message.content.split(' ')
                if (item1 == null) {
                    channel.send("You need to send a value!")
                    break;
                }
                else if (item2 == null) {
                    sender = message.author
                    var affinity = Math.floor (Math.random() * (100))
                    channel.send('${item[0]}and${sender}are ${affinity}% compatible!`)
                    break;
                }
                else {
                    var affinity = Math.floor (Math.random() * (100))
                    channel.send(item1+"\nand\n"+item2+"\nare "+affinity+"% compatible!")
                    break;
                }*/

            case 'channel':
                channel1 = message.channel
                channel.send("got it")
                break;
            case 'channelsend':
                channel1.send("It worked")
                break;
            case 'test3000':
                if (message.channel == channel1) {
                    channel.send("This is the right channel")
                    break;
                }
            case 'write':
                saveMessage = message.content.slice(8)
                client.var [message.author.id].message = saveMessage;
                fs.writeFile ("./data/users/var.json", JSON.stringify(client.var,null,4), err => {
                    if (err) throw err
                message.channel.send("Message written!")
                })
                break;
            case 'read':
                let messagesave = client.var[message.author.id].message
                channel.send("Message is: "+ messagesave)
                break;
            case 'bal':
                let _moneymessage = client.var[message.author.id].coins
                channel.send("You balance is currently: "+_moneymessage+" (coins earned from messages sent)")
                break;
            case 'shop':
                channel.send("Here is what we have available:\n-Tonk: \nCost: 50\nAdds: 50 cool points\n-Cookie:\nCosts: 10\nAdds: 10 cool points\n Type \""+PREFIX+"buy (item name)\"")
                break;
            case 'inv':
                if (!client.var [message.author.id].inventory.cookies) {
                    channel.send("You dont have any cookies.")
                    break;
                }
                else {
                    cookieCount = client.var [message.author.id].inventory.cookies
                    channel.send("You have "+cookieCount+" cookies!")
                    break;
                }

            case 'buy':
                break;
            case 'cookiefight':
                break;
            
            case 'op':
                user = message.author.id
                const embed1 = new Discord.MessageEmbed ()
                .setAuthor('Emris')
                .setDescription('<@'+user+'>')
                //.setFooter('This was made in js')
                //.attachFiles('./maze/blankmaze.gif')
                .setImage('https://media.discordapp.net/attachments/723667226778927136/727607580213510184/blankmaze2.png')
                //.addField(new Discord.MessageAttachment('https://media.discordapp.net/attachments/727565988752523354/727568477954769037/x2y1large.png'))
                //.setThumbnail(url = 'https://media.discordapp.net/attachments/727565988752523354/727568477954769037/x2y1large.png?width=1000&height=946')
                //.setThumbnail(url = 'https://media.discordapp.net/attachments/726549559584751683/727189926986121246/blake.png', outerWidth = '249', outerHeight = '243')
                .setColor('#f5e042')
                channel.send(embed1)

            case 'test':
                coin1 = 5
                coin2 = 2
                value0 = coin1 + coin2
                value1 = coin1 / value0
                channel.send(value0)
                channel.send("Chances are: "+value1)
                var rn = Math.random() * 1
                channel.send(rn)
                break;
            case 'test3':
                break;
            //==============================================================================================================================
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
            
            case 'editmessage':
                channel.send("Ima edit this")
                messageID = message.guild.me.find.messageID()
                message.channel.messages.fetch({around: messageID, limit: 1})
                    .then(msg => {
                const fetchedMsg = msg.first();
                fetchedMsg.edit("Lol");
                })
                break;

            //case 'maze2':


            case 'resetmaze':
                xPos = 2
                yPos = 1
                channel.send("Maze reset!")
                break;
            //==============================================================================================================================

            /*case 'maze':
                mazeGame(message)
                mazeComplete = false
                break;*/
            case 'maze':
                mazeGame(message, args);
                mazeActive = 1

                break;
            
            //=============================================================================================================================
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
            //==============================================================================================================================

            case 'test1':
                mention = message.author.id
                //the "727595969100775566" is the message ID. We will replace this with the MazeMessage variable.
                const editEmbed = new Discord.MessageEmbed ()
                    .setImage('https://media.discordapp.net/attachments/727565988752523354/727596289088290846/blankmaze.gif')
                    .setColor('#f5e042')
                    .addField("Hello <@"+mention+">, how was your day?")
                    .setDescription("Hello (des) <@"+mention+">, how")
                //channel.send(editEmbed)
                message.channel.send(editEmbed)
            case 'test2':
                mention = message.author.id
                //the "727595969100775566" is the message ID. We will replace this with the MazeMessage variable.
                const editEmbed1 = new Discord.MessageEmbed ()
                    .setImage('https://media.discordapp.net/attachments/727565988752523354/727596289088290846/blankmaze.gif')
                    .setColor('#f5e042')
                    .addField("Hello <@"+mention+">, how was your day?", null)
                    .setDescription("Hello (des) <@"+mention+">, how")
                //channel.send(editEmbed)
                message.channel.send(editEmbed1)

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
                //message.delete (3000)
                channel.send("Ima delete this...").then(msg => {
                    msg.delete({ timeout: 5000 })
                    })
                    .catch(console.error);
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

/*function isObjectEmpty(obj, message) {
    if (Object.keys(obj).length === 0) {
        message.channel.send("Its empty?")
    }
    //return Object.keys(obj).length === 0;
}*/

function sendLocation(message) {
    message.channel.send(new Discord.MessageAttachment("./images/mazes/0/" + (xPos - 1 + (yPos - 1) * 5) + ".png"))
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
        message.channel.send (new Discord.MessageAttachment("./images/randomimages/congrats.jpg"))
        mazeComplete = true
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
function mazeGame(message, args) {

    ensureUserInDB(message.author);

    message.channel.send(mazeController(message.author.id, args));



    //sendLocation(message)
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

function ensureUserInDB(user) {
    let data = JSON.parse(fs.readFileSync("./data/users/userData.json", "utf8"));
    if(!data[user.id]) {
        let shell = JSON.parse(fs.readFileSync("./data/users/userDataShell.json", "utf8"));
        data[user.id] = shell;

        data[user.id].records.timeCreated = Date.now();

        fs.writeFile("./data/users/userData.json", JSON.stringify(data), (err) => {
            if (err) console.error(err)
            else console.log(user.id + " has been added!")
        });
    } else {
        fs.writeFile("./data/users/userData.json", JSON.stringify(data), (err) => {
            if (err) console.error(err)
        });
    }
}


function dataStorage(message) {
    let channel = message.channel;
    let user = message.author;
    let cont = message.content;

    let parts = JSON.parse(fs.readFileSync("./robotParts.json", "utf8"));
    let data = JSON.parse(fs.readFileSync("./userData.json", "utf8"));

    ensureUserInDB(user)

    return "done";




}


client.login(auth.token);

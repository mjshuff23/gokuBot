const { prefix, token } = require('./config.json');
const Discord = require('discord.js');
// Grab bot token and Bot class from files
const client = new Discord.Client();
const Bot = require('./bot.js');
const gokuBot = new Bot(client, token);


gokuBot.login();
// Event handler for incoming messages
gokuBot.client.on('message', message => {
    if (message.content === `${prefix}Goku?`) {
        message.reply("Hi!");
    }
});

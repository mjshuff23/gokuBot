const { prefix, token } = require('./config.json');
const Discord = require('discord.js');
// Grab bot token and Bot class from files
const client = new Discord.Client();
const Bot = require('./bot.js');
const gokuBot = new Bot(client, token);


gokuBot.login();
// Event handler for incoming messages
gokuBot.client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) {
        return;
    }

    const args = message.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase(); // Considering remove the lowercase

    if (message.content.startsWith(`${prefix}Goku?`)) {
        message.reply("Hi!");
    } else if (message.content.startsWith(`${prefix}server`)) {
        message.channel.send(`Server: ${message.guild.name}\n Members: ${message.guild.memberCount}`);
    } else if (message.content.startsWith(`${prefix}user-info`)) {
        message.channel.send(`Your username: ${message.author.username}\nYour ID: ${message.author.id}`);
    } else if (command === 'args-info') {
        if (!args.length) {
            return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
        }

        message.channel.send(`Command name: ${command}\nArguments: ${args}`);
    }
});

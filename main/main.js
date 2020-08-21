const Discord = require('discord.js');
const client = new Discord.Client();
// Grab bot token and Bot class from files
const { token } = require('./config.js');
const Bot = require('./bot.js');
const gokuBot = new Bot(client, token);
// Login
gokuBot.login();

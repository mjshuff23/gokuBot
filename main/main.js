const fs = require('fs');
const { prefix, token } = require('./config.json');
const Discord = require('discord.js');
// Grab bot token and Bot class from files
const client = new Discord.Client();
const Bot = require('./bot.js');
const gokuBot = new Bot(client, token);
client.commands = new Discord.Collection();
// Import command files
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    console.log(`Importing ${file}...`);
    client.commands.set(command.name, command);
}


gokuBot.login();
// Event handler for incoming messages
gokuBot.client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) {
        return;
    }
    // Remove command from chat history (simulates bot acting on his own accord)
    client.commands.get('prune').execute(message, '1');
    // Separate command and arguments
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase(); // Considering remove the lowercase

    if (!client.commands.has(command)) {
        message.reply(`Gee, I don't think I know the command ${command}`);
        return;
    }

    try {
        client.commands.get(command).execute(message, args, command);
    } catch (error) {
        console.error(error)
        message.reply(`There was an error trying to execute that command!`);
    }

});

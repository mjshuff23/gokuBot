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
// Initialize Cooldowns
const cooldowns = new Discord.Collection();


gokuBot.login();
// Event handler for incoming messages
gokuBot.client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) {
        console.log(`${message.author.username}: '${message.content}'`);
        return;
    }

    // Separate command and arguments
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase(); // Considering remove the lowercase

    if (!client.commands.has(commandName)) {
        message.reply(`Gee, I don't think I know the command ${commandName}`);
        return;
    }

    const command = client.commands.get(commandName);

    if (command.guildOnly && message.channel.type === 'dm') {
        return message.reply(`I can't execute that command inside DMs!`);
    }


    // Remove command from chat history (simulates bot acting on his own accord)
    client.commands.get('prune').execute(message, '1');

    if (command.args && !args.length) {
        let reply = `I can't really do that without any arguments, ${message.author}! :sweat_smile:`;

        if (command.usage) {
            reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
        }

        return message.channel.send(reply);
    }


    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection())
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;

    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.reply(`Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \'${command.name}\' command.`);
        }
    } else {
        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
    }

    try {
        command.execute(message, args, commandName);
    } catch (error) {
        console.error(error)
        message.reply(`There was an error trying to execute that command!`);
    }

});

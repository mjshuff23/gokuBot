module.exports = {
    name: 'kick',
    description: 'kick user out of channel/server (not implemented yet)',
    execute(message) {
        if (!message.mentions.users.size) {
            return message.reply(`You need to tag someone to kick them!`);
        }
        const taggedUser = message.mentions.users.first();
        message.channel.send(`You want to kick ${taggedUser.username}?`);
    },
};

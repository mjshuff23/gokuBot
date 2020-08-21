module.exports = {
    name: 'server',
    description: 'Show current server and Member Count',
    execute(message) {
        message.channel.send(`Server: ${message.guild.name}\n Members: ${message.guild.memberCount}`);
    },
};

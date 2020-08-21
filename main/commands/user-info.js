module.exports = {
    name: 'user-info',
    description: "Display mentioning user's information",
    args: false,
    usage: 'Does not take parameters',
    execute(message) {
        message.channel.send(`Your username: ${message.author.username}\nYour ID: ${message.author.id}`);
    },
};

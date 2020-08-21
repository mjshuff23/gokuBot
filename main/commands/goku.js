module.exports = {
    name: 'goku?',
    args: false,
    usage: 'Does not take parameters',
    description: 'Making sure Goku is alive',
    guildOnly: false,
    execute(message) {
        message.reply('Hi!');
    },
};

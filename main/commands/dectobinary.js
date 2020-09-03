module.exports = {
    name: 'dectobinary',
    description: 'Converts decimal to binary',
    args: true,
    usage: '[base 10 number]',
    guildOnly: false,
    cooldown: 5,
    aliases: ['binary'],
    execute(message, args) {
        if (!args.length) return message.channel.send(`I need a number to convert.`);
        try {
            let number = Number(args[0]);
            let originalNum = number;
            if (isNaN(number) || number <= 0) return message.channel.send(`I need a number to convert.`);;
            let binary = [];
            while (number > 0) {
                binary.push(number % 2);
                number = Math.floor(number / 2);
                // console.log(number);
            }

            return message.channel.send(`Number: ${originalNum} Binary: ${binary.reverse().join('')}`);
        } catch (error) {
            console.error(error);
            message.channel.send(`There was an error somewhere. :)`);
        }
    },
};

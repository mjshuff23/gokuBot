module.exports = {
    name: 'convert',
    description: 'Converts decimal to chose base',
    args: true,
    usage: '[base 10 number], base',
    guildOnly: false,
    cooldown: 5,
    aliases: ['base'],
    execute(message, args) {
        if (!args.length) return message.channel.send(`I need a number to convert.`);
        try {
            let number = Number(args[0]);
            let base = Number(args[1]);
            let originalNum = number;
            if (base > 10) return message.channel.send(`Sorry, I can't do bases higher than 10 yet :(`);
            if (isNaN(number) || number <= 0) return message.channel.send(`I need a number to convert.`);;
            let baseVal = [];
            while (number > 0) {
                baseVal.push(number % base);
                number = Math.floor(number / base);
                // console.log(number);
            }

            return message.channel.send(`Number: ${originalNum} base ${base}: ${baseVal.reverse().join('')}`);
        } catch (error) {
            console.error(error);
            message.channel.send(`There was an error somewhere. :)`);
        }
    },
};

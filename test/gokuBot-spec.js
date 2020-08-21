const assert = require('assert');
const Discord = require('discord.js');
const client = new Discord.Client();
const Bot = require('../main/bot.js');
const { token } = require('../main/config.js');

describe('checkToken()', () => {
    it('should throw TypeError if token is not a string', () => {
        assert.throws(() => {
            const test = new Bot(client, 23423);
            test.checkToken();
        }, TypeError, "Token must be a string.");
    })

    it('should return true if the token is a string', () => {
        let test = new Bot(client, 'test');
        test = test.checkToken();
        assert.strictEqual(test, true, "Token must be a string.");
    })
});

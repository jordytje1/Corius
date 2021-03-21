//# Initialization
const { Client, Collection } = require('discord.js');
const bot = new Client({
    disabledEvents: ["RELATIONSHIP_ADD", "RELATIONSHIP_REMOVE", "TYPING_START"],
    disableEveryone: true,
    messageCacheMaxSize: 150,
    messageCacheLifetime: 240,
    messageSweepInterval: 300,
});

['commands','aliases', 'usage', 'cooldownTime'].forEach(x => bot[x] = new Collection());
['command', 'event'].forEach(x => require(`./handlers/${x}`)(bot));
const errorHandler = require('./handlers/error');

bot.on('disconnect', () => errorHandler.disconnect())
    .on("reconnecting", () => errorHandler.reconnecting())
    .on('warn', err => errorHandler.warn(err))
    .on('error', err => errorHandler.error(err))
    .on('DiscordAPIError', err => errorHandler.DiscordAPIError(err));

process.on("uncaughtException", err => errorHandler.unhandledRejection(err));
process.on('unhandledRejection', (err) => errorHandler.unhandledRejection(err));


bot.login(process.env.BOT_TOKEN);

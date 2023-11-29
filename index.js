require('dotenv').config();
const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');
const { loadEvents } = require('./handlers/eventHandler');
const { handleUsers } = require('./handlers/userHandler');
const sequelize = require('./db');
const models = require('./models/models');
const { loadCommands } = require('./handlers/commandHandler');

const token = process.env.DISCORD_TOKEN;

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildMessages,
	],
	partials: [
		Partials.User,
		Partials.Message,
		Partials.GuildMember,
		Partials.ThreadMember,
	],
});

client.commands = new Collection()

client.login(token)
	.then(async () => {
		loadEvents(client);
		loadCommands(client);
		handleUsers(client);
        await sequelize.authenticate();
        await sequelize.sync();
	});

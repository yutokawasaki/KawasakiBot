const { ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle, ButtonStyle, ButtonBuilder, EmbedBuilder } = require('discord.js');
const stayAsGuest = require('./cases/button/stay-as-guest');
const confirm = require('./cases/button/confirm')
const createTicket = require('./cases/modal/createTicket');
const approveRole = require('./cases/button/role-approve');
const rejectRole = require('./cases/button/role-reject');

module.exports = {
	name: 'interactionCreate',
	async execute(interaction, client) {
		if (interaction.isButton()) {
			switch (interaction.customId) {
				case 'stay-as-guest':
					stayAsGuest(interaction);
					break;
				case 'confirm':
					confirm(interaction);
					break;
				case 'role-approve':
					approveRole(interaction);
					break;
				case 'role-reject':
					rejectRole(interaction);
					break;
			}
		}

		if (interaction.isModalSubmit()) {
			switch (interaction.customId) {
				case 'confirm':
					createTicket(interaction);
					break;
			}
		}

		if (interaction.isChatInputCommand()) {
			const command = client.commands.get(interaction.commandName)
			if (!command) {
				interaction.reply('Не смог распознать команду')
			}
			command.execute(interaction, client)
		}
	},
};
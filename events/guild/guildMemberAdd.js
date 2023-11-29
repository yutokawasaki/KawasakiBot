const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { User } = require('../../models/models');

module.exports = {
	name: 'guildMemberAdd',
	async execute(member) {

        const logChannel = member.guild.channels.cache.get('1174241771543334942');

		const user = await User.create({
			memberId: member.id
		})

        const message = new EmbedBuilder({
            title: '📝 Новое событие',
            description: `Новое событие сервера`,
            fields: [
                { name: 'Пользователь', value: `<@${member.id}>`},
                { name: 'Событие', value: 'Зашел на сервер' }
            ],
            timestamp: new Date().toISOString(),
            footer: {
                text: member.guild.name,
                iconURL: member.guild.iconURL(),
            },
            color: 0xD8A3A2,
        })

        logChannel.send({
            embeds: [message]
        })

		const welcomeChannel = member.guild.channels.cache.get('1155205900198482044');

		const kawasakiRole = member.guild.roles.cache.get('1155511913313222748');
		const himarsRole = member.guild.roles.cache.get('1155512068590538844');
		const guestRole = member.guild.roles.cache.get('1157317959308554281');

		const welcomeEmbed = new EmbedBuilder()
			.setTitle('Верификация')
			.setDescription(`:wave: Привет, <@${member.id}>!`)
			.addFields({
				name: 'Инструкция',
				value: `Для дальнейшего нахождения на сервере необходимо подтвердить свою причастность к семьям ${kawasakiRole} или ${himarsRole}. Вы так же можете остаться на сервере как ${guestRole}`,
			})
			.setTimestamp()
			.setColor(0xD8A3A2)
			.setFooter({
				text: member.guild.name,
				iconURL: `https://cdn.discordapp.com/icons/${member.guild.id}/${member.guild.icon}.png`,
			});

		welcomeChannel.send({
			embeds: [welcomeEmbed],
			components: [
				new ActionRowBuilder()
					.setComponents(
						new ButtonBuilder()
							.setCustomId('confirm')
							.setLabel('Подтвердить')
							.setStyle(ButtonStyle.Primary),
						new ButtonBuilder()
							.setCustomId('stay-as-guest')
							.setLabel('Продолжить как гость')
							.setStyle(ButtonStyle.Secondary),
					),
			],
		});
	},
};
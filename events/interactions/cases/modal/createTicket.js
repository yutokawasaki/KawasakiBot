const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')
const { Ticket, User } = require("../../../../models/models");


const createTicket = async (interaction) => {

    const name = interaction.fields.getTextInputValue('name')
    const family = interaction.fields.getTextInputValue('family').toLowerCase()
    const screenshot = interaction.fields.getTextInputValue('screenshot') || 'Не указан'

    const user = await User.findOne({
        where: {
            memberId: interaction.member.id
        }
    })

    if (!user) {
        const message = new EmbedBuilder({
            title: 'Что-то пошло не так',
            description: `Не могу найти вас в базе данных, пожалуйста, обратитесь к администраторам`,
            timestamp: new Date().toISOString(),
            footer: {
                text: interaction.guild.name,
                iconURL: interaction.guild.iconURL(),
            },
            color: 0xED4245,
        })
        return await interaction.reply({
            embeds: [message],
            ephemeral: true,
        })
    }

    const candidate = await Ticket.findOne({
        where: {
            userId: user.id
        }
    })

    if (candidate) {
        const message = new EmbedBuilder({
            title: 'Что-то пошло не так',
            description: `Кажется вы уже подавали заявку, пожалуйста, дождитесь ее проверки`,
            timestamp: new Date().toISOString(),
            footer: {
                text: interaction.guild.name,
                iconURL: interaction.guild.iconURL(),
            },
            color: 0xED4245,
        })
        return await interaction.reply({
            embeds: [message],
            ephemeral: true,
        })
    }

    let channel = ''
    let role

    if (family === 'kawasaki') {
        channel = '1173584435279564860'
        role = interaction.member.guild.roles.cache.get('1155511913313222748')
    }
    if (family === 'himars') {
        channel = '1173584701613690880'
        role = interaction.member.guild.roles.cache.get('1155512068590538844')
    }
    const ticketChannel = interaction.guild.channels.cache.get(channel);

    const ticketMessage = new EmbedBuilder({
        title: 'Новая заявка',
        description: `Пришла новая заявка на выдачу роли ${role}`,
        fields: [
            { name: 'Отправитель', value: `<@${interaction.member.id}>`},
            { name: 'Имя', value: name },
            { name: 'Скриншот', value: screenshot }
        ],
        timestamp: new Date().toISOString(),
        footer: {
            text: interaction.guild.name,
            iconURL: interaction.guild.iconURL(),
        },
        color: 0xD8A3A2,
    })

    const sendingTicket  = await ticketChannel.send({
        embeds: [ticketMessage],
        components: [
            new ActionRowBuilder()
                .setComponents(
                    new ButtonBuilder()
                        .setCustomId('role-approve')
                        .setLabel('✅ Одобрить')
                        .setStyle(ButtonStyle.Secondary),
                    new ButtonBuilder()
                        .setCustomId('role-reject')
                        .setLabel('❌ Отклонить')
                        .setStyle(ButtonStyle.Secondary),
                ),
        ],
    })

    await Ticket.create({
        name: name,
        family: family,
        screenshot: screenshot,
        userId: user.id,
        messageId: sendingTicket.id
    })

    const message = new EmbedBuilder({
        title: 'Заявка отправлена',
        description: `Ваша заявка передана руководству, ожидайте ее рассмотрения`,
        timestamp: new Date().toISOString(),
        footer: {
            text: interaction.guild.name,
            iconURL: interaction.guild.iconURL(),
        },
        color: 0x3AA55C,
    })
    return await interaction.reply({
        embeds: [message],
        ephemeral: true,
    })
}

module.exports = createTicket
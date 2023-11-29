const { EmbedBuilder } = require('discord.js');

const stayAsGuest = async (interaction) => {
    const guestRole = interaction.member.guild.roles.cache.get('1157317959308554281');
    const kawasakiRole = interaction.member.guild.roles.cache.get('1155511913313222748')
    const himarsRole = interaction.member.guild.roles.cache.get('1155512068590538844')

    if (interaction.member.roles.cache.find(role => role.id == guestRole)) {
        const message = createWrongMessage(guestRole, interaction.guild)
        return await interaction.reply({
            embeds: [message],
            ephemeral: true,
        })
    }

    if (interaction.member.roles.cache.find(role => role.id == kawasakiRole)) {
        const message = createWrongMessage(kawasakiRole, interaction.guild)
        return await interaction.reply({
            embeds: [message],
            ephemeral: true,
        })
    }

    if (interaction.member.roles.cache.find(role => role.id == himarsRole)) {
        const message = createWrongMessage(himarsRole, interaction.guild)
        return await interaction.reply({
            embeds: [message],
            ephemeral: true,
        })
    }

    const message = createSuccessMessage(guestRole, interaction.guild);
    return interaction.member.roles.add(guestRole).then(() => {
        logEvent(interaction.member, guestRole);
        interaction.reply({
            embeds: [message],
            ephemeral: true,
        });
    });
}

const createSuccessMessage = (role, guild) => {
    const message = new EmbedBuilder({
        title: '✅ Роль предоставлена',
        description: `Вам выдана роль ${role} и открыт доступ к остальной части сервера. Не забудьте ознакомиться с правилами, ведь их незнание не освобождает от ответственности; помните об уважении к себе и окружающим.`,
        timestamp: new Date().toISOString(),
        footer: {
            text: guild.name,
            iconURL: guild.iconURL(),
        },
        color: 0xD8A3A2,
    })
    return message;
}

const createWrongMessage = (role, guild) => {
    const message = new EmbedBuilder({
        title: '🤨 Что-то пошло не так',
        description: `Похоже, что вы уже верифицированы и получили роль ${role}. Вам незачем повторно отправлять заявку на верификацию.`,
        timestamp: new Date().toISOString(),
        footer: {
            text: guild.name,
            iconURL: guild.iconURL(),
        },
        color: 0xF2E800,
    })
    return message;
}

const logEvent = (member, role) => {
    const logChannel = member.guild.channels.cache.get('1174241771543334942');
    const message = new EmbedBuilder({
        title: '📝 Новое событие',
        description: `Новое событие сервера`,
        fields: [
            { name: 'Пользователь', value: `<@${member.id}>`},
            { name: 'Событие', value: `Самостоятельно получил роль ${role}` }
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
}

module.exports = stayAsGuest;
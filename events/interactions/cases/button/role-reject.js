const { EmbedBuilder } = require("discord.js")
const { Ticket, User } = require("../../../../models/models")

const rejectRole = async (interaction) => {

    const messageId = interaction.message.id

    const ticket = await Ticket.findOne({
        where: {
            messageId: messageId
        }
    })

    await ticket.destroy()
    await interaction.message.edit({components: []})

    const rejectMessage = new EmbedBuilder({
        title: 'Заявка отклонена',
        description: `Заявка на выдачу роли была отклонена пользователем <@${interaction.member.id}>`,
        timestamp: new Date().toISOString(),
        footer: {
            text: interaction.guild.name,
            iconURL: interaction.guild.iconURL(),
        },
        color: 0xED4245,
    })

    interaction.reply({
        embeds: [rejectMessage],
    })
    

}

module.exports = rejectRole
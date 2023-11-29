const { EmbedBuilder } = require("discord.js")
const { Ticket, User } = require("../../../../models/models")

const approveRole = async (interaction) => {

    const kawasakiRole = interaction.member.guild.roles.cache.get('1155511913313222748')
    const himarsRole = interaction.member.guild.roles.cache.get('1155512068590538844')

    const messageId = interaction.message.id

    const ticket = await Ticket.findOne({
        where: {
            messageId: messageId
        }
    })

    const user = await User.findByPk(ticket.userId)

    const member = await interaction.guild.members.fetch(user.memberId)

    try {
        await member.setNickname(ticket.name)
        if (ticket.family === 'kawasaki') {
            await member.roles.add(kawasakiRole)
        }
        if (ticket.family === 'himars') {
            await member.roles.add(himarsRole)
        }
    } catch (e) {

    }

    await ticket.destroy()
    await interaction.message.edit({components: []})

    const successMessage = new EmbedBuilder({
        title: 'Заявка одобрена',
        description: `Заявка на выдачу роли была одобрена пользователем <@${interaction.member.id}>`,
        timestamp: new Date().toISOString(),
        footer: {
            text: interaction.guild.name,
            iconURL: interaction.guild.iconURL(),
        },
        color: 0x3AA55C,
    })

    interaction.reply({
        embeds: [successMessage],
    })
    

}

module.exports = approveRole
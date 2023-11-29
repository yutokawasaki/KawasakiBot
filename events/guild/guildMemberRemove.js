const { EmbedBuilder } = require("discord.js");
const { User } = require("../../models/models");

module.exports = {
    name: 'guildMemberRemove',
    async execute(member) {

        const user = await User.findOne({
            where: {
                memberId: member.id
            }
        })
        await user.destroy()

        const logChannel = member.guild.channels.cache.get('1174241771543334942');

        const message = new EmbedBuilder({
            title: '📝 Новое событие',
            description: `Новое событие сервера`,
            fields: [
                { name: 'Пользователь', value: `<@${member.id}>`},
                { name: 'Событие', value: 'Покинул сервер' }
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

        console.log('member leave')
    }
}
const { User } = require('../models/models')


async function handleUsers(client) {
    const guild = await client.guilds.fetch('1155205900198482042');
    const members = await guild.members.fetch();
    members.forEach(async (member) => {
        if (!member.user.bot) {
            const candidate = await User.findOne({ where: { memberId: member.id } })
            if (!candidate) {
                await User.create({
                    memberId: member.id
                })
            }
        }
    });
}


module.exports = { handleUsers };
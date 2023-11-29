const fs = require('fs');
const path = require('path');
const ascii = require('ascii-table');
let commands = []
function loadCommands(client) {
    const table = new ascii().setHeading('Command', 'Status');
    const commandsPath = path.join(__dirname, '..', 'commands')
    const folders = fs.readdirSync(commandsPath)
    for (const folder of folders) {
        const filesPath = path.join(commandsPath, folder);
        const files = fs.readdirSync(filesPath).filter((file) => file.endsWith('.js'));

        for (const file of files) {
            const commandPath = path.join(filesPath, file);
            const command = require(commandPath);

            client.commands.set(command.data.name, command)
            commands.push(command.data.toJSON());
            table.addRow(file, 'loaded')
            continue;
        }
    }
    client.application.commands.set(commands);
    console.log(table.toString());
}

module.exports = { loadCommands }
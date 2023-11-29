const fs = require('fs');
const path = require('path');
const ascii = require('ascii-table');

function loadEvents(client) {
    const table = new ascii().setHeading('Event', 'Status')
	const eventsPath = path.join(__dirname, '..', 'events');
    const folders = fs.readdirSync(eventsPath);
    for (const folder of folders) {
        const filesPath = path.join(eventsPath, folder);
        const files = fs.readdirSync(filesPath).filter((file) => file.endsWith('.js'));

        for (const file of files) {
            const eventPath = path.join(filesPath, file);
            const event = require(eventPath);

            if (event.rest) {
                if (event.once) {
                    client.rest.once(event.name, (...args) => {
                        event.execute(...args, client)
                    })
                } else {
                    client.rest.on(event.name, (...args) => {
                        event.execute(...args, client)
                    })
                }
            } else {
                if (event.once) {
                    client.once(event.name, (...args) => {
                        event.execute(...args, client)
                    })
                } else {
                    client.on(event.name, (...args) => {
                        event.execute(...args, client)
                    })
                }
            }
            table.addRow(file, 'loaded')
        }
    }
    console.log(table.toString())
}

module.exports = {loadEvents};
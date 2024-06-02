const cron = require('node-cron');
const checkScheduledEmails = require("./checkScheduledEmails.js")

module.exports = () => {
    cron.schedule('15 04 * * *', () => {
        console.log('Verificando y programando envíos...');
        checkScheduledEmails();
    });
};

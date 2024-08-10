// esse arquivo lida com importação de dados via CSV do TicketSports
// aqui a gente pega uma lista de inscrição de um evento, por exemplo, e salva todos os dados dos atletas no banco de dados

const nodecgApiContext = require(`./nodecg-api-context`);
const nodecg = nodecgApiContext.get();

function initTicketSports() {
    nodecg.log.debug(`:: [ticketSports.js] : Inicializando extensão do TicketSports`);


    nodecg.listenFor(`handleTicketSports`, (csv) => {
        nodecg.log.debug(`:: [ticketSports.js] : Recebidos dados CSV: `, csv);
    });


}

module.exports = { initTicketSports }
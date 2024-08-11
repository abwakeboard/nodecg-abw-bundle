// esse arquivo lida com importação de dados via CSV do TicketSports
// aqui a gente pega uma lista de inscrição de um evento, por exemplo, e salva todos os dados dos atletas no banco de dados

const nodecgApiContext = require(`./nodecg-api-context`);
const nodecg = nodecgApiContext.get();
const { csvToJSON } = require(`./formatar`);

function initTicketSports() {
    nodecg.log.debug(`:: [ticketSports.js] : Inicializando extensão do TicketSports`);

    // quando a gente recebe um arquivo CSV enviado pela dashboard, ele aparece aqui
    nodecg.listenFor(`handleTicketSports`, (csv) => {
        nodecg.log.debug(`:: [ticketSports.js] : Recebidos dados CSV`);
        // converte CSV pra JSON
        const json = csvToJSON(csv);
        // ordena por modalidade
        const jsonOrdenado = json.sort((a, b) => {
            return a[`Nome completo`].localeCompare(b[`Nome completo`]);
        });

        nodecg.Replicant(`listaAtletasTicketSports`).value = jsonOrdenado;
    });
}

module.exports = { initTicketSports }
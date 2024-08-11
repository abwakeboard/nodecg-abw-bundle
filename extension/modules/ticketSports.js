// esse arquivo lida com importação de dados via CSV do TicketSports
// aqui a gente pega uma lista de inscrição de um evento, por exemplo, e salva todos os dados dos atletas no banco de dados

const nodecgApiContext = require(`./nodecg-api-context`);
const nodecg = nodecgApiContext.get();
const { csvToJSON, calculateAge } = require(`./formatar`);

function initTicketSports() {
    nodecg.log.debug(`:: [ticketSports.js] : Inicializando extensão do TicketSports`);

    dragAndDrop();
    autoFillDropdown();
}

// lida com o drag and drop do CSV do ticketsports na Dashboard
function dragAndDrop() {
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

/** 
lida com auto-preencher os dados pro lower third baseado na seleção do dropdown
Essa função:
1 - Recebe o ID do atleta que o usuário escolheu
2 - Pega os dados desse atleta no replicant listaAtletasTicketSports
3 - Pega só os dados importantes desse atleta
4 - Formata de acordo com o schema do replicant lowerThirdAtleta
5 - Envia esses dados pro replicant lowerThirdAtleta
*/
function autoFillDropdown() {
    nodecg.Replicant(`lowerThirdAtletaID`).on(`change`, (newValue, oldValue) => {
        if (!newValue) return;
        nodecg.log.debug(`:: [ticketSports.js] : Usuário selecionou um novo atleta no Dropdown. Auto preenchendo dados para N inscricao ${newValue}... `);

        // vamos pegar a lista com todos os atletas:
        const atletas = nodecg.readReplicant(`listaAtletasTicketSports`);
        const atleta = atletas.find(item => item['N inscricao'] == newValue);

        // error handling
        if (!atleta) {
            nodecg.log.warn(`:: [ticketSports.js] : Nenhum atleta encontrado com N inscricao ${newValue}`);
            return;
        }

        // se chegamos até aqui, atleta foi encontrado. Vamos formatar os dados
        nodecg.log.info(`:: [ticketSports.js] : Encontrado atleta ${atleta['Nome completo']}`);

        const result = {
            nome: atleta[`Nome completo`],
            stance: atleta.stance,
            idade: calculateAge(atleta[`Data de nascimento`]),
            modalidade: atleta[`Modalidade`]
        }
        
        nodecg.Replicant(`lowerThirdAtleta`).value = result;
        return result;
    });
}

module.exports = { initTicketSports }
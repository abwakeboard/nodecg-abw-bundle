import { formToJSON, JSONToForm } from "../common/modules/form.js";

const dropdownAtleta = document.getElementById(`dropdownAtleta`);
const formDadosManuais = document.getElementById(`formDadosManuais`);

nodecg.Replicant(`listaAtletasTicketSports`).on(`change`, (newValue, oldValue) => {
    if (!newValue) return;

    dropdownAtleta.innerHTML = ``;
    // adiciona valor padrão
    const item = document.createElement(`option`);
    item.textContent = `Selecione...`;
    item.value = `default`;
    dropdownAtleta.appendChild(item);

    // adiciona lsita de atletas
    newValue.forEach(atleta => {
        const item = document.createElement(`option`);
        item.textContent = atleta[`Nome completo`];
        item.value = atleta[`N inscricao`];
        dropdownAtleta.appendChild(item);
    });

});


// lida com auto-preencher os dados baseado com o que tá no banco de dados
nodecg.Replicant(`lowerThirdAtleta`).on(`change`, (newValue, oldValue) => {
    if (!newValue) return;
    JSONToForm(formDadosManuais, newValue);
});

// lida com usuario selecionando atleta no dropdown
dropdownAtleta.onchange = function(){
    nodecg.log.debug(`Dropdown de atleta mudado para inscrição Numero ${this.value}`);
    nodecg.Replicant(`lowerThirdAtletaID`).value = this.value;
    dropdownAtleta.value = `default`;
};

// lida com usuario preenchendo os dados manualmente
formDadosManuais.onchange = function(){
    nodecg.log.debug(`Detectadas mudanças no form. Formatando e enviando pro Replicant`);
    const formJSON = formToJSON(formDadosManuais);
    nodecg.Replicant(`lowerThirdAtleta`).value = formJSON;
};

animarLowerThird.onclick = function(){
    nodecg.log.debug(`Animando...`);
    nodecg.sendMessage(`animarLowerThird`);
};

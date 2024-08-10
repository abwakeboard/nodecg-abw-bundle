// elementos da DOM
const inputElement = document.getElementById(`file-input`);
const listaAtletas = document.getElementById(`lista-atletas`);

// lida com usuario arrastando arquivo pra area
function handleDrop(event) {
    event.preventDefault();
    var files = event.dataTransfer.files;
    handleFiles(files);
}

// lida com usuario clicando em vez de arrastando
document.getElementById(`drop-area`).addEventListener(`click`, function () {
    document.getElementById(`file-input`).click();
});


inputElement.addEventListener(`change`, handleFileInput, false);
function handleFileInput() {
    handleFiles(this.files)
}

// lida com arquivo CSV
function handleFiles(files) {
    var file = files[0];
    if (file.type === `text/csv`) {
        var reader = new FileReader();
        reader.onload = function (event) {
            // envia dados do CSV pra ser manipulado no backend
            nodecg.sendMessage(`handleTicketSports`, event.target.result);
        };
        reader.readAsText(file);
    } else {
        alert(`Por favor insira um arquivo no formato .CSV`);
    }
}

// atualiza lista na dashboard
nodecg.Replicant(`atletas`).on(`change`, (newValue, oldValue) => {
    if (!newValue) return;

    listaAtletas.innerHTML = ``;

    newValue.forEach(atleta => {
        const item = document.createElement(`li`);
        item.textContent = atleta[`Nome completo`];
        listaAtletas.appendChild(item);
    });

});
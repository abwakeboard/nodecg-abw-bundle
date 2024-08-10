console.log(`foo`)
// lida com usuario arrastando arquivo pra area
function handleDrop(event) {
    event.preventDefault();
    var files = event.dataTransfer.files;
    handleFiles(files);
}

// lida com usuario clicando em vez de arrastando
document.getElementById('drop-area').addEventListener('click', function () {
    document.getElementById('file-input').click();
});
const inputElement = document.getElementById("file-input");
inputElement.addEventListener("change", handleFileInput, false);
function handleFileInput() {
    handleFiles(this.files)
}

// lida com arquivo CSV
function handleFiles(files) {
    var file = files[0];
    if (file.type === 'text/csv') {
        var reader = new FileReader();
        reader.onload = function (event) {
            // envia dados do CSV pra ser manipulado no backend
            nodecg.sendMessage('handleTicketSports', event.target.result);
        };
        reader.readAsText(file);
    } else {
        alert('Por favor insira um arquivo no formato .CSV');
    }
}

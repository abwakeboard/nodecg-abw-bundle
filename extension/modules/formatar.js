// converte CSV pra um JSON estruturado com arrays e keys para cada cabeçalho do CSV
function csvToJSON(inputText) {

    // console.log(inputText);

    const lines = inputText.split('\n');
    const result = [];
    const headers = lines[0].split(';').map(header => header.trim());

    for (let i = 1; i < lines.length; i++) {
        const obj = {};
        const currentLine = lines[i].split(';').map(value => value.trim());

        for (let j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentLine[j];
        }

        result.push(obj);
    }

    return result;
}

module.exports = { csvToJSON }
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

// calcula idade baseado numa data DD/MM/YYYY
function calculateAge(birthDate) {
    const [day, month, year] = birthDate.split('/').map(Number);
    const birth = new Date(year, month - 1, day); // Months are 0-indexed in JavaScript's Date object
    const today = new Date();

    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    const dayDiff = today.getDate() - birth.getDate();

    // Adjust age if the birth date hasn't occurred yet this year
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        age--;
    }

    return age;
}

module.exports = { csvToJSON, calculateAge }
const { example } = require(`./modules/example`);

module.exports = function (nodecg) {
    nodecg.log.info(`Loading extension...`);
    
    example(`Iniciado módulo com sucesso...`);
};

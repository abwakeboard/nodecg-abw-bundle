const lowerThird = document.getElementById(`lower-third`);
const nome = document.getElementById(`nome`);
const stance = document.getElementById(`stance`);
const idade = document.getElementById(`idade`);
const modalidade = document.getElementById(`modalidade`);

nodecg.Replicant(`lowerThirdAtleta`).on(`change`, (newValue, oldValue) => {
    if (!newValue) return;
    nome.innerHTML = newValue.nome;
    stance.innerHTML = newValue.stance;
    idade.innerHTML = `${newValue.idade} anos`;
    modalidade.innerHTML = newValue.modalidade;
});

nodecg.listenFor(`animarLowerThird`, () => {
    nodecg.log.debug(`Animando...`);
    lowerThird.classList.remove(`animar`);
    void lowerThird.offsetWidth; // força o navegador a fazer um reflow
    lowerThird.classList.add(`animar`);
});
const btnSortear = document.querySelector("#btnsortear");
const containerResultado = document.querySelector("#resultado");

async function buscarFuncionarios() {
    try {
        const response = await fetch('./colaboradores.json');
        const dados = await response.json()
        return dados;
    } catch (error) {
        alert("Não foi possível encontrar o arquivo.")
    }
}

function sortearColaborador(lista) {
    if (lista.length === 0) return null;
    const numeroEscolhido = Math.floor(Math.random() * lista.length);
    return lista[numeroEscolhido];
}

btnSortear.addEventListener("click", async () => {
    const funcionarios = await buscarFuncionarios();
    const funcSorteado = sortearColaborador(funcionarios);
    if (funcSorteado) containerResultado.innerHTML = `SORTEADO: ${funcSorteado.nome}`
})
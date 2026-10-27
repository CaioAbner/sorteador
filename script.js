const btnSortear = document.querySelector("#btnSortear");
const containerResultado = document.querySelector("#resultado");
const selectTurnos = document.querySelector("#turnoOpcoes");

const arquivosPorTurno = {
    manha: "./colaboradores-manha.json",
    tarde: "./colaboradores-tarde.json",
    noite: "./colaboradores-noite.json"
};

async function buscarFuncionarios(arquivo) {
    try {
        const response = await fetch(arquivo);

        if (!response.ok) {
            throw new Error(`Falha ao carregar ${arquivo}: ${response.status}`);
        }

        const dados = await response.json();

        if (!Array.isArray(dados)) {
            throw new Error("O arquivo de colaboradores não contém uma lista válida.");
        }

        return dados;
    } catch (error) {
        console.error(error);
        containerResultado.textContent = "Não foi possível carregar a lista de colaboradores. Tente novamente.";
        return null;
    }
}

function sortearColaborador(lista) {
    if (!lista || lista.length === 0) return null;
    const numeroEscolhido = Math.floor(Math.random() * lista.length);
    return lista[numeroEscolhido];
}

btnSortear.addEventListener("click", async () => {
    btnSortear.disabled = true;
    btnSortear.textContent = "Sorteando...";
    containerResultado.textContent = "";

    try {
        const arquivo = arquivosPorTurno[selectTurnos.value];
        const funcionarios = await buscarFuncionarios(arquivo);

        if (funcionarios === null) return;

        const funcSorteado = sortearColaborador(funcionarios);

        if (funcSorteado) {
            containerResultado.textContent = `Funcionário sorteado: ${funcSorteado.nome}`;
        } else {
            containerResultado.textContent = "Não há colaboradores cadastrados para esse turno.";
        }
    } finally {
        btnSortear.disabled = false;
        btnSortear.textContent = "Sortear";
    }
});

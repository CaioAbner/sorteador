async function buscarFuncionarios(arquivo) {
    try {
        const response = await fetch(arquivo);
        const dados = await response.json()
        console.log(dados);
        return dados;
    } catch (error) {
        alert("Não foi possível encontrar o arquivo.")
    }
}

buscarFuncionarios('./colaboradores.json');
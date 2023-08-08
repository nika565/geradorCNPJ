// Pegando o evento de clique do botão
const btnGerar = document.querySelector('.btnGerar');
btnGerar.addEventListener('click', () => {

    // Chamando a função gerar
    const cnpjGerado = gerarCNPJ();

    // Exibindo o CNPJ na tela
    const divResultado = document.querySelector('.resultado');
    divResultado.innerText = cnpjGerado;
});

// Função para gerar o CNPJ
function gerarCNPJ(){

    // Greando os 12 primeiros digitos
    const corpoCNPJ = geraCorpoCNPJ();
    
    // Colocando os digitos em um array
    const arrCNPJ = [...corpoCNPJ.toString()].map(Number);


    // Adicionando o primeiro digito
    const digito1 = calcular(arrCNPJ);
    arrCNPJ.push(digito1);

    // Adicionando o segundo digito
    const digito2 = calcular(arrCNPJ);
    arrCNPJ.push(digito2);

    // Tranfomando o array em uma string
    const novoCNPJ = arrCNPJ.join('');

    return novoCNPJ;

}

// Gerar números aleatório para compor o corpo do CNPJ
function geraCorpoCNPJ(){

    // gerando aleatóriamente os doze primeiros digitos do CNPJ para realizar o cálculo
    const corpo = Math.floor(Math.random() * (999999999999 - 111111111111) + 111111111111)
    return corpo;

}

// Função para fazer o cálculo do CNPJ
function calcular(arr){
    
    // Variável para representar os números da multiplicação decrescente
    let decrescente = 0;

    // Condicional para determinar o valor da variável dependendo do tamanho do array
    if (arr.length === 12) {
        
        decrescente = 5

    } else if (arr.length === 13) {
        
        decrescente = 6

    } else {
        console.log('Algo não esta certo')
    }

    const soma = arr.reduce((acumulador, valorAtual) => {

        
        if (decrescente === 1) {
            decrescente = 9
        }

        console.log('Decrescente: ' + decrescente);

        acumulador += valorAtual * decrescente;
        decrescente--

        return acumulador;

    }, 0);

    // Pegando o resto da divisão entre a soma e 11
    const resto = soma % 11;

    // Se o resto for menor que 2, o digito é igual a 0, caso contrário é retornado 11 - resto
    if (resto < 2) {

        return 0;

    } else {

        return 11 - resto;

    }
}

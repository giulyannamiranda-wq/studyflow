
let lendo = false;
let falaAtual = null;

function finalizarLeitura() {
    lendo = false;
    falaAtual = null;
}

function lerEmVozAlta() {
    // Verifica se o navegador oferece suporte à leitura
    if (!("speechSynthesis" in window)) {
        alert("Seu navegador não suporta leitura em voz alta.");
        return;
    }

    // Se já existe uma leitura, pausa ou retoma
    if (lendo) {
        if (speechSynthesis.paused) {
            speechSynthesis.resume();
        } else {
            speechSynthesis.pause();
        }
        return;
    }

    // Busca o conteúdo principal da página
    const conteudo = document.querySelector("main");

    if (!conteudo) {
        alert("Não foi possível encontrar o conteúdo da página.");
        return;
    }

    const texto = conteudo.innerText.trim();

    if (!texto) {
        alert("Não há texto para ler.");
        return;
    }

    // Interrompe qualquer leitura anterior
    speechSynthesis.cancel();

    // Cria uma nova leitura
    falaAtual = new SpeechSynthesisUtterance(texto);

    falaAtual.lang = "pt-BR";

    // Atualiza o estado quando a leitura terminar
    falaAtual.onend = finalizarLeitura;

    // Atualiza o estado caso ocorra um erro
    falaAtual.onerror = finalizarLeitura;

    lendo = true;

    // Inicia a leitura
    speechSynthesis.speak(falaAtual);
}

// Interrompe a leitura quando necessário
function pararLeitura() {
    if ("speechSynthesis" in window) {
        speechSynthesis.cancel();
    }

    finalizarLeitura();
}

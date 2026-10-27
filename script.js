
const formulario = document.getElementById("form-tarefa");
const campo = document.getElementById("nova-tarefa");
const lista = document.getElementById("lista-tarefas");
const contador = document.getElementById("contador");
const mensagemVazia = document.getElementById("mensagem-vazia");

let tarefas = JSON.parse(localStorage.getItem("studyflow-tarefas") || "[]");

function salvar() {
  localStorage.setItem("studyflow-tarefas", JSON.stringify(tarefas));
}

function renderizar() {
  lista.innerHTML = "";

  tarefas.forEach((tarefa, indice) => {
    const item = document.createElement("li");
    if (tarefa.concluida) item.classList.add("concluida");

    const check = document.createElement("input");
    check.type = "checkbox";
    check.checked = tarefa.concluida;
    check.setAttribute("aria-label", "Marcar tarefa como concluída");

    check.addEventListener("change", () => {
      tarefas[indice].concluida = check.checked;
      salvar();
      renderizar();
    });

    const texto = document.createElement("span");
    texto.textContent = tarefa.texto;

    const excluir = document.createElement("button");
    excluir.textContent = "Excluir";
    excluir.className = "excluir";

    excluir.addEventListener("click", () => {
      tarefas.splice(indice, 1);
      salvar();
      renderizar();
    });

    item.append(check, texto, excluir);
    lista.appendChild(item);
  });

  const concluidas = tarefas.filter(t => t.concluida).length;
  contador.textContent = `${concluidas} de ${tarefas.length} concluídas`;
  mensagemVazia.hidden = tarefas.length > 0;
}

formulario.addEventListener("submit", evento => {
  evento.preventDefault();

  const texto = campo.value.trim();
  if (!texto) return;

  tarefas.push({ texto, concluida: false });
  salvar();
  renderizar();

  campo.value = "";
  campo.focus();
});

renderizar();

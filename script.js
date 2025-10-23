const usuario = localStorage.getItem('usuarioLogado');

// Carregar tarefas salvas
window.addEventListener('load', function () {
  const tarefasSalvas = JSON.parse(localStorage.getItem(`tarefas-${usuario}`)) || [];
  tarefasSalvas.forEach((tarefa) => {
    criarTarefa(tarefa.nome, tarefa.hora, tarefa.concluida);
  });
});

// Criar tarefa
function criarTarefa(nome, hora, concluida = false) {
  const id = `${nome}-${hora}`;
  const li = document.createElement('li');

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = concluida;

  const label = document.createElement('span');
  label.className = 'task-label';
  label.textContent = nome;

  const time = document.createElement('span');
  time.className = 'time';
  time.textContent = hora;

  const botaoExcluir = document.createElement('button');
  botaoExcluir.textContent = '🗑️';
  botaoExcluir.addEventListener('click', function () {
    li.remove();
    atualizarLocalStorage();
  });

  checkbox.addEventListener('change', function () {
    label.classList.toggle('completed');
    atualizarLocalStorage();
  });

  if (concluida) {
    label.classList.add('completed');
  }

  li.appendChild(checkbox);
  li.appendChild(label);
  li.appendChild(time);
  li.appendChild(botaoExcluir);
  document.getElementById('task-list').appendChild(li);
}

// Atualizar localStorage
function atualizarLocalStorage() {
  const tarefas = [];
  document.querySelectorAll('#task-list li').forEach((li) => {
    const nome = li.querySelector('.task-label').textContent;
    const hora = li.querySelector('.time').textContent;
    const concluida = li.querySelector('input[type="checkbox"]').checked;
    tarefas.push({ nome, hora, concluida });
  });
  localStorage.setItem(`tarefas-${usuario}`, JSON.stringify(tarefas));
}

// Adicionar nova tarefa
document.getElementById('add-task-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const nome = document.getElementById('task-name').value.trim();
  const hora = document.getElementById('task-time').value;
  if (nome && hora) {
    criarTarefa(nome, hora);
    atualizarLocalStorage();
    document.getElementById('add-task-form').reset();
  }
});

// Logout
function logout() {
  localStorage.removeItem('usuarioLogado');
  window.location.href = 'login.html';
}

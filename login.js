document.getElementById('login-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  // Aceita qualquer e-mail e senha
  if (email && password) {
    localStorage.setItem('usuarioLogado', email);
    window.location.href = 'index.html';
  } else {
    document.getElementById('login-message').textContent = 'Preencha todos os campos.';
  }
});

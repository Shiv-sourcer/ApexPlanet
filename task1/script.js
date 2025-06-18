function showForm(type) {
  const registerForm = document.getElementById('registerForm');
  const loginForm = document.getElementById('loginForm');

  if (type === 'register') {
    registerForm.style.display = 'block';
    loginForm.style.display = 'none';
  } else {
    registerForm.style.display = 'none';
    loginForm.style.display = 'block';
  }
}

function register() {
  alert("You got registered successfully!");
}

function login() {
  window.location.href = "https://www.apexplanet.in"; 
}

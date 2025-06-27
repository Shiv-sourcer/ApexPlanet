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
  window.location.href = "home.html"; 
}


/*home.html*/

// Toggle visibility of the "New List" form
function toggleListForm() {
  const form = document.getElementById('newListForm');
  form.style.display = (form.style.display === 'none') ? 'block' : 'none';
}

// Handle task form submission
document.addEventListener("DOMContentLoaded", function () {
  const taskForm = document.getElementById("taskForm");

  if (taskForm) {

    // Detect Enter key in textarea and trigger form submit
const taskInput = document.getElementById("taskInput");

if (taskInput) {
  taskInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevents newline
      taskForm.requestSubmit(); // Triggers the submit button
    }
  });
}

    taskForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const taskText = document.getElementById('taskInput').value.trim();
      if (taskText === '') return;

      const todoContainer = document.getElementById('todoItems');


      const taskElement = document.createElement('div');
taskElement.className = 'form-container';

taskElement.innerHTML = `
  <p>${taskText}</p>
  <button class="delete-btn" onclick="deleteTask(this)">Delete</button>
`;

todoContainer.appendChild(taskElement);


      document.getElementById('taskInput').value = '';
      document.getElementById('newListForm').style.display = 'none';
    });
  }
});

function deleteTask(button) {
  const taskCard = button.parentElement;
  taskCard.remove();
}

/*contact */

function submitMessage(event) {
      event.preventDefault(); // Prevents actual form submission
      alert("Your message has been sent!");
    }

const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent actual form submission

    const name = document.getElementById("contactName").value.trim();
    const email = document.getElementById("contactEmail").value.trim();
    const message = document.getElementById("contactMessage").value.trim();

    const nameRegex = /^[a-zA-Z\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nameRegex.test(name)) {
      alert("Please enter a valid name (letters and spaces only).");
      return;
    }

    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (message === "") {
      alert("Please enter a message.");
      return;
    }

    alert("Thank you for contacting us!");
    contactForm.reset();
  });
}

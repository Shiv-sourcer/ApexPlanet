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
  window.location.href = "dashboard.html"; 
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


/*Joke Generator */

// Fetch a random joke from API and display it
function getJoke() {
  const jokeText = document.getElementById("jokeText");

  fetch("https://official-joke-api.appspot.com/random_joke")
    .then(res => res.json())
    .then(data => {
      jokeText.innerHTML = `${data.setup}<br><strong>${data.punchline}</strong>`;
    })
    .catch(err => {
      jokeText.textContent = "Failed to fetch a joke. Try again!";
    });
}


/*Weather */

function getWeather() {
  const city = document.getElementById("locationInput").value.trim();
  const result = document.getElementById("weatherResult");

  if (city === "") {
    result.innerHTML = "<p>Please enter a location.</p>";
    return;
  }

  result.innerHTML = "<p>Fetching weather...</p>";

  const apiKey = "e8011896c2180264e049fc77f82bcd6e";

  // Step 1: Get coordinates from city name
  fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`)
    .then(res => res.json())
    .then(data => {
      if (!data.length) {
        throw new Error("City not found");
      }

      const lat = data[0].lat;
      const lon = data[0].lon;

      // Step 2: Get weather using coordinates
      return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`);
    })
    .then(res => res.json())
    .then(weather => {
      const output = `
  <div class="weather-layout">
    <div class="weather-center">
      <img src="location.png" class="weather-icon" alt="Location">
      <h3>${weather.name}, ${weather.sys.country}</h3>
    </div>
    <div class="weather-info">
      <div class="weather-box">
        <img src="temp.png" class="weather-icon" alt="Temperature">
        <div><strong>Temp:</strong> ${weather.main.temp}°C</div>
      </div>
      <div class="weather-box">
        <img src="pressure.png" class="weather-icon" alt="Pressure">
        <div><strong>Pressure:</strong> ${weather.main.pressure} hPa</div>
      </div>
      <div class="weather-box">
        <img src="humidity.png" class="weather-icon" alt="Humidity">
        <div><strong>Humidity:</strong> ${weather.main.humidity}%</div>
      </div>
      <div class="weather-box">
        <img src="speed.png" class="weather-icon" alt="Wind Speed">
        <div><strong>Wind:</strong> ${weather.wind.speed} m/s</div>
      </div>
    </div>
  </div>
`;

      result.innerHTML = output;
    })
    .catch(err => {
      result.innerHTML = `<p style="color: red;">Error: ${err.message}</p>`;
    });
}




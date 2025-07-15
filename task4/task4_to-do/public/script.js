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
//from here
document.addEventListener("DOMContentLoaded", () => {
  const taskForm = document.getElementById("taskForm");
  const taskInput = document.getElementById("taskInput");
  const todoContainer = document.getElementById("todoItems");

  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5000/todos");
    const todos = await res.json();
    todoContainer.innerHTML = "";

    todos.forEach((todo) => {
      const taskElement = document.createElement("div");
      taskElement.className = "form-container";

      taskElement.innerHTML = `
        <p>${todo.task}</p>
        <button class="delete-btn" data-id="${todo.id}">Delete</button>
      `;

      todoContainer.appendChild(taskElement);
    });
  };

  const addTask = async (taskText) => {
    await fetch("http://localhost:5000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ task: taskText }),
    });
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/todos/${id}`, {
      method: "DELETE",
    });
    fetchTasks();
  };

  // Submit Form
  if (taskForm) {
    taskForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const taskText = taskInput.value.trim();
      if (taskText !== "") {
        addTask(taskText);
        taskInput.value = "";
        document.getElementById("newListForm").style.display = "none";
      }
    });

    // Enter key support
    taskInput.addEventListener("keydown", function (e) {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        taskForm.requestSubmit();
      }
    });

    // Delete handler (event delegation)
    todoContainer.addEventListener("click", function (e) {
      if (e.target.classList.contains("delete-btn")) {
        const id = e.target.getAttribute("data-id");
        deleteTask(id);
      }
    });

    fetchTasks();
  }
});


//to here

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




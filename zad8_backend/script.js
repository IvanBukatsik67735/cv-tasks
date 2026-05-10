const themeButton = document.getElementById("themeButton");
const toggleProjectsButton = document.getElementById("toggleProjectsButton");
const projectsSection = document.getElementById("projects");
const themeStylesheet = document.getElementById("themeStylesheet");

let isGreenTheme = true;
let isProjectsVisible = true;

themeButton.addEventListener("click", () => {
  if (isGreenTheme) {
    themeStylesheet.setAttribute("href", "red.css");
  } else {
    themeStylesheet.setAttribute("href", "green.css");
  }

  isGreenTheme = !isGreenTheme;
});

toggleProjectsButton.addEventListener("click", () => {
  if (isProjectsVisible) {
    projectsSection.style.display = "none";
    toggleProjectsButton.textContent = "Pokaż projekty";
  } else {
    projectsSection.style.display = "block";
    toggleProjectsButton.textContent = "Ukryj projekty";
  }

  isProjectsVisible = !isProjectsVisible;
});

const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  let isValid = true;

  if (!firstName) {
    showError("firstNameError", "Imię jest wymagane.");
    isValid = false;
  } else if (/\d/.test(firstName)) {
    showError("firstNameError", "Imię nie może zawierać cyfr.");
    isValid = false;
  } else {
    clearError("firstNameError");
  }

  if (!lastName) {
    showError("lastNameError", "Nazwisko jest wymagane.");
    isValid = false;
  } else if (/\d/.test(lastName)) {
    showError("lastNameError", "Nazwisko nie może zawierać cyfr.");
    isValid = false;
  } else {
    clearError("lastNameError");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    showError("emailError", "E-mail jest wymagany.");
    isValid = false;
  } else if (!emailRegex.test(email)) {
    showError("emailError", "Podaj poprawny adres e-mail.");
    isValid = false;
  } else {
    clearError("emailError");
  }

  if (!message) {
    showError("messageError", "Wiadomość jest wymagana.");
    isValid = false;
  } else {
    clearError("messageError");
  }

  if (isValid) {
    const SUPABASE_URL = "https://tjfrebydgegcuznkgeti.supabase.co";
    const SUPABASE_KEY =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRqZnJlYnlkZ2VnY3V6bmtnZXRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgzOTkxNDgsImV4cCI6MjA5Mzk3NTE0OH0.14J1BLDlbfb-SuLQh1RZFFHCuXj3KTx6QEhxsUq-36M";
    fetch(`${SUPABASE_URL}/rest/v1/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
      },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        email: email,
        message: message,
      }),
    })
      .then((res) => {
        if (res.ok) {
          document.getElementById("successMessage").textContent =
            "Wiadomość wysłana pomyślnie!";
          contactForm.reset();
        } else {
          document.getElementById("successMessage").textContent =
            "Błąd podczas wysyłania. Spróbuj ponownie.";
        }
      })
      .catch(() => {
        document.getElementById("successMessage").textContent =
          "Błąd połączenia z serwerem.";
      });
  }
});

function showError(id, message) {
  document.getElementById(id).textContent = message;
}

function clearError(id) {
  document.getElementById(id).textContent = "";
}

fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    const skillsList = document.getElementById("skillsList");
    data.skills.forEach((skill) => {
      const li = document.createElement("li");
      li.textContent = skill;
      skillsList.appendChild(li);
    });

    const projectsList = document.getElementById("projectsList");
    data.projects.forEach((project) => {
      const li = document.createElement("li");
      li.innerHTML = `<strong>${project.name}</strong> – ${project.description} 
        <a href="${project.url}" target="_blank" rel="noopener noreferrer">Repo</a>`;
      projectsList.appendChild(li);
    });
  })
  .catch((error) => console.error("Błąd ładowania danych:", error));

const noteInput = document.getElementById("noteInput");
const addNoteButton = document.getElementById("addNoteButton");
const notesList = document.getElementById("notesList");

let notes = JSON.parse(localStorage.getItem("notes")) || [];

function renderNotes() {
  notesList.innerHTML = "";
  notes.forEach((note, index) => {
    const li = document.createElement("li");
    li.className = "note-item";
    li.innerHTML = `
      <span>${note}</span>
      <button class="delete-note" data-index="${index}">Usuń</button>
    `;
    notesList.appendChild(li);
  });
}

function saveNotes() {
  localStorage.setItem("notes", JSON.stringify(notes));
}

addNoteButton.addEventListener("click", () => {
  const text = noteInput.value.trim();
  if (!text) return;
  notes.push(text);
  saveNotes();
  renderNotes();
  noteInput.value = "";
});

notesList.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-note")) {
    const index = e.target.getAttribute("data-index");
    notes.splice(index, 1);
    saveNotes();
    renderNotes();
  }
});

renderNotes();

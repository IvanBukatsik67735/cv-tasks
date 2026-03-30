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

// Toggle mobile menu
const menuButton = document.getElementById('menuButton');
const nav = document.querySelector('nav');

menuButton.addEventListener('click', () => {
  nav.classList.toggle('show');
});



// Display last modified date
document.getElementById("lastModified").textContent =
  "Last Modified: " + document.lastModified;

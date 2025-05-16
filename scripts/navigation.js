// navigation.js
const menuButton = document.getElementById('menuButton');
const nav = document.getElementById('mainNav');

menuButton.addEventListener('click', () => {
  nav.classList.toggle('show');
});


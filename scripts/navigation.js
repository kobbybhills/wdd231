// Toggle mobile menu
document.getElementById("menuButton").addEventListener("click", () => {
    document.getElementById("navMenu").classList.toggle("open");
  });
  
  // Display last modified date
  document.getElementById("lastModified").textContent =
    "Last Update: " + document.lastModified;
  
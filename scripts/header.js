document.addEventListener("DOMContentLoaded", () => {
const toggleBtn = document.getElementById('menuToggle');
    const navContainer = document.getElementById('nav-container');
  
    if (toggleBtn && navContainer) {
      toggleBtn.addEventListener('click', () => {
        navContainer.classList.toggle('active');
      });
    }
  });
document.addEventListener('DOMContentLoaded', function() {
    // Create hamburger menu element
    const navBar = document.querySelector('.nav_bar');
    const rightMenu = document.querySelector('.right');
    
    const hamburger = document.createElement('div');
    hamburger.className = 'hamburger';
    hamburger.innerHTML = '☰';
    
    // Add hamburger to the nav_bar
    navBar.appendChild(hamburger);
    
    // Add click event to toggle menu
    hamburger.addEventListener('click', function() {
        rightMenu.classList.toggle('active');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!navBar.contains(event.target)) {
            rightMenu.classList.remove('active');
        }
    });
});
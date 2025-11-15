// Preloader
window.addEventListener('load', function() {
    // Add 'loaded' class to body when page is fully loaded
    document.body.classList.add('loaded');
    
    // Remove preloader after animation completes
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        setTimeout(function() {
            preloader.style.display = 'none';
        }, 1000); // Match this duration with your CSS transition timing
    }
});

// Add click event to close preloader if needed (optional)
document.addEventListener('DOMContentLoaded', function() {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.addEventListener('click', function() {
            this.style.display = 'none';
            document.body.classList.add('loaded');
        });
    }
});

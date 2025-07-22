// Mobile menu toggle
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        }
    });
});

// Music player functionality
const playButtons = document.querySelectorAll('.play-btn');
let currentlyPlaying = null;

playButtons.forEach(button => {
    button.addEventListener('click', function() {
        const trackId = this.getAttribute('data-track');
        const progressBar = document.getElementById(`progress-${trackId}`);
        const icon = this.querySelector('i');
        
        // If this track is already playing, pause it
        if (currentlyPlaying === trackId) {
            icon.classList.remove('fa-pause');
            icon.classList.add('fa-play');
            currentlyPlaying = null;
            clearInterval(window[`${trackId}Interval`]);
            return;
        }
        
        // If another track is playing, stop it
        if (currentlyPlaying) {
            const currentButton = document.querySelector(`[data-track="${currentlyPlaying}"]`);
            const currentIcon = currentButton.querySelector('i');
            currentIcon.classList.remove('fa-pause');
            currentIcon.classList.add('fa-play');
            clearInterval(window[`${currentlyPlaying}Interval`]);
            document.getElementById(`progress-${currentlyPlaying}`).style.width = '0%';
        }
        
        // Play this track
        icon.classList.remove('fa-play');
        icon.classList.add('fa-pause');
        currentlyPlaying = trackId;
        
        // Simulate progress
        let progress = 0;
        progressBar.style.width = '0%';
        
        window[`${trackId}Interval`] = setInterval(() => {
            progress += 0.5;
            progressBar.style.width = `${progress}%`;
            
            if (progress >= 100) {
                clearInterval(window[`${trackId}Interval`]);
                icon.classList.remove('fa-pause');
                icon.classList.add('fa-play');
                currentlyPlaying = null;
            }
        }, 100);
    });
});

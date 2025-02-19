document.addEventListener('DOMContentLoaded', function() {
    // Carousel functionality
    const track = document.querySelector('.carousel-track');
    const cards = document.querySelectorAll('.recipe-card');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    
    let currentIndex = 0;
    const cardWidth = cards[0].offsetWidth + 32; // Including gap
    const maxIndex = cards.length - Math.floor(track.offsetWidth / cardWidth);

    function updateCarousel() {
        track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
        
        // Update button states
        prevButton.style.opacity = currentIndex === 0 ? '0.5' : '1';
        nextButton.style.opacity = currentIndex >= maxIndex ? '0.5' : '1';
    }

    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });

    nextButton.addEventListener('click', () => {
        if (currentIndex < maxIndex) {
            currentIndex++;
            updateCarousel();
        }
    });

    // Mobile menu functionality
    const mobileMenuButton = document.querySelector('.mobile-menu');
    const navigation = document.querySelector('.navigation');

    mobileMenuButton.addEventListener('click', () => {
        navigation.style.display = navigation.style.display === 'block' ? 'none' : 'block';
    });

    // Responsive navigation
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            navigation.style.display = 'block';
        } else {
            navigation.style.display = 'none';
        }
    });

    // Initialize carousel
    updateCarousel();

    // Manejo del estado de login
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const username = localStorage.getItem('username');
    
    updateUserMenuState(isLoggedIn, username);

    // Manejo del logout
    const logoutButton = document.querySelector('.logout');
    if (logoutButton) {
        logoutButton.addEventListener('click', function(e) {
            e.preventDefault();
            if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
                localStorage.removeItem('isLoggedIn');
                localStorage.removeItem('username');
                updateUserMenuState(false);
                window.location.href = '/index.html';
            }
        });
    }
});

function updateUserMenuState(isLoggedIn, username = 'Usuario') {
    const guestText = document.querySelector('.guest-text');
    const userText = document.querySelector('.user-text');
    const guestItems = document.querySelector('.guest-items');
    const userItems = document.querySelector('.user-items');

    if (isLoggedIn) {
        guestText.style.display = 'none';
        userText.style.display = 'block';
        userText.textContent = username;
        guestItems.style.display = 'none';
        userItems.style.display = 'block';
    } else {
        guestText.style.display = 'block';
        userText.style.display = 'none';
        guestItems.style.display = 'block';
        userItems.style.display = 'none';
    }
} 

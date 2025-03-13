// Define baseUrl as a global variable
let baseUrl;

if (window.location.hostname.includes('pablistenico.github.io')) {
    // GitHub Pages environment
    baseUrl = 'https://pablistenico.github.io/PWM';
} else {
    // Local development environment
    baseUrl = '';
}

// Make baseUrl available globally
window.baseUrl = baseUrl;

// Función para navegar a una ruta
function navigateTo(path) {
    window.location.href = `${window.baseUrl}/${path}`;
}

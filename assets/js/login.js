document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('.login-form');
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        const errorMessage = document.getElementById('password-error'); 
        
        // Aquí normalmente irían las validaciones y la llamada al backend

        if (password !== confirmPassword) {
            alert('Las contraseñas no coinciden. Por favor, verifica.');
            return;
        }

        console.log('Intento de inicio de sesión con:', { username, email, password, confirmPassword });
        
        // Simulamos un inicio de sesión exitoso
        alert('¡Inicio de sesión exitoso!');
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', email.split('@')[0]);
        window.location.href = 'weekly-planner.html';
    });

    // Manejadores para los botones de redes sociales
    const socialButtons = document.querySelectorAll('.social-button');
    socialButtons.forEach(button => {
        button.addEventListener('click', function() {
            const provider = this.classList.contains('google') ? 'Google' : 'Facebook';
            alert(`Inicio de sesión con ${provider} (simulado)`);
        });
    });
}); 
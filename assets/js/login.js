document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('.login-form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const rememberMeCheckbox = document.querySelector('input[type="checkbox"]');
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = emailInput.value;
        const password = passwordInput.value;

        // Aquí normalmente irían las validaciones y la llamada al backend
        fetch('../data/users.json')
            .then(response => response.json())
            .then(data => {
                const users = data.users;
                const user = users.find(u => u.email === email && u.password === password);

                if (user) {
                    // Store user data
                    const userData = {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        avatar: user.avatar,
                        favoriteRecipes: user.favoriteRecipes,
                        createdRecipes: user.createdRecipes,
                        savedRecipes: user.savedRecipes
                    };

                    // If remember me is checked, store in localStorage instead
                    if (rememberMeCheckbox.checked) {
                        localStorage.setItem('user', JSON.stringify(userData));
                        localStorage.setItem('isLoggedIn', 'true');
                        localStorage.setItem('username', email.split('@')[0]);
                    } else {
                        sessionStorage.setItem('user', JSON.stringify(userData));
                        sessionStorage.setItem('isLoggedIn', 'true');
                        sessionStorage.setItem('username', email.split('@')[0]);
                    }

                    // Show success message
                    alert(`¡Bienvenido/a ${user.name}! Has iniciado sesión correctamente.`);
                    
                    // Redirect to profile page after the alert
                    window.location.href = '/src/profile.html';
                } else {
                    // Show error message with more details
                    alert('Error al iniciar sesión:\n- Verifica que el email y la contraseña sean correctos\n- Si no tienes cuenta, regístrate primero');
                }
            })
            .catch(error => {
                console.error('Error loading users:', error);
                alert('Error al cargar los datos de usuarios. Por favor, inténtalo de nuevo más tarde.');
            });
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

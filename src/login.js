document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('.login-form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const rememberMeCheckbox = document.querySelector('input[type="checkbox"]');

    // Load users data
    fetch('../data/users.json')
        .then(response => response.json())
        .then(data => {
            const users = data.users;

            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const email = emailInput.value;
                const password = passwordInput.value;

                // Find user
                const user = users.find(u => u.email === email && u.password === password);

                if (user) {
                    // Store user data in sessionStorage
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
                    } else {
                        sessionStorage.setItem('user', JSON.stringify(userData));
                        sessionStorage.setItem('isLoggedIn', 'true');
                    }

                    // Redirect to profile page
                    window.location.href = 'profile.html';
                } else {
                    alert('Email o contraseña incorrectos');
                }
            });
        })
        .catch(error => {
            console.error('Error loading users:', error);
            alert('Error al cargar los datos de usuarios');
        });

    // Manejadores para los botones de redes sociales (si existen)
    const socialButtons = document.querySelectorAll('.social-button');
    socialButtons.forEach(button => {
        button.addEventListener('click', function() {
            const provider = this.classList.contains('google') ? 'Google' : 'Facebook';
            alert(`Inicio de sesión con ${provider} (simulado)`);
        });
    });
}); 

document.addEventListener('DOMContentLoaded', function() {
    // Verificar si el usuario está logueado
    const userData = JSON.parse(localStorage.getItem('user')) || JSON.parse(sessionStorage.getItem('user'));
    const isLoggedIn = localStorage.getItem('isLoggedIn') || sessionStorage.getItem('isLoggedIn');

    if (!isLoggedIn || !userData) {
        window.location.href = '/src/login.html';
        return;
    }

    // Cargar datos del usuario en la interfaz
    const userNameDisplay = document.querySelector('.user-info span');
    const profileImage = document.querySelector('.profile-image img');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');

    if (userNameDisplay) userNameDisplay.textContent = userData.name;
    if (profileImage) profileImage.src = userData.avatar;
    if (nameInput) nameInput.value = userData.name;
    if (emailInput) emailInput.value = userData.email;

    // Manejo de navegación en la sidebar
    const sidebarItems = document.querySelectorAll('.sidebar-nav li[data-view]');
    const views = document.querySelectorAll('.content-panel section');

    sidebarItems.forEach(item => {
        item.addEventListener('click', function() {
            const viewName = this.dataset.view;
            
            // Actualizar clases activas en sidebar
            sidebarItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            
            // Mostrar vista correspondiente
            views.forEach(view => {
                view.classList.remove('active');
                if (view.id === `${viewName}-view`) {
                    view.classList.add('active');
                }
            });
        });
    });

    // Manejo del formulario de perfil
    const profileForm = document.querySelector('.profile-form');
    profileForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = {
            name: document.getElementById('name').value,
            description: document.getElementById('description').value,
            email: document.getElementById('email').value
        };

        // Actualizar datos en el storage
        userData.name = formData.name;
        userData.email = formData.email;
        
        if (localStorage.getItem('user')) {
            localStorage.setItem('user', JSON.stringify(userData));
        } else {
            sessionStorage.setItem('user', JSON.stringify(userData));
        }

        // Actualizar nombre en la sidebar
        if (userNameDisplay) userNameDisplay.textContent = formData.name;

        alert('Perfil actualizado correctamente');
    });

    // Manejo del formulario de seguridad
    const securityForm = document.querySelector('.security-form');
    securityForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const currentPassword = document.getElementById('current-password').value;
        const newPassword = document.getElementById('new-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        if (newPassword !== confirmPassword) {
            alert('Las contraseñas no coinciden');
            return;
        }

        console.log('Actualizando contraseña...');
        alert('Contraseña actualizada correctamente');
        this.reset();
    });

    // Manejo del botón de cerrar sesión
    const logoutButton = document.querySelector('.logout');
    logoutButton.addEventListener('click', function() {
        if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
            // Limpiar datos de sesión
            localStorage.removeItem('user');
            localStorage.removeItem('isLoggedIn');
            sessionStorage.removeItem('user');
            sessionStorage.removeItem('isLoggedIn');
            window.location.href = '/src/login.html';
        }
    });

    // Manejo del cambio de foto de perfil
    const changePhotoButton = document.querySelector('.change-photo');
    changePhotoButton.addEventListener('click', function() {
        // Aquí normalmente iría un input file, pero lo simulamos
        alert('Funcionalidad de cambio de foto (simulada)');
    });

    // Manejar formulario de ajustes
    const settingsForm = document.querySelector('.settings-form');
    if (settingsForm) {
        settingsForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const settings = {
                emailNotifications: document.getElementById('emailNotif').checked,
                weeklyDigest: document.getElementById('weeklyDigest').checked,
                language: document.getElementById('language').value,
                darkMode: document.getElementById('darkMode').checked,
                publicProfile: document.getElementById('publicProfile').checked,
                shareRecipes: document.getElementById('shareRecipes').checked
            };
            
            // Guardar ajustes en el objeto de usuario
            userData.settings = settings;
            if (localStorage.getItem('user')) {
                localStorage.setItem('user', JSON.stringify(userData));
            } else {
                sessionStorage.setItem('user', JSON.stringify(userData));
            }
            
            alert('Ajustes guardados correctamente');
        });
    }

    // Cargar ajustes guardados del usuario
    if (settingsForm && userData.settings) {
        const settings = userData.settings;
        document.getElementById('emailNotif').checked = settings.emailNotifications ?? true;
        document.getElementById('weeklyDigest').checked = settings.weeklyDigest ?? false;
        document.getElementById('language').value = settings.language ?? 'es';
        document.getElementById('darkMode').checked = settings.darkMode ?? false;
        document.getElementById('publicProfile').checked = settings.publicProfile ?? true;
        document.getElementById('shareRecipes').checked = settings.shareRecipes ?? true;
    }
}); 

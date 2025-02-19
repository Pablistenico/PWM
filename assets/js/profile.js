document.addEventListener('DOMContentLoaded', function() {
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
        console.log('Actualizando perfil:', formData);
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
            window.location.href = '/index.html';
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
            
            console.log('Guardando ajustes:', settings);
            // Aquí iría la lógica para guardar los ajustes
            alert('Ajustes guardados correctamente');
        });
    }

    // Cargar ajustes guardados (simulado)
    const savedSettings = {
        emailNotifications: true,
        weeklyDigest: false,
        language: 'es',
        darkMode: false,
        publicProfile: true,
        shareRecipes: true
    };

    // Aplicar ajustes guardados
    if (settingsForm) {
        document.getElementById('emailNotif').checked = savedSettings.emailNotifications;
        document.getElementById('weeklyDigest').checked = savedSettings.weeklyDigest;
        document.getElementById('language').value = savedSettings.language;
        document.getElementById('darkMode').checked = savedSettings.darkMode;
        document.getElementById('publicProfile').checked = savedSettings.publicProfile;
        document.getElementById('shareRecipes').checked = savedSettings.shareRecipes;
    }
}); 

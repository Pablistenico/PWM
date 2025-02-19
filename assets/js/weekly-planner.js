document.addEventListener('DOMContentLoaded', function() {
    // Manejador para los botones de bookmark
    const bookmarkButtons = document.querySelectorAll('.bookmark-btn');
    bookmarkButtons.forEach(button => {
        button.addEventListener('click', function() {
            const icon = this.querySelector('i');
            icon.classList.toggle('fas');
            icon.classList.toggle('far');
        });
    });

    // Manejador para los filtros
    const filters = document.querySelectorAll('select');
    filters.forEach(filter => {
        filter.addEventListener('change', function() {
            console.log(`Filtro ${this.previousElementSibling.textContent}: ${this.value}`);
            // Aquí iría la lógica para filtrar las recetas
        });
    });

    // Manejador para el botón de generar receta
    const generateButton = document.querySelector('.generate-button');
    generateButton.addEventListener('click', function() {
        alert('Generando nuevas recetas para tu menú semanal...');
        // Aquí iría la lógica para generar nuevas recetas
    });

    // Manejador para los botones de ver receta
    const recipeButtons = document.querySelectorAll('.recipe-button');
    recipeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const recipeName = this.parentElement.querySelector('h4').textContent;
            alert(`Viendo detalles de: ${recipeName}`);
            // Aquí iría la navegación a la página de la receta
        });
    });
}); 

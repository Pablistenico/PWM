document.addEventListener('DOMContentLoaded', function() {
    // Inicializar la lista de recetas del blog
    new BlogRecipesList('.blog-recipes-list');

    // Manejo de categorías
    const categoryItems = document.querySelectorAll('.category-item input');
    categoryItems.forEach(item => {
        item.addEventListener('change', function() {
            const selectedCategories = Array.from(categoryItems)
                .filter(checkbox => checkbox.checked)
                .map(checkbox => checkbox.nextElementSibling.textContent);
            
            console.log('Categorías seleccionadas:', selectedCategories);
            // Aquí iría la lógica para filtrar las recetas
        });
    });

    // Manejo de paginación
    const pageButtons = document.querySelectorAll('.page-item');
    pageButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.classList.contains('active')) return;

            // Actualizar botón activo
            pageButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            const page = this.textContent;
            console.log('Cambiando a página:', page);
            // Aquí iría la lógica para cargar la página correspondiente
        });
    });

    // Manejo de las tarjetas de recetas
    const recipeCards = document.querySelectorAll('.recipe-card');
    recipeCards.forEach(card => {
        const button = card.querySelector('.recipe-button');
        button.addEventListener('click', function() {
            const recipeTitle = card.querySelector('h3').textContent;
            console.log('Ver receta:', recipeTitle);

            window.location.href = `${window.baseUrl}/src/recipe.html?title=${encodeURIComponent(recipeTitle)}`;
        });
    });
});

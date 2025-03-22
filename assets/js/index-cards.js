document.addEventListener('DOMContentLoaded', function() {
    // Inicializar la lista de recetas del blog
    new BlogRecipesList('.blog-recipes-list');
    
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

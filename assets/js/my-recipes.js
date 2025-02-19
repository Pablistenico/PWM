document.addEventListener('DOMContentLoaded', function() {
    // Manejador para botones de editar
    const editButtons = document.querySelectorAll('.edit-btn');
    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            const recipeId = this.closest('.recipe-card').dataset.id;
            window.location.href = `/pages/recipe-generator.html?id=${recipeId}`;
        });
    });

    // Manejador para botones de eliminar
    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (confirm('¿Estás seguro de que quieres eliminar esta receta?')) {
                const recipeCard = this.closest('.recipe-card');
                recipeCard.remove();
                // Aquí iría la lógica para eliminar la receta de la base de datos
            }
        });
    });
}); 

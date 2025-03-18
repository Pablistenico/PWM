class MyRecipesList {
    constructor(containerId, option) {
        this.container = document.querySelector(containerId);
        this.option = option;
        this.myRecipes = [];
        this.init();
    }

    async init() {
        await this.loadMyRecipes();
        this.render();
        this.addEventListeners();
    }

    async loadMyRecipes() {
        try {
            const response = await fetch('../data/my-recipes.json');
            const data = await response.json();
            this.myRecipes = data.myRecipes.filter(recipe => recipe.option === this.option);
        } catch (error) {
            console.error('Error cargando recetas:', error);
            this.myRecipes = [];
        }
    }

    render() {
        if (!this.container) return;

        if (this.myRecipes.length === 0) {
            this.container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-bookmark"></i>
                    <h2>No tienes recetas guardadas</h2>
                    <p>Explora recetas y guárdalas para verlas aquí</p>
                </div>`;
            return;
        }

        const template = this.myRecipes.map(recipe => `
            <recipe-card 
                option="${recipe.option}" 
                title="${recipe.title}" 
                time="${recipe.time}" 
                difficulty="${recipe.difficulty}" 
                categories="${recipe.categories.join(', ')}" 
                image="${recipe.image}" 
                alt="${recipe.title}">
            </recipe-card>
        `).join('');

        this.container.innerHTML = template;
    }
}

// Inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.querySelector('.tablink.active').click();
    }, 100);
    new MyRecipesList('#my-recipes .my-recipes-list', 'created');
    new MyRecipesList('#saved-recipes .my-recipes-list', 'saved');
}); 
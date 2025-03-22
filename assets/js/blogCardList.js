class BlogRecipesList {
    constructor(containerId) {
        this.container = document.querySelector(containerId);
        this.blogRecipes = [];
        this.init();
    }

    async init() {
        await this.loadBlogRecipes();
        this.render();
    }

    async loadBlogRecipes() {
        try {
            console.log("111111")
            const response = await fetch('/data/recipes.json');
            
            console.log({aaa: "22222", response: response})
            const data = await response.json();
            console.log("333333")
            this.blogRecipes = data['blog-recipes'];
            console.log("444444")
        } catch (error) {
            console.log("eeeooo")
            console.error('Error cargando recetas del blog:', error);
            this.blogRecipes = [];
        }
    }

    render() {
        if (!this.container) return;

        if (this.blogRecipes.length === 0) {
            this.container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-book"></i>
                    <h2>No hay recetas disponibles</h2>
                    <p>Vuelve más tarde para ver nuevas recetas</p>
                </div>`;
            return;
        }

        const template = this.blogRecipes.map(recipe => `
            <recipe-blog-card 
                title="${recipe.title}"
                description="${recipe.description}"
                categories="${recipe.categories.join(', ')}"
                image="${recipe.image}"
                alt="${recipe.alt}"
                rate="${recipe.rate}"
                chefName="${recipe.chefName}"
                chefImage="${recipe.chefImage}">
            </recipe-blog-card>
        `).join('');

        this.container.innerHTML = template;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new BlogRecipesList('#blog-recipes .blog-recipes-list');
});

class WeeklyPlanner {
    constructor() {
        this.planner = {};
        this.recipes = [];
        this.daysGrid = document.querySelector('.days-grid');
        this.init();
    }

    async init() {
        await this.loadRecipesData();
        this.render();
        this.setupFilterListeners();
    }

    async loadRecipesData() {
        try {
            const response = await fetch('../data/recipes.json');
            const data = await response.json();
            this.recipes = data.recipes;
            this.planner = data.weeklyPlan;
        } catch (error) {
            console.error('Error loading recipes:', error);
            this.recipes = [];
            this.planner = {};
        }
    }

    render() {
        if (!this.daysGrid) return;

        const days = Object.keys(this.planner);
        
        this.daysGrid.innerHTML = days.map(day => {
            const recipeId = this.planner[day];
            const recipe = this.recipes.find(r => r.id === recipeId.toString());
            
            if (!recipe) {
                return `
                    <div class="day-card">
                        <h3>${day}</h3>
                        <div class="empty-recipe">
                            <p>No hay receta asignada</p>
                            <button class="add-recipe-btn">Añadir receta</button>
                        </div>
                    </div>
                `;
            }

            return `
                <div class="day-card">
                    <h3>${day}</h3>
                    <recipe-card 
                        option="planner"
                        title="${recipe.title}" 
                        time="${recipe.time}" 
                        difficulty="${recipe.difficulty}" 
                        categories="${recipe.categories.join(', ')}"
                        image="${recipe.image}" 
                        alt="${recipe.alt}"
                        day="${day}">
                    </recipe-card>
                </div>
            `;
        }).join('');
    }

    setupFilterListeners() {
        const filterSelects = document.querySelectorAll('.filters-section select');
        
        filterSelects.forEach(select => {
            select.addEventListener('change', () => this.applyFilters());
        });
    }

    applyFilters() {
        const dietType = document.querySelector('select[name="diet-type"]').value;
        const prepTime = document.querySelector('select[name="prep-time"]').value;
        const difficulty = document.querySelector('select[name="difficulty"]').value;

        // Filter recipes based on selected criteria
        const filteredRecipes = this.recipes.filter(recipe => {
            if (dietType && !recipe.categories.join(', ').toLowerCase().includes(dietType.toLowerCase())) {
                return false;
            }
            
            if (prepTime) {
                const recipeTime = parseInt(recipe.time);
                const maxTime = parseInt(prepTime);
                if (recipeTime > maxTime) {
                    return false;
                }
            }
            
            if (difficulty && recipe.difficulty.toLowerCase() !== difficulty.toLowerCase()) {
                return false;
            }
            
            return true;
        });

        // Update planner with filtered recipes
        if (filteredRecipes.length > 0) {
            const days = Object.keys(this.planner);
            days.forEach((day, index) => {
                const recipeIndex = index % filteredRecipes.length;
                this.planner[day] = filteredRecipes[recipeIndex].id;
            });
            
            this.render();
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new WeeklyPlanner();
}); 

// ===== Recipe Data =====
const recipes = [
  {
    id: 1,
    title: "Creamy Garlic Pasta",
    time: 25,
    difficulty: "easy",
    description: "A quick and creamy pasta dish perfect for busy weeknights.",
    category: "pasta",
  },
  {
    id: 2,
    title: "Chicken Curry",
    time: 60,
    difficulty: "medium",
    description: "A flavorful Indian-style chicken curry with rich spices.",
    category: "curry",
  },
  {
    id: 3,
    title: "Avocado Salad",
    time: 15,
    difficulty: "easy",
    description: "A fresh and healthy salad with avocado and citrus dressing.",
    category: "salad",
  },
  {
    id: 4,
    title: "Beef Stroganoff",
    time: 70,
    difficulty: "hard",
    description: "Classic beef stroganoff with tender meat and creamy sauce.",
    category: "beef",
  },
  {
    id: 5,
    title: "Vegetable Stir Fry",
    time: 30,
    difficulty: "medium",
    description: "Colorful vegetables tossed in a savory soy-based sauce.",
    category: "vegetarian",
  },
  {
    id: 6,
    title: "Margherita Pizza",
    time: 90,
    difficulty: "hard",
    description:
      "Homemade pizza with fresh basil, mozzarella, and tomato sauce.",
    category: "pizza",
  },
  {
    id: 7,
    title: "Lemon Rice",
    time: 20,
    difficulty: "easy",
    description: "A light and tangy rice dish with lemon and spices.",
    category: "rice",
  },
  {
    id: 8,
    title: "Paneer Butter Masala",
    time: 50,
    difficulty: "medium",
    description: "Creamy tomato-based curry with soft paneer cubes.",
    category: "curry",
  },
];

// ===== DOM Selection =====
const recipeContainer = document.querySelector("#recipe-container");

// ===== Create Recipe Card =====
const createRecipeCard = (recipe) => {
  return `
    <div class="recipe-card" data-id="${recipe.id}">
      <h3>${recipe.title}</h3>
      <div class="recipe-meta">
        <span>⏱️ ${recipe.time} min</span>
        <span class="difficulty ${recipe.difficulty}">
          ${recipe.difficulty}
        </span>
      </div>
      <p>${recipe.description}</p>
    </div>
  `;
};

// ===== Render Recipes =====
const renderRecipes = (recipesToRender) => {
  const recipeHTML = recipesToRender
    .map((recipe) => createRecipeCard(recipe))
    .join("");

  recipeContainer.innerHTML = recipeHTML;
};

// ===== Initialize App =====
renderRecipes(recipes);

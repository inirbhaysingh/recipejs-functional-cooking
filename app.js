// ===== Recipe Data (Immutable) =====
const recipes = [
  {
    id: 1,
    title: "Creamy Garlic Pasta",
    time: 25,
    difficulty: "easy",
    description: "A quick and creamy pasta dish for busy weeknights.",
    category: "pasta",
  },
  {
    id: 2,
    title: "Chicken Curry",
    time: 60,
    difficulty: "medium",
    description: "A flavorful curry with rich spices.",
    category: "curry",
  },
  {
    id: 3,
    title: "Avocado Salad",
    time: 15,
    difficulty: "easy",
    description: "A fresh and healthy salad with citrus dressing.",
    category: "salad",
  },
  {
    id: 4,
    title: "Beef Stroganoff",
    time: 70,
    difficulty: "hard",
    description: "Classic beef dish with creamy sauce.",
    category: "beef",
  },
  {
    id: 5,
    title: "Vegetable Stir Fry",
    time: 30,
    difficulty: "medium",
    description: "Colorful vegetables in a savory sauce.",
    category: "vegetarian",
  },
  {
    id: 6,
    title: "Margherita Pizza",
    time: 90,
    difficulty: "hard",
    description: "Homemade pizza with basil and mozzarella.",
    category: "pizza",
  },
  {
    id: 7,
    title: "Lemon Rice",
    time: 20,
    difficulty: "easy",
    description: "Light and tangy rice dish.",
    category: "rice",
  },
  {
    id: 8,
    title: "Paneer Butter Masala",
    time: 50,
    difficulty: "medium",
    description: "Creamy tomato curry with paneer.",
    category: "curry",
  },
];

// ===== DOM Selection =====
const recipeContainer = document.querySelector("#recipe-container");
const filterButtons = document.querySelectorAll("[data-filter]");
const sortButtons = document.querySelectorAll("[data-sort]");

// ===== UI State =====
let currentFilter = "all";
let currentSort = null;

// ===== Create Recipe Card =====
const createRecipeCard = (recipe) => {
  return `
    <div class="recipe-card" data-id="${recipe.id}">
      <h3>${recipe.title}</h3>
      <div class="recipe-meta">
        <span>${recipe.time} min</span>
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
  recipeContainer.innerHTML = recipesToRender
    .map((recipe) => createRecipeCard(recipe))
    .join("");
};

// ===== Pure Filter Function =====
const filterRecipes = (recipes, filter) => {
  switch (filter) {
    case "easy":
    case "medium":
    case "hard":
      return recipes.filter((recipe) => recipe.difficulty === filter);

    case "quick":
      return recipes.filter((recipe) => recipe.time < 30);

    default:
      return recipes;
  }
};

// ===== Pure Sort Function =====
const sortRecipes = (recipes, sortType) => {
  const copy = [...recipes];

  if (sortType === "name") {
    return copy.sort((a, b) => a.title.localeCompare(b.title));
  }

  if (sortType === "time") {
    return copy.sort((a, b) => a.time - b.time);
  }

  return copy;
};

// ===== Central Update Function =====
const updateDisplay = () => {
  const filtered = filterRecipes(recipes, currentFilter);
  const sorted = sortRecipes(filtered, currentSort);
  renderRecipes(sorted);
};

// ===== Event Listeners =====
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentFilter = button.dataset.filter;
    updateDisplay();
  });
});

sortButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentSort = button.dataset.sort;
    updateDisplay();
  });
});

// ===== Initialize App =====
updateDisplay();

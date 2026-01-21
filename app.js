(() => {
  // ===== Recipe Data =====
  const recipes = [
    {
      id: 1,
      title: "Creamy Garlic Pasta",
      time: 25,
      difficulty: "easy",
      description: "Quick creamy pasta.",
      ingredients: ["Pasta", "Garlic", "Cream", "Butter"],
      steps: [
        "Boil pasta",
        "Prepare sauce",
        ["Add garlic", "Add cream", "Mix well"],
        "Combine pasta and sauce",
      ],
    },
    {
      id: 2,
      title: "Chicken Curry",
      time: 60,
      difficulty: "medium",
      description: "Spiced chicken curry.",
      ingredients: ["Chicken", "Onion", "Tomato", "Spices"],
      steps: [
        "Marinate chicken",
        ["Heat oil", "Add onions", ["Cook until golden", "Add spices"]],
        "Add chicken",
        "Simmer",
      ],
    },
    {
      id: 3,
      title: "Avocado Salad",
      time: 15,
      difficulty: "easy",
      description: "Fresh salad.",
      ingredients: ["Avocado", "Lemon", "Salt"],
      steps: ["Chop avocado", "Mix ingredients", "Serve"],
    },
    {
      id: 4,
      title: "Beef Stroganoff",
      time: 70,
      difficulty: "hard",
      description: "Classic beef dish.",
      ingredients: ["Beef", "Mushrooms", "Cream"],
      steps: ["Cook beef", "Add mushrooms", "Add cream"],
    },
  ];

  // ===== DOM =====
  const container = document.querySelector("#recipe-container");
  const filterButtons = document.querySelectorAll("[data-filter]");
  const sortButtons = document.querySelectorAll("[data-sort]");

  let currentFilter = "all";
  let currentSort = null;

  // ===== Recursive Steps Renderer =====
  const renderSteps = (steps) => {
    return `
      <ul>
        ${steps
          .map((step) =>
            Array.isArray(step)
              ? `<li>${renderSteps(step)}</li>`
              : `<li>${step}</li>`,
          )
          .join("")}
      </ul>
    `;
  };

  // ===== Card Renderer =====
  const createRecipeCard = (recipe) => `
    <div class="recipe-card" data-id="${recipe.id}">
      <h3>${recipe.title}</h3>
      <div class="recipe-meta">
        <span>${recipe.time} min</span>
        <span class="difficulty ${recipe.difficulty}">${recipe.difficulty}</span>
      </div>
      <p>${recipe.description}</p>

      <div class="recipe-actions">
        <button data-action="toggle-ingredients">Ingredients</button>
        <button data-action="toggle-steps">Steps</button>
      </div>

      <div class="recipe-details ingredients">
        <strong>Ingredients:</strong>
        <ul>${recipe.ingredients.map((i) => `<li>${i}</li>`).join("")}</ul>
      </div>

      <div class="recipe-details steps">
        <strong>Steps:</strong>
        ${renderSteps(recipe.steps)}
      </div>
    </div>
  `;

  // ===== Render =====
  const renderRecipes = (list) => {
    container.innerHTML = list.map(createRecipeCard).join("");
  };

  // ===== Filters =====
  const filterRecipes = (list, filter) => {
    if (filter === "quick") return list.filter((r) => r.time < 30);
    if (["easy", "medium", "hard"].includes(filter))
      return list.filter((r) => r.difficulty === filter);
    return list;
  };

  // ===== Sorting =====
  const sortRecipes = (list, type) => {
    const copy = [...list];
    if (type === "name")
      return copy.sort((a, b) => a.title.localeCompare(b.title));
    if (type === "time") return copy.sort((a, b) => a.time - b.time);
    return copy;
  };

  // ===== Update Flow =====
  const updateDisplay = () => {
    const filtered = filterRecipes(recipes, currentFilter);
    const sorted = sortRecipes(filtered, currentSort);
    renderRecipes(sorted);
  };

  // ===== Events =====
  filterButtons.forEach((btn) =>
    btn.addEventListener("click", () => {
      currentFilter = btn.dataset.filter;
      updateDisplay();
    }),
  );

  sortButtons.forEach((btn) =>
    btn.addEventListener("click", () => {
      currentSort = btn.dataset.sort;
      updateDisplay();
    }),
  );

  // Event Delegation for Expand/Collapse
  container.addEventListener("click", (e) => {
    if (!e.target.dataset.action) return;

    const card = e.target.closest(".recipe-card");
    const section = card.querySelector(
      e.target.dataset.action === "toggle-ingredients"
        ? ".ingredients"
        : ".steps",
    );

    section.style.display =
      section.style.display === "block" ? "none" : "block";
  });

  // ===== Init =====
  updateDisplay();
})();

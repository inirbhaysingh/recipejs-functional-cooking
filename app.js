(() => {
  const recipes = [
    {
      id: 1,
      title: "Creamy Garlic Pasta",
      time: 25,
      difficulty: "easy",
      description: "Quick creamy pasta.",
      ingredients: ["Pasta", "Garlic", "Cream", "Butter"],
      steps: ["Boil pasta", ["Make sauce", "Add garlic", "Add cream"], "Mix"],
    },
    {
      id: 2,
      title: "Chicken Curry",
      time: 60,
      difficulty: "medium",
      description: "Spiced chicken curry.",
      ingredients: ["Chicken", "Onion", "Tomato", "Spices"],
      steps: ["Marinate chicken", ["Cook onions", ["Add spices"]], "Simmer"],
    },
    {
      id: 3,
      title: "Avocado Salad",
      time: 15,
      difficulty: "easy",
      description: "Fresh salad.",
      ingredients: ["Avocado", "Lemon", "Salt"],
      steps: ["Chop", "Mix", "Serve"],
    },
  ];

  const container = document.querySelector("#recipe-container");
  const counter = document.querySelector("#recipe-counter");
  const searchInput = document.querySelector("#search-input");
  const filterButtons = document.querySelectorAll("[data-filter]");
  const sortButtons = document.querySelectorAll("[data-sort]");

  let currentFilter = "all";
  let currentSort = null;
  let searchTerm = "";
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  const saveFavorites = () =>
    localStorage.setItem("favorites", JSON.stringify(favorites));

  const renderSteps = (steps) =>
    `<ul>${steps
      .map((s) =>
        Array.isArray(s) ? `<li>${renderSteps(s)}</li>` : `<li>${s}</li>`,
      )
      .join("")}</ul>`;

  const createCard = (r) => `
    <div class="recipe-card">
      <h3>${r.title}</h3>
      <div class="recipe-meta">
        <span>${r.time} min</span>
        <span class="difficulty ${r.difficulty}">${r.difficulty}</span>
      </div>
      <p>${r.description}</p>

      <div class="recipe-actions">
        <button data-action="ingredients">Ingredients</button>
        <button data-action="steps">Steps</button>
        <button class="favorite ${favorites.includes(r.id) ? "active" : ""}"
          data-action="favorite" data-id="${r.id}">
          Favorite
        </button>
      </div>

      <div class="recipe-details ingredients">
        <ul>${r.ingredients.map((i) => `<li>${i}</li>`).join("")}</ul>
      </div>

      <div class="recipe-details steps">
        ${renderSteps(r.steps)}
      </div>
    </div>
  `;

  const filterRecipes = (list) => {
    let result = [...list];

    if (currentFilter === "quick") result = result.filter((r) => r.time < 30);
    else if (currentFilter === "favorites")
      result = result.filter((r) => favorites.includes(r.id));
    else if (["easy", "medium", "hard"].includes(currentFilter))
      result = result.filter((r) => r.difficulty === currentFilter);

    if (searchTerm)
      result = result.filter(
        (r) =>
          r.title.toLowerCase().includes(searchTerm) ||
          r.ingredients.join(" ").toLowerCase().includes(searchTerm),
      );

    if (currentSort === "name")
      result.sort((a, b) => a.title.localeCompare(b.title));
    if (currentSort === "time") result.sort((a, b) => a.time - b.time);

    return result;
  };

  const updateDisplay = () => {
    const result = filterRecipes(recipes);
    container.innerHTML = result.map(createCard).join("");
    counter.textContent = `Showing ${result.length} of ${recipes.length} recipes`;
  };

  const debounce = (fn, delay = 300) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), delay);
    };
  };

  searchInput.addEventListener(
    "input",
    debounce((e) => {
      searchTerm = e.target.value.toLowerCase();
      updateDisplay();
    }),
  );

  filterButtons.forEach((b) =>
    b.addEventListener("click", () => {
      currentFilter = b.dataset.filter;
      updateDisplay();
    }),
  );

  sortButtons.forEach((b) =>
    b.addEventListener("click", () => {
      currentSort = b.dataset.sort;
      updateDisplay();
    }),
  );

  container.addEventListener("click", (e) => {
    const card = e.target.closest(".recipe-card");
    if (!card) return;

    if (e.target.dataset.action === "favorite") {
      const id = Number(e.target.dataset.id);
      favorites = favorites.includes(id)
        ? favorites.filter((f) => f !== id)
        : [...favorites, id];
      saveFavorites();
      updateDisplay();
    }

    if (e.target.dataset.action === "ingredients")
      card.querySelector(".ingredients").style.display ^= true;

    if (e.target.dataset.action === "steps")
      card.querySelector(".steps").style.display ^= true;
  });

  updateDisplay();
})();

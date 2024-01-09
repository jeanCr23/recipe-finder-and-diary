document.addEventListener("DOMContentLoaded", function () {
  loadRecipes();
});

function addRecipe() {
  const recipeName = document.getElementById("recipeName").value;
  const imageUrl = document.getElementById("imageUrl").value;
  const imageFile = document.getElementById("imageFile").files[0];
  const link = document.getElementById("link").value;

  if (!recipeName || (!imageUrl && !imageFile)) {
    alert("Recipe name and image are mandatory!");
    return;
  }

  let recipeImage;

  if (imageFile) {
    recipeImage = URL.createObjectURL(imageFile);
  } else {
    recipeImage = imageUrl;
  }

  const recipe = {
    name: recipeName,
    image: recipeImage,
    link: link || null,
  };

  saveRecipe(recipe);
  loadRecipes();
  clearForm();
}

function saveRecipe(recipe) {
  let recipes = JSON.parse(localStorage.getItem("recipes")) || [];
  recipes.push(recipe);
  localStorage.setItem("recipes", JSON.stringify(recipes));
}

function loadRecipes() {
  const recipeList = document.getElementById("recipeList");
  recipeList.innerHTML = "";

  const recipes = JSON.parse(localStorage.getItem("recipes")) || [];

  recipes.forEach((recipe, index) => {
    const recipeCard = document.createElement("div");
    recipeCard.classList.add("recipe-card");

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = () => deleteRecipe(index);

    const image = document.createElement("img");
    image.src = recipe.image;

    const name = document.createElement("h3");
    name.textContent = recipe.name;

    const link = document.createElement("a");
    if (recipe.link) {
      link.href = recipe.link;
      link.textContent = "Recipe Link";
      link.target = "_blank";
    }

    recipeCard.appendChild(deleteBtn);
    recipeCard.appendChild(image);
    recipeCard.appendChild(name);
    if (recipe.link) {
      recipeCard.appendChild(link);
    }

    recipeList.appendChild(recipeCard);
  });
}

function deleteRecipe(index) {
  let recipes = JSON.parse(localStorage.getItem("recipes")) || [];
  recipes.splice(index, 1);
  localStorage.setItem("recipes", JSON.stringify(recipes));
  loadRecipes();
}

function clearForm() {
  document.getElementById("recipeForm").reset();
}

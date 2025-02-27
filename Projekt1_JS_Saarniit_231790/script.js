document.addEventListener("DOMContentLoaded", () => {
  let roadData = {};
  fetch("roadmaps.json")
    .then((response) => response.json())
    .then((data) => {
      roadData = data;
      const menu = document.getElementById("menu");
      for (const category in roadData) {
        const li = document.createElement("li");
        li.className = "nav-item";
        li.innerHTML = `<a class="nav-link text-blue-500 hover:text-blue-700" href="#">${category}</a>`;
        menu.appendChild(li);
        li.addEventListener("click", () => displayRoadmap(category));
      }
    })
    .catch((error) => console.error("Viga:", error));

  const displayRoadmap = (category) => {
    const content = document.getElementById("content");
    content.innerHTML = ""; // Clear previous content
    const title = document.createElement("h1");
    title.className = "text-2xl font-bold my-4";
    title.innerText = category;
    content.appendChild(title);
    for (const technologies in roadData[category]) {
      const categoryTitle = document.createElement("h3");
      categoryTitle.className = "text-xl font-semibold my-2";
      categoryTitle.innerText = technologies;
      content.appendChild(categoryTitle);
      roadData[category][technologies].forEach(text => {
        const card = document.createElement("div");
        card.className = "bg-white shadow-md rounded-lg p-4 mb-4";
        card.innerHTML = `<div class="card-body">
                            <h5 class="text-lg font-bold">${text.name}</h5>
                            <p class="text-gray-700">${text.description}</p>
                          </div>`;
        content.appendChild(card);
      });
    }
  };
});
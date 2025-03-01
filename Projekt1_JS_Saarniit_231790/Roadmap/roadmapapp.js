document.addEventListener("DOMContentLoaded", () => {
  let roadData = {};
  let hasMovedUp = false; // Flag to ensure transition happens only once

  fetch("../roadmap/roadmaps.json")
    .then((response) => response.json())
    .then((data) => {
      roadData = data;
      console.log("Data fetched:", roadData); // Log fetched data
      document.getElementById('backend').addEventListener('click', () => {
        console.log("Backend button clicked");
        displayRoadmap('backend');
      });
      document.getElementById('frontend').addEventListener('click', () => {
        console.log("Frontend button clicked");
        displayRoadmap('frontend');
      });
      document.getElementById('fullstack').addEventListener('click', () => {
        console.log("Full Stack button clicked");
        displayRoadmap('fullstack');
      });
    })
    .catch((error) => console.error("Error:", error));

  const displayRoadmap = (category) => {
    const menuContainer = document.getElementById("menu-container");

    if (!hasMovedUp) {
      menuContainer.classList.add("moving-up");
      menuContainer.classList.remove("min-h-screen", "flex", "items-center", "justify-center");
      
      setTimeout(() => {
        showContent(category);
      }, 500);

      hasMovedUp = true;
    } else {
      showContent(category);
    }
  };

  const showContent = (category) => {
    const buttons = document.querySelectorAll("#menu-container button");
    buttons.forEach(button => {
      button.classList.remove("text-4xl", "py-8", "px-16");
      button.classList.add("text-base", "py-2", "px-4");
    });

    const content = document.getElementById("content");
    content.innerHTML = "";
    content.classList.remove("hidden");
    const title = document.createElement("h1");
    title.className = "text-9xl font-bold mb-24 mt-12 text-gray-800 text-center"; // Much bigger title and more spacing
    title.innerText = category;
    content.appendChild(title);
    for (const technologies in roadData[category]) {
      const categoryTitle = document.createElement("h3");
      categoryTitle.className = "text-5xl font-bold mt-16 mb-8 text-gray-800 text-center"; // More spacing
      categoryTitle.innerText = technologies;
      content.appendChild(categoryTitle);
      roadData[category][technologies].forEach(text => {
        const card = document.createElement("div");
        card.className = text.name.trim() === "JavaScript" || text.name.trim() === "Git" || text.name.trim() === "Github" || text.name.trim() === "PostgreSQL" || text.name.trim() === "JSON APId" || text.name.trim() === "Integratsiooni testid" || text.name.trim() === "Üksuse testid" || text.name.trim() === "Funktsionaalsuse testid" ? "yellow-item" : "red-item";
        card.innerHTML = `<div class="card-body">
                            <h5 class="text-3xl font-bold">${text.name}</h5>
                          </div>`;
        card.addEventListener("click", () => showModal(text.name, text.description, text.video_url));
        content.appendChild(card);
      });
    }
  };

  const showModal = (title, description, videoUrl) => {
    console.log("Showing modal for:", title); // Log modal details
    document.getElementById("modal-title").innerText = title;
    document.getElementById("modal-description").innerText = description;

    // Convert YouTube URL to embed URL
    const embedUrl = videoUrl.replace("watch?v=", "embed/");
    document.getElementById("modal-video").src = embedUrl;

    document.getElementById("modal").classList.remove("hidden");
  };

  document.getElementById("close-modal").addEventListener("click", () => {
    document.getElementById("modal").classList.add("hidden");
    document.getElementById("modal-video").src = ""; // Stop the video
  });
  const newsData = [
    {
        title: "New JavaScript Framework Released",
        category: "Tehnoloogia",
        description: "A new JavaScript framework has been released, offering improved performance and ease of use.",
        datetime: "2025-02-25",
        image: "https://via.placeholder.com/150"
    },
    {
        title: "Local Sports Team Wins Championship",
        category: "Sport",
        description: "The local sports team has won the championship in a thrilling final match.",
        datetime: "2025-02-24",
        image: "https://via.placeholder.com/150"
    },
    // Add more news objects here
  ];
});

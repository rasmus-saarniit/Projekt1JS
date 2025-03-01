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
    const mainTitle = document.getElementById("main-title");

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

    // Hide the "Developer Roadmap" title
    mainTitle.classList.add("hidden");

    // Shrink the buttons
    const buttons = document.querySelectorAll("#menu-container button");
    buttons.forEach(button => {
      button.classList.add("shrink");
    });
  };

  const showContent = (category) => {
    const buttons = document.querySelectorAll("#menu-container button");
    buttons.forEach(button => {
      button.classList.remove("text-4xl", "py-8", "px-16");
      button.classList.add("text-sm", "py-2", "px-4"); // Make buttons much smaller
    });

    const content = document.getElementById("content");
    content.innerHTML = "";
    content.classList.remove("hidden");
    content.className = `container mx-auto mt-8 text-center ${category}`; // Apply category-specific class
    const title = document.createElement("h1");
    title.className = "text-9xl font-bold mb-24 mt-12 text-gray-800 text-center"; // Much bigger title and more spacing
    title.innerText = category.charAt(0).toUpperCase() + category.slice(1);
    content.appendChild(title);
    for (const technologies in roadData[category]) {
      const categoryTitle = document.createElement("h3");
      categoryTitle.className = "text-5xl font-bold mt-1 mb-6 text-gray-800 text-center"; // More spacing
      categoryTitle.innerText = technologies;
      content.appendChild(categoryTitle);
      roadData[category][technologies].forEach(text => {
        const card = document.createElement("button");
        card.className = category === 'backend' ? "bg-blue-500 text-white py-2 px-4 rounded mb-4" :
                        category === 'frontend' ? "bg-green-500 text-white py-2 px-4 rounded mb-4" :
                        "bg-purple-500 text-white py-2 px-4 rounded mb-4";
        card.innerText = text.name;
        card.style.marginBottom = "2rem"; // Add margin between buttons
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

    const modal = document.getElementById("modal");
    modal.classList.remove("hidden");
    modal.scrollTop = 0; // Ensure modal starts from the top
    document.body.style.overflow = "hidden"; // Make background unscrollable

    // Adjust modal position for mobile devices
    if (window.innerWidth <= 768) {
      modal.style.top = "0";
      modal.style.height = "100vh";
    }
  };

  document.getElementById("close-modal").addEventListener("click", () => {
    const modal = document.getElementById("modal");
    modal.classList.add("hidden");
    document.getElementById("modal-video").src = ""; // Stop the video
    document.body.style.overflow = "auto"; // Make background scrollable again
  });

  // Hide menu on scroll
  let lastScrollTop = 0;
  window.addEventListener("scroll", () => {
    const st = window.pageYOffset || document.documentElement.scrollTop;
    const menuContainer = document.getElementById("menu-container");
    const buttons = document.querySelectorAll("#menu-container button");
    if (st > lastScrollTop) {
      menuContainer.style.opacity = "0"; // Fade out menu on scroll down
      buttons.forEach(button => button.classList.add("faded")); // Add faded class
    } else {
      menuContainer.style.opacity = "1"; // Fade in menu on scroll up
      buttons.forEach(button => button.classList.remove("faded")); // Remove faded class
    }
    lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
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

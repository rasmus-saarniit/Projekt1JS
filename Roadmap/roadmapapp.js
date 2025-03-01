document.addEventListener("DOMContentLoaded", () => {
  let roadData = {};
  let hasMovedUp = false; // flag, et tagada üleminek ainult üks kord

  // Andmete toomine JSON-failist
  fetch("roadmaps.json") // Muudetud URL
    .then((response) => response.json())
    .then((data) => {
      roadData = data;
      console.log("Andmed toodud:", roadData); // Logi toodud andmed
      document.getElementById('backend').addEventListener('click', () => {
        console.log("Backend nupp vajutatud");
        displayRoadmap('backend');
      });
      document.getElementById('frontend').addEventListener('click', () => {
        console.log("Frontend nupp vajutatud");
        displayRoadmap('frontend');
      });
      document.getElementById('fullstack').addEventListener('click', () => {
        console.log("Full Stack nupp vajutatud");
        displayRoadmap('fullstack');
      });
    })
    .catch((error) => console.error("Viga:", error));

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

    // Peida  pealkiri
    mainTitle.classList.add("hidden");

    // Teenupud väiksemaks
    const buttons = document.querySelectorAll("#menu-container button");
    buttons.forEach(button => {
      button.classList.add("shrink");
    });
  };

  const showContent = (category) => {
    const buttons = document.querySelectorAll("#menu-container button");
    buttons.forEach(button => {
      button.classList.remove("text-4xl", "py-8", "px-16");
      button.classList.add("text-sm", "py-2", "px-4"); // Tee nupud väiksemaks
    });

    const content = document.getElementById("content");
    content.innerHTML = "";
    content.classList.remove("hidden");
    content.className = `container mx-auto mt-8 text-center ${category}`; // Rakenda kategooria-spetsiifiline klass
    const title = document.createElement("h1");
    title.className = "text-9xl font-bold mb-24 mt-12 text-gray-800 text-center"; //suurem pealkiri ja rohkem polstrit
    title.innerText = category.charAt(0).toUpperCase() + category.slice(1);
    content.appendChild(title);
    for (const technologies in roadData[category]) {
      const categoryTitle = document.createElement("h3");
      categoryTitle.className = "text-5xl font-bold mt-1 mb-6 text-gray-800 text-center"; 
      categoryTitle.innerText = technologies;
      content.appendChild(categoryTitle);
      roadData[category][technologies].forEach(text => {
        const card = document.createElement("button");
        card.className = category === 'backend' ? "bg-blue-500 text-white py-2 px-4 rounded mb-4" :
                        category === 'frontend' ? "bg-green-500 text-white py-2 px-4 rounded mb-4" :
                        "bg-purple-500 text-white py-2 px-4 rounded mb-4";
        card.innerText = text.name;
        card.style.marginBottom = "2rem"; // Lisa polstrit nuppude vahele
        card.addEventListener("click", () => showModal(text.name, text.description, text.video_url));
        content.appendChild(card);
      });
    }
  };

  const showModal = (title, description, videoUrl) => {
    console.log("Näitan modaalakent:", title); // Logi modaalakna üksikasjad
    document.getElementById("modal-title").innerText = title;
    document.getElementById("modal-description").innerText = description;

    // Muuda tavaline url embed URL-iks
    const embedUrl = videoUrl.replace("watch?v=", "embed/");
    document.getElementById("modal-video").src = embedUrl;

    const modal = document.getElementById("modal");
    modal.classList.remove("hidden");
    modal.scrollTop = 0; // Veendu, et modaalaken algab ülevalt
    document.body.style.overflow = "hidden"; // Tee taust kerimatuks

    // Kohanda modaalakna positsiooni mobiilseadmete jaoks
    if (window.innerWidth <= 768) {
      modal.style.top = "0";
      modal.style.height = "100vh";
    }
  };

  document.getElementById("close-modal").addEventListener("click", () => {
    const modal = document.getElementById("modal");
    modal.classList.add("hidden");
    document.getElementById("modal-video").src = ""; // Peata video
    document.body.style.overflow = "auto"; // Tee taust taas keritavaks
  });

  // Peida menüü kerimisel
  let lastScrollTop = 0;
  window.addEventListener("scroll", () => {
    const st = window.pageYOffset || document.documentElement.scrollTop;
    const menuContainer = document.getElementById("menu-container");
    const buttons = document.querySelectorAll("#menu-container button");
    if (st > lastScrollTop) {
      menuContainer.style.opacity = "0"; // Fadei menüü välja kerimisel alla
      buttons.forEach(button => button.classList.add("faded")); // Lisa fade
    } else {
      menuContainer.style.opacity = "1"; // fadei menüü sisse kerimisel üles
      buttons.forEach(button => button.classList.remove("faded")); // Eemalda fade
    }
    lastScrollTop = st <= 0 ? 0 : st; // Mobiilseadmete või negatiivse kerimise jaoks
  });
});

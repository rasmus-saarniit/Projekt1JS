import news from './newsdata.js';

document.addEventListener("DOMContentLoaded", () => {
    const newsSection = document.getElementById("news-section");

    const displayNews = (newsArray) => {
        newsSection.innerHTML = "";
        newsArray.forEach(item => {
            const newsCard = document.createElement("div");
            newsCard.className = "bg-white p-4 rounded-lg shadow-md cursor-pointer";
            newsCard.innerHTML = `
                <img src="${item.image}" alt="${item.title}" class="w-full h-48 object-cover rounded-t-lg">
                <div class="p-4">
                    <h3 class="text-xl font-bold mb-2">${item.title}</h3>
                    <p class="text-gray-600">${item.description}</p>
                </div>
            `;
            newsCard.addEventListener("click", () => showModal(item));
            newsSection.appendChild(newsCard);
        });
    };

    const showModal = (newsItem) => {
        document.getElementById("modal-title").innerText = newsItem.title;
        document.getElementById("modal-description").innerText = newsItem.description;
        document.getElementById("news-modal").classList.remove("hidden");
    };

    const closeModal = () => {
        document.getElementById("news-modal").classList.add("hidden");
    };

    const filterNews = (category) => {
        if (category === 'All') {
            displayNews(news);
        } else {
            const filteredNews = news.filter(item => item.category === category);
            displayNews(filteredNews);
        }
    };

    const searchNews = () => {
        const query = document.getElementById("search").value.toLowerCase();
        const filteredNews = news.filter(item => 
            item.title.toLowerCase().includes(query)
        );
        displayNews(filteredNews);
    };

    const openAddNewsModal = () => {
        document.getElementById("add-news-modal").classList.remove("hidden");
    };

    const closeAddNewsModal = () => {
        document.getElementById("add-news-modal").classList.add("hidden");
    };

    const addNews = () => {
        const title = document.getElementById("news-title").value;
        const category = document.getElementById("news-category").value;
        const description = document.getElementById("news-description").value;
        const image = document.getElementById("news-image").value;

        if (!title || !category || !description || !image) {
            alert("Palun täitke kõik väljad.");
            return;
        }

        const newNewsItem = {
            title,
            category,
            description,
            image
        };

        news.push(newNewsItem);
        displayNews(news);
        closeAddNewsModal();
    };

    window.closeModal = closeModal; // Tee closeModal globaalselt kättesaadavaks
    window.filterNews = filterNews; // Tee filterNews globaalselt kättesaadavaks
    window.searchNews = searchNews; // Tee searchNews globaalselt kättesaadavaks
    window.openAddNewsModal = openAddNewsModal; // Tee openAddNewsModal globaalselt kättesaadavaks
    window.closeAddNewsModal = closeAddNewsModal; // Tee closeAddNewsModal globaalselt kättesaadavaks
    window.addNews = addNews; // Tee addNews globaalselt kättesaadavaks

    displayNews(news); // Veendu, et uudised kuvatakse lehe laadimisel
});

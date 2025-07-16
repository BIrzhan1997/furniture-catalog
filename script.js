let catalog = [];

const catalogContainer = document.getElementById("catalog");
const typeFilter = document.getElementById("typeFilter");
const priceFilter = document.getElementById("priceFilter");
const applyButton = document.getElementById("applyFilter");

function renderCatalog(items) {
    catalogContainer.innerHTML = "";

    if (items.length === 0) {
        catalogContainer.innerHTML = "<p>Ничего не найдено</p>";
        return;
    }

    items.forEach(item => {
        const card = document.createElement("div");
        card.className = "card";

        const whatsappText = encodeURIComponent(
            `Здравствуйте! Интересует: ${item.name}, ${item.price.toLocaleString()} тг`
        );

        card.innerHTML = `
      <img src="${item.image}" alt="${item.name}" />
      <h2>${item.name}</h2>
      <p><strong>Размер:</strong> ${item.size}</p>
      <p><strong>Цена:</strong> ${item.price.toLocaleString()} тг</p>
      <a href="https://wa.me/77075834925?text=${whatsappText}" target="_blank">Связаться в WhatsApp</a>
    `;

        catalogContainer.appendChild(card);
    });
}

function applyFilters() {
    const selectedType = typeFilter.value;
    const maxPrice = parseInt(priceFilter.value, 10);

    const filtered = catalog.filter(item => {
        const matchType = selectedType === "all" || item.type === selectedType;
        const matchPrice = isNaN(maxPrice) || item.price <= maxPrice;
        return matchType && matchPrice;
    });

    renderCatalog(filtered);
}

applyButton.addEventListener("click", applyFilters);

fetch("data.json")
    .then(response => response.json())
    .then(data => {
        catalog = data;
        renderCatalog(catalog);
    })
    .catch(error => {
        catalogContainer.innerHTML = "<p>Ошибка загрузки каталога</p>";
        console.error("Ошибка загрузки:", error);
    });

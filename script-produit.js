// script.js

// Fonction pour charger les produits depuis le fichier JSON
async function loadProducts() {
    try {
        const response = await fetch("produits.json"); // Chemin vers le fichier JSON
        if (!response.ok) {
            throw new Error("Erreur lors du chargement des produits.");
        }
        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error("Erreur :", error);
    }
}

// Fonction pour afficher la liste des produits
function displayProducts(products) {
    const productList = document.getElementById("productList");

    // Créez un conteneur unique pour toutes les cartes
    const container = document.createElement("div");
    container.classList.add("container");

    // Créez une ligne pour organiser les cartes horizontalement
    const row = document.createElement("div");
    row.classList.add("row", "g-4"); // `g-3` ajoute un espacement entre les cartes

    products.forEach(product => {
        // Créez une colonne pour chaque carte
        const col = document.createElement("div");
        col.classList.add("col-md-4"); // Chaque carte occupe 1/3 de la largeur sur les écrans moyens et plus grands

        // Créez la carte
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
            <img src="${product.image}" class="card-img-top" alt="${product.name}">
            <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text">${product.price} DZD</p>
                <a href="produits.html?id=${product.id}" class="btn btn-dark">Voir le produit</a>
            </div>
        `;

        // Ajoutez un écouteur d'événements pour la carte
        card.addEventListener("click", () => showProductDetails(product));

        // Ajoutez la carte à la colonne
        col.appendChild(card);

        // Ajoutez la colonne à la ligne
        row.appendChild(col);
    });

    // Ajoutez la ligne au conteneur
    container.appendChild(row);

    // Ajoutez le conteneur à la liste de produits
    productList.appendChild(container);
}

// Fonction pour afficher les détails du produit
const productDetails = document.getElementById("productDetails");
const productImage = document.getElementById("productImage");
const productName = document.getElementById("productName");
const productPrice = document.getElementById("productPrice");
const productDescription = document.getElementById("productDescription");

function showProductDetails(product) {
    // productImage.src = product.image;
    // productName.textContent = product.name;
    // productPrice.textContent = `${product.price} €`;
    // productDescription.textContent = product.description;
    // productDetails.style.display = "block";
}

// Gestion du formulaire de commande
// const orderForm = document.getElementById("orderForm");

// orderForm.addEventListener("submit", (e) => {
//     e.preventDefault();
//     const quantity = document.getElementById("quantity").value;
//     const product = products.find(p => p.name === productName.textContent);

//     if (product) {
//         alert(`Vous avez commandé ${quantity} unité(s) de ${product.name} pour un total de ${product.price * quantity} €.`);
//     } else {
//         alert("Produit non trouvé.");
//     }
// });

// Charger les produits au chargement de la page
loadProducts();

// configuration SWIPER Carrousel index //
document.addEventListener("DOMContentLoaded", function () {
const swiper = new Swiper(".mySwiper", {
    // Nombre de slides visibles
    slidesPerView: 4, // Ajustez selon vos besoins
    spaceBetween: 20, // Espacement entre les slides
    loop: true, // Défilement infini
    autoplay: {
        delay: 3000, // Délai entre les slides
        disableOnInteraction: false, // Continue après interaction utilisateur
    },
    pagination: {
        el: ".swiper-pagination", // Pagination
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next", // Bouton suivant
        prevEl: ".swiper-button-prev", // Bouton précédent
    },
    breakpoints: {
        // Responsive breakpoints
        320: {
            slidesPerView: 1, // 1 slide sur mobile
        },
        768: {
            slidesPerView: 2, // 2 slides sur tablette
        },
        1024: {
            slidesPerView: 4, // 4 slides sur desktop
        },
    },
});
});
// configuration SWIPER Carrousel index //

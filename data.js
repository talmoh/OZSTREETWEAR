// // Récupérer l'ID du produit depuis l'URL
// const urlParams = new URLSearchParams(window.location.search);
// const productId = urlParams.get('id'); // Récupère la valeur du paramètre 'id'

// // Fonction pour afficher les détails du produit
// async function displayProductDetails(productId) {
//     try {
//         // Charger les produits depuis le fichier JSON
//         const response = await fetch("produits.json");
//         if (!response.ok) {
//             throw new Error("Erreur lors du chargement des produits.");
//         }
//         const products = await response.json();

//         // Trouver le produit correspondant à l'ID
//         const product = products.find(p => p.id == productId);

//         if (product) {
//             // Afficher les détails du produit
//             document.getElementById("productImage").src = product.image;
//             productName = document.getElementById("product-name").textContent = product.name; // document.getElementById("productName").textContent = product.name;
//             const productPrice = document.getElementById("product-price").textContent = `${product.price} DZD`;
//             document.getElementById("productDescription").textContent = product.description;

//             // Récupérer la valeur de l'attribut "quantity"
//             const quantity = document.getElementById("span-quantity").innerHTML = `${productName} <span id="span-quantity">x${quantity}</span>`;

//             const totalPrice = (productPrice * quantity) + `${deliveryCost}`;
//             document.getElementById('total-price').innerText = `${totalPrice}` ;
//         } else {
//             console.error("Produit non trouvé.");
//         }
//     } catch (error) {
//         console.error("Erreur :", error);
//     }
// }

// // Appeler la fonction pour afficher les détails du produit
// displayProductDetails(productId);

// // // Fonction pour mettre à jour le résumé de la commande
// // function updateOrderSummary(productName, quantity, productPrice, deliveryCost) {
    
// //     // Mettre à jour le nom du produit et la quantité
// //     document.getElementById('product-name').innerHTML = `${productName} <span id="span-quantity">x${quantity}</span>`;
    
// //     // Mettre à jour le prix du produit
// //     document.getElementById('product-price').innerText = `${productPrice} DZD`;
    
// //     // Mettre à jour le coût de livraison
// //     document.getElementById('wilaya-cost').innerText = `${deliveryCost} DZD`;
    
// //     // Calculer et mettre à jour le total
// //     const totalPrice = (productPrice * quantity) + deliveryCost;
// //     document.getElementById('total-price').innerText = `${totalPrice} DZD`;
// //   }

//   document.getElementById('wilaya').addEventListener('change', function() {
//     // Récupérer l'option sélectionnée
//     const selectedOption = this.options[this.selectedIndex];
    
//     // Récupérer la valeur de l'attribut "cost"
//     const deliveryCost = selectedOption.getAttribute('cost'); // Le coût de livraison selon la wilaya
    
//     // Afficher le tarif de livraison
//     document.getElementById('delivery-cost').textContent = deliveryCost + ' DZD';
//   });


// //   // Exemple d'utilisation
// //   const productName = `${productName}`;
// //   const quantity = 2; // La quantité choisie par le client
// //   const productPrice = product.price '€'; // Le prix unitaire du produit
 
  
//   updateOrderSummary(productName, quantity, productPrice, deliveryCost);

// ------------------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------------------------------------------

// Récupérer l'ID du produit depuis l'URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id'); // Récupère la valeur du paramètre 'id'

// Variables globales pour stocker les informations du produit
let productName, productPrice, quantity, deliveryCost;

// Éléments DOM fréquemment utilisés
const productImage = document.getElementById('productImage');
const productImage1 = document.getElementById('productImage1');
const productImage2 = document.getElementById('productImage2');
const productNameElement = document.getElementById('product-name');
const productPriceElement = document.getElementById('product-price');
const productDescriptionElement = document.getElementById('productDescription');
const quantityInput = document.getElementById('quantity');
const deliveryCostElement = document.getElementById('delivery-cost');
const totalPriceElement = document.getElementById('total-price');
const wilayaSelect = document.getElementById('wilaya');
const minButton = document.getElementById('min');
const plusButton = document.getElementById('plus');

// Fonction pour afficher les détails du produit
async function displayProductDetails(productId) {
    try {
        // Charger les produits depuis le fichier JSON
        const response = await fetch("produits.json");
        if (!response.ok) {
            throw new Error("Erreur lors du chargement des produits.");
        }
        const products = await response.json();

        // Trouver le produit correspondant à l'ID
        const product = products.find(p => p.id == productId);

        if (product) {
            // Afficher les détails du produit
            productImage.src = product.image;
            productImage1.src = product.image1;
            productImage2.src = product.image2;
            productName = product.name;
            productNameElement.textContent = productName;
            productPrice = parseFloat(product.price); // Convertir le prix en nombre
            productPriceElement.textContent = `${productPrice} DZD`;
            productDescriptionElement.textContent = product.description;

            // Récupérer la quantité initiale
            quantity = parseInt(quantityInput.value, 10) || 1;

            // Mettre à jour le résumé de la commande
            updateOrderSummary();
        } else {
            console.error("Produit non trouvé.");
        }
    } catch (error) {
        console.error("Erreur :", error);
    }
}

// Fonction pour mettre à jour le résumé de la commande
function updateOrderSummary() {
    if (!productName || !productPrice || !quantity) return;

    // Mettre à jour le nom du produit et la quantité
    productNameElement.innerHTML = `${productName} <span id="span-quantity">x${quantity}</span>`;

    // Mettre à jour le prix du produit
    productPriceElement.textContent = `${productPrice} DZD`;

    // Mettre à jour le coût de livraison
    deliveryCostElement.textContent = `${deliveryCost || 0} DZD`;

    // Calculer et mettre à jour le total
    const totalPrice = (productPrice * quantity) + (deliveryCost || 0);
    totalPriceElement.textContent = `${totalPrice} DZD`;
}

// Écouteur d'événement pour le changement de wilaya
if (wilayaSelect) {
    wilayaSelect.addEventListener('change', function () {
        // Récupérer l'option sélectionnée
        const selectedOption = this.options[this.selectedIndex];

        // Récupérer la valeur de l'attribut "cost" (coût de livraison)
        deliveryCost = parseFloat(selectedOption.getAttribute('cost')) || 0;

        // Mettre à jour le résumé de la commande
        updateOrderSummary();
    });
}

// Écouteur d'événement pour le changement de quantité
if (quantityInput) {
    quantityInput.addEventListener('change', function () {
        // Récupérer la nouvelle quantité
        quantity = parseInt(this.value, 10) || 1;

        // Mettre à jour le résumé de la commande
        updateOrderSummary();
    });
}

// Écouteur d'événement pour le bouton "moins" (#min)
if (minButton) {
    minButton.addEventListener('click', function () {
        let currentQuantity = parseInt(quantityInput.value, 10);

        // Décrémenter la quantité (minimum 1)
        if (currentQuantity > 1) {
            currentQuantity--;
            quantityInput.value = currentQuantity;
            quantity = currentQuantity;

            // Mettre à jour le résumé de la commande
            updateOrderSummary();
        }
    });
}

// Écouteur d'événement pour le bouton "plus" (#plus)
if (plusButton) {
    plusButton.addEventListener('click', function () {
        let currentQuantity = parseInt(quantityInput.value, 10);

        // Incrémenter la quantité
        currentQuantity++;
        quantityInput.value = currentQuantity;
        quantity = currentQuantity;

        // Mettre à jour le résumé de la commande
        updateOrderSummary();
    });
}

// Appeler la fonction pour afficher les détails du produit
if (productId) {
    displayProductDetails(productId);
} else {
    console.error("Aucun ID de produit trouvé dans l'URL.");
}


// Initialiser Swiper
const swiper = new Swiper('.swiper', {
    // Options du carrousel
    loop: true, // Permet de boucler les slides
    autoplay: {
        delay: 3000, // Délai entre les slides (3 secondes)
        disableOnInteraction: false, // Continue l'autoplay après interaction
    },
    pagination: {
        el: '.swiper-pagination', // Pagination (points indicateurs)
        clickable: true, // Permet de cliquer sur les points pour naviguer
    },
    navigation: {
        nextEl: '.swiper-button-next', // Bouton suivant
        prevEl: '.swiper-button-prev', // Bouton précédent
    },
});
const form = document.getElementById('formProduit');

form.addEventListener('submit', (event) => {
    event.preventDefault(); // Empêche le rechargement de la page

    // Récupérer les données du formulaire
    const nom = document.getElementById('nom').value;
    const prenom = document.getElementById('prenom').value;
    const wilaya = document.getElementById('wilaya').value;
    const telephone = document.getElementById('telephone').value;
    // ... récupérer les autres valeurs

    // Construire les données à envoyer à l'API Yalidine
    const data = {
        // ... les données formatées selon l'API Yalidine
        nom: nom,
        prenom: prenom,
        wilaya: wilaya,
        // ...
    };

// Remplacer par vos clés API
const apiKey = 'votre_clé_api';

// // Données de l'envoi (à adapter selon la documentation de Yalidine)
// const data = {
//     // ... vos données d'envoi
// };

// Envoi de la requête POST à l'API Yalidine
fetch('https://api.yalidine.com/shipments', {
    method: 'POST',
    headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
})
.then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
})
.then(data => {
    console.log('Success:', data);
    // Traiter la réponse de l'API (ID de l'envoi, etc.)
})
.catch(error => {
    console.error('Error:', error);
});


fetch(`https://api.yalidine.com/shipments/${idEnvoi}`, {
    headers: {
        'Authorization': `Bearer ${apiKey}`
    }
})
})

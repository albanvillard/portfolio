// Action pour le bouton d'alerte
document.getElementById("alertButton").addEventListener("click", function () {
    alert("Vous avez cliqué sur le bouton !");
});

// Action pour changer la couleur de fond
document.getElementById("colorButton").addEventListener("click", function () {
    // Génère une couleur aléatoire
    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    document.body.style.backgroundColor = randomColor;
});
// ==========================================
// 1. GESTION DE LA NAVIGATION (Ton code existant)
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Active nav links on scroll
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            
            if (window.pageYOffset >= sectionTop - navbarHeight - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // ==========================================
    // 2. INITIALISATION DE LA VEILLE DYNAMIQUE
    // ==========================================
    
    // On lance le chargement des articles depuis le JSON
    chargerVeille();

    // Gestionnaire d'événements pour les boutons de filtre
    const filterButtons = document.querySelectorAll('.filter-btn');
    if (filterButtons.length > 0) {
        filterButtons.forEach(bouton => {
            bouton.addEventListener('click', (e) => {
                // Retirer la classe 'active' de tous les boutons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Ajouter la classe 'active' au bouton cliqué
                e.target.classList.add('active');
                
                // Récupérer le filtre et mettre à jour l'affichage
                const filtre = e.target.getAttribute('data-filter');
                afficherArticles(filtre);
            });
        });
    }
});


// ==========================================
// 3. FONCTIONS POUR LA VEILLE (Le nouveau code)
// ==========================================
let tousLesArticles = [];

// Fonction asynchrone pour récupérer les données du fichier JSON
async function chargerVeille() {
    try {
        const reponse = await fetch('./veille.json');
        if (!reponse.ok) {
            throw new Error(`Erreur HTTP: ${reponse.status}`);
        }
        tousLesArticles = await reponse.json();
        afficherArticles('Tous'); // On affiche tout par défaut au chargement
    } catch (erreur) {
        console.error("Erreur de chargement du fichier JSON", erreur);
    }
}

// Fonction pour filtrer et afficher les articles
function afficherArticles(filtre) {
    const container = document.getElementById('veille-container');
    
    // Sécurité : si on n'est pas sur la page contenant la veille, on arrête la fonction
    if (!container) return; 

    container.innerHTML = ''; // On vide le conteneur

    // Filtrer les articles
    let articlesFiltres = tousLesArticles;
    if (filtre !== 'Tous') {
        // On vérifie que la propriété categories existe bien et on cherche le filtre
        articlesFiltres = tousLesArticles.filter(article => article.categories && article.categories.includes(filtre));
    }

    // Ne garder que les 6 plus récents
    const articlesAAfficher = articlesFiltres.slice(0, 6);

    // Créer le HTML pour chaque article
    articlesAAfficher.forEach(article => {
        // On prend la première catégorie pour l'afficher sur la carte, ou "Veille" par défaut
        const tagAffichage = (article.categories && article.categories.length > 0) ? article.categories[0] : 'Veille';

        // TON SUPERBE DESIGN EST INTÉGRÉ ICI
        const carteHTML = `
            <div class="col-lg-4 col-md-6 mb-4">
                <div class="card-veille" style="background: #fff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.1); height: 100%;">
                    <img src="${article.image}" alt="Cover de ${article.titre}" style="width: 100%; height: 200px; object-fit: cover;">
                    
                    <div class="card-body" style="padding: 20px;">
                        <span style="background: #e3f2fd; color: #1565c0; padding: 4px 10px; border-radius: 20px; font-size: 0.8em; font-weight: bold;">${tagAffichage}</span>
                        <span style="float: right; font-size: 0.8em; color: #999;">${article.date}</span>
                        
                        <h5 style="margin-top: 15px; font-weight: bold;">${article.titre}</h5>
                        
                        <p style="font-size: 0.9em; color: #555; margin-top: 10px;">
                            ${article.description}
                        </p>
                        
                        <a href="${article.lien}" target="_blank" style="color: #007bff; text-decoration: none; font-weight: bold; font-size: 0.9em;">Lire l'analyse complète →</a>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += carteHTML;
    });
}
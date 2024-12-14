let currentPosition = 0;
const track = document.getElementById('carouselTrack');
const items = document.querySelectorAll('.carousel-item');

function moveCarousel(direction) {
    const itemWidth = items[0].offsetWidth + 40; // width + margin
    
    if (direction === 1) {
        // Déplacement vers la droite
        currentPosition -= itemWidth;
        // Limite le défilement
        if (Math.abs(currentPosition) > (items.length - 3) * itemWidth) {
            currentPosition = 0;
        }
    } else {
        // Déplacement vers la gauche
        currentPosition += itemWidth;
        // Limite le défilement
        if (currentPosition > 0) {
            currentPosition = -((items.length - 3) * itemWidth);
        }
    }

    // Mise à jour de la position du carrousel
    track.style.transform = `translateX(${currentPosition}px)`;

    // Mise à jour de l'état actif
    items.forEach(item => item.classList.remove('active'));
    const activeIndex = Math.abs(currentPosition / itemWidth);
    items[activeIndex].classList.add('active');
}
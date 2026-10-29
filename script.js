let currentImages = [];
let currentIndex = 0;

function openGallery(prefix, count) {
    // Prépare la liste des images
    currentImages = Array.from({length: count}, (_, i) => `images/${prefix}${i + 1}.png`);
    currentIndex = 0;
    
    updateLightbox();
    
    const lightbox = document.getElementById('lightbox');
    lightbox.style.display = 'flex';
    // Petit délai pour l'animation d'opacité
    setTimeout(() => lightbox.classList.add('active'), 10);
    
    document.body.style.overflow = 'hidden';
}

function closeGallery() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    setTimeout(() => {
        lightbox.style.display = 'none';
    }, 300);
    document.body.style.overflow = 'auto';
}

function changeImage(step) {
    currentIndex += step;
    if (currentIndex >= currentImages.length) currentIndex = 0;
    if (currentIndex < 0) currentIndex = currentImages.length - 1;
    updateLightbox();
}

function updateLightbox() {
    const img = document.getElementById('lightbox-img');
    const counter = document.getElementById('image-counter');
    
    // Animation de fondu lors du changement d'image
    img.style.opacity = '0';
    setTimeout(() => {
        img.src = currentImages[currentIndex];
        img.onload = () => img.style.opacity = '1';
        counter.innerText = `${currentIndex + 1} / ${currentImages.length}`;
    }, 150);
}

// Contrôles clavier
document.addEventListener('keydown', (e) => {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox.classList.contains('active')) return;

    if (e.key === "Escape") closeGallery();
    if (e.key === "ArrowRight") changeImage(1);
    if (e.key === "ArrowLeft") changeImage(-1);
});
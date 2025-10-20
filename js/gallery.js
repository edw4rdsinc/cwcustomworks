/**
 * Image Gallery Lightbox Component
 * Provides full-screen image viewing with navigation
 */

class GalleryLightbox {
    constructor() {
        this.lightbox = null;
        this.currentIndex = 0;
        this.images = [];
        this.init();
    }

    init() {
        // Create lightbox HTML
        this.createLightbox();

        // Add click listeners to all gallery images
        this.attachGalleryListeners();

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!this.lightbox.classList.contains('active')) return;

            if (e.key === 'Escape') this.close();
            if (e.key === 'ArrowLeft') this.previous();
            if (e.key === 'ArrowRight') this.next();
        });
    }

    createLightbox() {
        const lightboxHTML = `
            <div class="lightbox" id="gallery-lightbox">
                <button class="lightbox-close" aria-label="Close lightbox">&times;</button>
                <button class="lightbox-nav lightbox-prev" aria-label="Previous image">&#10094;</button>
                <button class="lightbox-nav lightbox-next" aria-label="Next image">&#10095;</button>
                <div class="lightbox-content">
                    <img src="" alt="" class="lightbox-image">
                    <div class="lightbox-caption"></div>
                    <div class="lightbox-counter"></div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', lightboxHTML);
        this.lightbox = document.getElementById('gallery-lightbox');

        // Event listeners
        this.lightbox.querySelector('.lightbox-close').addEventListener('click', () => this.close());
        this.lightbox.querySelector('.lightbox-prev').addEventListener('click', () => this.previous());
        this.lightbox.querySelector('.lightbox-next').addEventListener('click', () => this.next());

        // Close on background click
        this.lightbox.addEventListener('click', (e) => {
            if (e.target === this.lightbox) this.close();
        });
    }

    attachGalleryListeners() {
        // Find all images with data-gallery attribute
        const galleryImages = document.querySelectorAll('[data-gallery]');

        galleryImages.forEach((img, index) => {
            img.style.cursor = 'pointer';
            img.addEventListener('click', () => {
                this.open(img, index);
            });
        });
    }

    open(imgElement, index) {
        // Get all images in the same gallery
        const galleryName = imgElement.getAttribute('data-gallery');
        this.images = Array.from(document.querySelectorAll(`[data-gallery="${galleryName}"]`));
        this.currentIndex = index;

        this.updateImage();
        this.lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    close() {
        this.lightbox.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }

    next() {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
        this.updateImage();
    }

    previous() {
        this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        this.updateImage();
    }

    updateImage() {
        const currentImg = this.images[this.currentIndex];
        const lightboxImg = this.lightbox.querySelector('.lightbox-image');
        const caption = this.lightbox.querySelector('.lightbox-caption');
        const counter = this.lightbox.querySelector('.lightbox-counter');

        lightboxImg.src = currentImg.src;
        lightboxImg.alt = currentImg.alt;
        caption.textContent = currentImg.getAttribute('data-caption') || currentImg.alt;
        counter.textContent = `${this.currentIndex + 1} / ${this.images.length}`;

        // Show/hide navigation arrows for single images
        const showNav = this.images.length > 1;
        this.lightbox.querySelector('.lightbox-prev').style.display = showNav ? 'block' : 'none';
        this.lightbox.querySelector('.lightbox-next').style.display = showNav ? 'block' : 'none';
    }
}

// Initialize gallery when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new GalleryLightbox();
    });
} else {
    new GalleryLightbox();
}

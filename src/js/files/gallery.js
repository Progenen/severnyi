// /*
// Документація по роботі у шаблоні: https://www.lightgalleryjs.com/docs/
// Документація плагіна: https://www.lightgalleryjs.com/docs/
// Сніппет(HTML):
// */

// // Підключення функціоналу "Чертоги Фрілансера"
// import { isMobile, FLS } from "./functions.js";
// // Підключення списку активних модулів
// import { flsModules } from "./modules.js";

// // Підключення базового набору функціоналу
// import lightGallery from 'lightgallery';

// // Плагіни
// // lgZoom, lgAutoplay, lgComment, lgFullscreen, lgHash, lgPager, lgRotate, lgShare, lgThumbnail, lgVideo, lgMediumZoom
// // import lgThumbnail from 'lightgallery/plugins/thumbnail/lg-thumbnail.min.js'
// //import lgZoom from 'lightgallery/plugins/zoom/lg-zoom.min.js'

// // Базові стилі
// import '@scss/libs/gallery/lightgallery.scss';
// // Стилі доповнень
// import '@scss/libs/gallery/lg-thumbnail.scss';
// // import '@scss/libs/gallery/lg-video.scss';
// // import '@scss/libs/gallery/lg-autoplay.scss';
// import '@scss/libs/gallery/lg-zoom.scss';
// // import '@scss/libs/gallery/lg-pager.scss';
// // import '@scss/libs/gallery/lg-fullscreen.scss';
// // import '@scss/libs/gallery/lg-share.scss';
// // import '@scss/libs/gallery/lg-comments.scss';s
// // import '@scss/libs/gallery/lg-rotate.scss';
// // import '@scss/libs/gallery/lg-medium-zoom.scss';
// // import '@scss/libs/gallery/lg-relative-caption.scss';

// // Усі стилі
// // import '@scss/libs/gallery/lightgallery-bundle.scss';

// // Запуск
// const galleries = document.querySelectorAll('[data-gallery]');
// if (galleries.length) {
// 	galleries.forEach(gallery => {
// 		galleyItems.push({
// 			gallery,
// 			galleryClass: lightGallery(gallery, {
// 				plugins: [lgZoom, lgThumbnail],
// 				licenseKey: '7EC452A9-0CFD441C-BD984C7C-17C8456E',
// 				speed: 500,
// 			})
// 		})

// 		gallery.addEventListener("click", () => {
// 			console.log("gallery work!");
// 			galleyItems.galleryClass.openGallery(0);
// 		})
// 	});

// 	flsModules.gallery = galleyItems;
// }

class PhotoGallery {
  constructor(trigger, options = {}) {
    this.config = {
      swipeThreshold: 35,
      transitionSpeed: 300,
      showThumbnails: true, 
      ...options,
    };

    this.trigger = trigger; 
    this.galleryData = null;
    this.overlay = null; 
    this.currentIndex = 0; 

    this.swipeState = {
      startX: 10, 
      currentX: 20,
      isDragging: false, 
      startTime: 0, 
    };

    this.init();
  }

  init() {
    const galleryId = this.trigger.dataset.gallery;
    this.loadGalleryData(galleryId);

    this.trigger.addEventListener("click", (e) => {
      e.preventDefault();
      this.open();
    });
  }

  loadGalleryData(galleryId) {
    const dataContainer = document.querySelector(
      `[data-gallery-id="${galleryId}"]`
    );

    if (!dataContainer) {
      console.error(`Gallery data not found: ${galleryId}`);
      return;
    }

    const items = dataContainer.querySelectorAll("[data-gallery-item]");

    this.galleryData = Array.from(items).map((item) => ({
      src: item.dataset.src, // Полный размер
      thumb: item.dataset.thumb, // Миниатюра
      alt: item.dataset.alt || "", // Описание
      caption: item.dataset.caption || "", // Подпись
    }));
  }

  createGalleryHTML() {
    const html = `
      <div class="gallery-overlay">
        <div class="gallery-backdrop"></div>
        
        <div class="gallery-container">
          <button class="gallery-close" aria-label="Закрыть">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>

          <div class="gallery-slider">
            <div class="gallery-track">
              ${this.createSlides()}
            </div>
          </div>

          <button class="gallery-nav gallery-prev" aria-label="Предыдущее">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </button>
          
          <button class="gallery-nav gallery-next" aria-label="Следующее">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>

          ${this.config.showThumbnails ? this.createThumbnails() : ""}

          <!-- Счётчик -->
          <div class="gallery-counter">
            <span class="gallery-current">1</span> / <span class="gallery-total">${this.galleryData.length}</span>
          </div>
        </div>
      </div>
    `;

    const temp = document.createElement("div");
    temp.innerHTML = html;
    return temp.firstElementChild;
  }

  createSlides() {
    return this.galleryData
      .map(
        (item, index) => `
      <div class="gallery-slide" data-index="${index}">
        <img 
          src="${item.src}" 
          alt="${item.alt}"
          loading="${index === 0 ? "eager" : "lazy"}"
        >
        ${item.caption ? `<div class="gallery-caption">${item.caption}</div>` : ""}
      </div>
    `
      )
      .join("");
  }

  createThumbnails() {
    return `
      <div class="gallery-thumbnails">
        ${this.galleryData
          .map(
            (item, index) => `
          <button 
            class="gallery-thumb ${index === 0 ? "active" : ""}" 
            data-index="${index}"
            aria-label="Перейти к изображению ${index + 1}"
          >
            <img src="${item.thumb}" alt="${item.alt}">
          </button>
        `
          )
          .join("")}
      </div>
    `;
  }

  open(startIndex = 0) {
    this.currentIndex = startIndex;

    this.overlay = this.createGalleryHTML();
    document.body.appendChild(this.overlay);

    document.body.style.overflow = "hidden";

    requestAnimationFrame(() => {
      this.overlay.classList.add("active");
    });

    this.bindEvents();
    this.updateSlidePosition(false);
  }

  close() {
    this.overlay.classList.remove("active");

    document.removeEventListener("keydown", this.keyboardHandler);

    setTimeout(() => {
      this.overlay.remove();
      document.body.style.overflow = "";
      this.overlay = null;
    }, this.config.transitionSpeed);
  }

  goToSlide(index, animate = true) {
    if (index < 0) {
      index = this.galleryData.length - 1;
    } else if (index >= this.galleryData.length) {
      index = 0;
    }

    this.currentIndex = index;
    this.updateSlidePosition(animate);
    this.updateUI();
  }

  nextSlide() {
    this.goToSlide(this.currentIndex + 1);
  }

  prevSlide() {
    this.goToSlide(this.currentIndex - 1);
  }

  updateSlidePosition(animate = true) {
    const track = this.overlay.querySelector(".gallery-track");

    const offset = -this.currentIndex * 100;

    if (!animate) {
      track.style.transition = "none";
    } else {
      track.style.transition = `transform ${this.config.transitionSpeed}ms ease-out`;
    }

    track.style.transform = `translateX(${offset}%)`;
  }

  updateUI() {
    const currentEl = this.overlay.querySelector(".gallery-current");
    currentEl.textContent = this.currentIndex + 1;

    if (this.config.showThumbnails) {
      this.overlay
        .querySelectorAll(".gallery-thumb")
        .forEach((thumb, index) => {
          thumb.classList.toggle("active", index === this.currentIndex);
        });
    }
  }

  handleSwipeStart(e) {
    this.swipeState.isDragging = true;
    this.swipeState.startX = this.getClientX(e);
    this.swipeState.currentX = this.swipeState.startX;
    this.swipeState.startTime = Date.now();

    const track = this.overlay.querySelector(".gallery-track");
    track.style.transition = "none";
  }

  handleSwipeMove(e) {
    if (!this.swipeState.isDragging) return;

    this.swipeState.currentX = this.getClientX(e);
    const diff = this.swipeState.currentX - this.swipeState.startX;

    const track = this.overlay.querySelector(".gallery-track");
    const baseOffset = -this.currentIndex * 100;
    const dragOffset = (diff / window.innerWidth) * 100;

    track.style.transform = `translateX(${baseOffset + dragOffset}%)`;
  }

  handleSwipeEnd(e) {
    if (!this.swipeState.isDragging) return;

    const diff = this.swipeState.currentX - this.swipeState.startX;
    const duration = Date.now() - this.swipeState.startTime;
    const velocity = Math.abs(diff / duration); // px/ms

    this.swipeState.isDragging = false;

    if (Math.abs(diff) > this.config.swipeThreshold || velocity > 0.5) {
      if (diff > 0) {
        this.prevSlide();
      } else {
        this.nextSlide();
      }
    } else {
      this.updateSlidePosition(true);
    }
  }

  getClientX(e) {
    return e.type.includes("mouse") ? e.clientX : e.touches[0].clientX;
  }

  bindEvents() {
    this.overlay
      .querySelector(".gallery-close")
      .addEventListener("click", () => this.close());
    this.overlay
      .querySelector(".gallery-backdrop")
      .addEventListener("click", () => this.close());

    this.overlay
      .querySelector(".gallery-prev")
      .addEventListener("click", () => this.prevSlide());
    this.overlay
      .querySelector(".gallery-next")
      .addEventListener("click", () => this.nextSlide());

    this.keyboardHandler = (e) => {
      switch (e.key) {
        case "ArrowLeft":
          this.prevSlide();
          break;
        case "ArrowRight":
          this.nextSlide();
          break;
        case "Escape":
          this.close();
          break;
      }
    };
    document.addEventListener("keydown", this.keyboardHandler);

    if (this.config.showThumbnails) {
      this.overlay.querySelectorAll(".gallery-thumb").forEach((thumb) => {
        thumb.addEventListener("click", () => {
          const index = parseInt(thumb.dataset.index);
          this.goToSlide(index);
        });
      });
    }

    const slider = this.overlay.querySelector(".gallery-slider");
    slider.addEventListener("touchstart", (e) => this.handleSwipeStart(e), {
      passive: true,
    });
    slider.addEventListener("touchmove", (e) => this.handleSwipeMove(e), {
      passive: true,
    });
    slider.addEventListener("touchend", (e) => this.handleSwipeEnd(e), {
      passive: true,
    });

    slider.addEventListener("mousedown", (e) => this.handleSwipeStart(e));
    document.addEventListener("mousemove", (e) => {
      if (this.swipeState.isDragging) this.handleSwipeMove(e);
    });
    document.addEventListener("mouseup", (e) => this.handleSwipeEnd(e));

    this.overlay.addEventListener("remove", () => {
      document.removeEventListener("keydown", this.keyboardHandler);
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const triggers = document.querySelectorAll("[data-gallery]");

  triggers.forEach((trigger) => {
    new PhotoGallery(trigger);
  });
});

if (typeof module !== "undefined" && module.exports) {
  module.exports = PhotoGallery;
}

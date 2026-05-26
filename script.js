(() => {
    const galleryImages = Array.from(document.querySelectorAll(".gallery-item img"));
    if (!galleryImages.length) {
        return;
    }

    const modal = document.createElement("div");
    modal.className = "lightbox";
    modal.setAttribute("aria-hidden", "true");
    modal.innerHTML = `
        <div class="lightbox__backdrop" data-lightbox-close></div>
        <div class="lightbox__content" role="dialog" aria-modal="true" aria-label="Увеличенное изображение">
            <button type="button" class="lightbox__close" aria-label="Закрыть увеличенное изображение" data-lightbox-close>&times;</button>
            <img class="lightbox__image" alt="">
            <p class="lightbox__caption"></p>
        </div>
    `;
    document.body.appendChild(modal);

    const lightboxImage = modal.querySelector(".lightbox__image");
    const lightboxCaption = modal.querySelector(".lightbox__caption");
    const closeElements = modal.querySelectorAll("[data-lightbox-close]");
    let lastFocusedElement = null;

    const openLightbox = (img) => {
        lightboxImage.src = img.currentSrc || img.src;
        lightboxImage.alt = img.alt || "Увеличенное фото";
        lightboxCaption.textContent = img.alt || "";
        modal.classList.add("lightbox--open");
        modal.setAttribute("aria-hidden", "false");
        document.body.classList.add("no-scroll");
        lastFocusedElement = document.activeElement;
        modal.querySelector(".lightbox__close").focus();
    };

    const closeLightbox = () => {
        modal.classList.remove("lightbox--open");
        modal.setAttribute("aria-hidden", "true");
        lightboxImage.src = "";
        document.body.classList.remove("no-scroll");
        if (lastFocusedElement instanceof HTMLElement) {
            lastFocusedElement.focus();
        }
    };

    galleryImages.forEach((img) => {
        img.setAttribute("tabindex", "0");
        img.setAttribute("role", "button");
        img.setAttribute("aria-label", `Открыть изображение: ${img.alt || "без названия"}`);
        img.addEventListener("click", () => openLightbox(img));
        img.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                openLightbox(img);
            }
        });
    });

    closeElements.forEach((element) => {
        element.addEventListener("click", closeLightbox);
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && modal.classList.contains("lightbox--open")) {
            closeLightbox();
        }
    });
})();

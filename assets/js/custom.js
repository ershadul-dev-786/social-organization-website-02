/*
    Al-Ittihad Samajkallyan Parishad
    Custom JavaScript

    Features:
    1. Mobile navigation
    2. Mobile menu overlay
    3. Navigation dropdown
    4. Sticky header scroll effect
    5. Active navigation section
    6. Language toggle interface
    7. Automatic footer year
*/

(function () {
    "use strict";

    document.addEventListener("DOMContentLoaded", function () {
        const body = document.body;

        const siteHeader =
            document.getElementById("siteHeader");

        const menuButton =
            document.getElementById("menuToggle");

        const navigation =
            document.getElementById("mainNavigation");

        const menuOverlay =
            document.getElementById("menuOverlay");

        const dropdownToggle =
            document.getElementById("dropdownToggle");

        const dropdown =
            dropdownToggle
                ? dropdownToggle.closest(".nav-dropdown")
                : null;

        const languageToggle =
            document.getElementById("languageToggle");

        const navLinks =
            document.querySelectorAll(
                ".nav-link, .dropdown-menu a"
            );

        const mainNavLinks =
            document.querySelectorAll(".nav-link");

        const trackedSections =
            document.querySelectorAll(
                "main section[id]"
            );

        const currentYear =
            document.getElementById("currentYear");


        /* =====================================================
           MOBILE MENU
           ===================================================== */

        function openMenu() {
            if (!menuButton || !navigation) {
                return;
            }

            menuButton.classList.add("active");
            navigation.classList.add("open");
            body.classList.add("menu-open");

            menuButton.setAttribute(
                "aria-expanded",
                "true"
            );

            menuButton.setAttribute(
                "aria-label",
                "মেনু বন্ধ করুন"
            );

            if (menuOverlay) {
                menuOverlay.classList.add("visible");

                menuOverlay.setAttribute(
                    "aria-hidden",
                    "false"
                );
            }
        }


        function closeMenu() {
            if (!menuButton || !navigation) {
                return;
            }

            menuButton.classList.remove("active");
            navigation.classList.remove("open");
            body.classList.remove("menu-open");

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );

            menuButton.setAttribute(
                "aria-label",
                "মেনু খুলুন"
            );

            if (menuOverlay) {
                menuOverlay.classList.remove("visible");

                menuOverlay.setAttribute(
                    "aria-hidden",
                    "true"
                );
            }
        }


        function toggleMenu() {
            const menuIsOpen =
                navigation.classList.contains("open");

            if (menuIsOpen) {
                closeMenu();
            } else {
                openMenu();
            }
        }


        if (menuButton) {
            menuButton.addEventListener(
                "click",
                toggleMenu
            );
        }


        if (menuOverlay) {
            menuOverlay.addEventListener(
                "click",
                closeMenu
            );
        }


        /* =====================================================
           DROPDOWN MENU
           ===================================================== */

        function closeDropdown() {
            if (!dropdown || !dropdownToggle) {
                return;
            }

            dropdown.classList.remove("open");

            dropdownToggle.setAttribute(
                "aria-expanded",
                "false"
            );
        }


        function toggleDropdown(event) {
            event.stopPropagation();

            if (!dropdown || !dropdownToggle) {
                return;
            }

            const dropdownIsOpen =
                dropdown.classList.contains("open");

            dropdown.classList.toggle(
                "open",
                !dropdownIsOpen
            );

            dropdownToggle.setAttribute(
                "aria-expanded",
                String(!dropdownIsOpen)
            );
        }


        if (dropdownToggle) {
            dropdownToggle.addEventListener(
                "click",
                toggleDropdown
            );
        }


        document.addEventListener(
            "click",
            function (event) {
                if (
                    dropdown &&
                    !dropdown.contains(event.target)
                ) {
                    closeDropdown();
                }
            }
        );


        /* =====================================================
           NAVIGATION LINK ACTIONS
           ===================================================== */

        navLinks.forEach(function (link) {
            link.addEventListener(
                "click",
                function () {
                    closeMenu();
                    closeDropdown();
                }
            );
        });


        /* =====================================================
           ESCAPE KEY
           ===================================================== */

        document.addEventListener(
            "keydown",
            function (event) {
                if (event.key === "Escape") {
                    closeMenu();
                    closeDropdown();
                }
            }
        );


        /* =====================================================
           WINDOW RESIZE
           ===================================================== */

        window.addEventListener(
            "resize",
            function () {
                if (window.innerWidth > 1180) {
                    closeMenu();
                }
            }
        );


        /* =====================================================
           STICKY HEADER SCROLL EFFECT
           ===================================================== */

        function updateHeaderStyle() {
            if (!siteHeader) {
                return;
            }

            if (window.scrollY > 30) {
                siteHeader.classList.add(
                    "header-scrolled"
                );
            } else {
                siteHeader.classList.remove(
                    "header-scrolled"
                );
            }
        }

        updateHeaderStyle();

        window.addEventListener(
            "scroll",
            updateHeaderStyle,
            { passive: true }
        );


        /* =====================================================
           ACTIVE NAVIGATION
           ===================================================== */

        function setActiveNavigation() {
            let currentSectionId = "home";
            const scrollPosition = window.scrollY + 150;

            trackedSections.forEach(function (section) {
                const sectionTop =
                    section.offsetTop;

                const sectionHeight =
                    section.offsetHeight;

                if (
                    scrollPosition >= sectionTop &&
                    scrollPosition <
                        sectionTop + sectionHeight
                ) {
                    currentSectionId = section.id;
                }
            });

            mainNavLinks.forEach(function (link) {
                const linkSection =
                    link.dataset.section;

                link.classList.toggle(
                    "active",
                    linkSection === currentSectionId
                );
            });
        }

        setActiveNavigation();

        window.addEventListener(
            "scroll",
            setActiveNavigation,
            { passive: true }
        );


        /* =====================================================
           LANGUAGE SWITCHER INTERFACE
           ===================================================== */

        if (languageToggle) {
            languageToggle.addEventListener(
                "click",
                function () {
                    const englishIsActive =
                        languageToggle.classList.contains(
                            "english-active"
                        );

                    languageToggle.classList.toggle(
                        "english-active",
                        !englishIsActive
                    );

                    if (englishIsActive) {
                        document.documentElement.lang = "bn";

                        languageToggle.setAttribute(
                            "aria-label",
                            "ইংরেজি ভাষা নির্বাচন করুন"
                        );
                    } else {
                        document.documentElement.lang = "en";

                        languageToggle.setAttribute(
                            "aria-label",
                            "বাংলা ভাষা নির্বাচন করুন"
                        );
                    }
                }
            );
        }

/* =====================================================
   IMPACT COUNTER ANIMATION
   ===================================================== */

const impactSection =
    document.getElementById("impact");

const impactCounters =
    document.querySelectorAll(".impact-counter");

let impactCounterStarted = false;


/*
    Converts English digits to Bangla digits.
*/
function convertToBanglaNumber(number) {
    const banglaDigits = [
        "০",
        "১",
        "২",
        "৩",
        "৪",
        "৫",
        "৬",
        "৭",
        "৮",
        "৯"
    ];

    return String(number).replace(
        /\d/g,
        function (digit) {
            return banglaDigits[Number(digit)];
        }
    );
}


/*
    Starts the counter animation.
*/
function startImpactCounters() {
    if (impactCounterStarted) {
        return;
    }

    impactCounterStarted = true;

    impactCounters.forEach(function (counter) {
        const target =
            Number(counter.dataset.count) || 0;

        const animationDuration = 1600;
        const startTime = performance.now();

        function updateCounter(currentTime) {
            const elapsedTime =
                currentTime - startTime;

            const progress =
                Math.min(
                    elapsedTime / animationDuration,
                    1
                );

            const easedProgress =
                1 - Math.pow(1 - progress, 3);

            const currentValue =
                Math.floor(target * easedProgress);

            counter.textContent =
                convertToBanglaNumber(currentValue);

            if (progress < 1) {
                requestAnimationFrame(
                    updateCounter
                );
            } else {
                counter.textContent =
                    convertToBanglaNumber(target);
            }
        }

        requestAnimationFrame(updateCounter);
    });
}


/*
    Starts the animation only when the section
    enters the visible screen.
*/
if (
    impactSection &&
    impactCounters.length > 0
) {
    if ("IntersectionObserver" in window) {
        const impactObserver =
            new IntersectionObserver(
                function (entries, observer) {
                    entries.forEach(function (entry) {
                        if (entry.isIntersecting) {
                            startImpactCounters();
                            observer.disconnect();
                        }
                    });
                },
                {
                    threshold: 0.3
                }
            );

        impactObserver.observe(impactSection);
    } else {
        startImpactCounters();
    }
}
        /* =====================================================
           AUTOMATIC CURRENT YEAR
           ===================================================== */

        if (currentYear) {
            currentYear.textContent =
                new Date().getFullYear();
        }
    });
})();


/* =========================================================
   STEP 6.4
   GALLERY FILTER, LIGHTBOX, SCROLL REVEAL AND FINAL POLISH
   ========================================================= */

(function () {
    "use strict";

    /* -----------------------------------------------------
       Enable JavaScript-specific CSS
       ----------------------------------------------------- */

    document.documentElement.classList.add("js-enabled");


    /* =====================================================
       1. PHOTO GALLERY FILTER
       ===================================================== */

    const galleryFilterButtons = Array.from(
        document.querySelectorAll(".gallery-filter-button")
    );

    const galleryItems = Array.from(
        document.querySelectorAll(".gallery-item")
    );

    const galleryVisibleCount = document.getElementById(
        "galleryVisibleCount"
    );

    let activeGalleryFilter = "all";

    function updateGalleryCount() {
        if (!galleryVisibleCount) {
            return;
        }

        const visibleItems = galleryItems.filter(function (item) {
            return !item.classList.contains("is-hidden");
        });

        galleryVisibleCount.textContent = convertNumberToBangla(
            visibleItems.length
        );
    }

    function filterGallery(selectedFilter) {
        activeGalleryFilter = selectedFilter;

        galleryItems.forEach(function (item) {
            const itemCategory = item.dataset.galleryCategory;
            const shouldShow =
                selectedFilter === "all" ||
                itemCategory === selectedFilter;

            if (shouldShow) {
                item.classList.remove(
                    "is-hidden",
                    "is-filtering-out"
                );

                item.classList.remove("is-filtering-in");

                window.requestAnimationFrame(function () {
                    item.classList.add("is-filtering-in");
                });

                window.setTimeout(function () {
                    item.classList.remove("is-filtering-in");
                }, 470);
            } else {
                item.classList.add("is-filtering-out");

                window.setTimeout(function () {
                    item.classList.add("is-hidden");
                    item.classList.remove("is-filtering-out");
                }, 330);
            }
        });

        window.setTimeout(function () {
            updateGalleryCount();
            updateActiveLightboxItems();
        }, 360);
    }

    galleryFilterButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const selectedFilter =
                button.dataset.galleryFilter || "all";

            galleryFilterButtons.forEach(function (filterButton) {
                filterButton.classList.remove("active");
                filterButton.setAttribute(
                    "aria-pressed",
                    "false"
                );
            });

            button.classList.add("active");
            button.setAttribute("aria-pressed", "true");

            filterGallery(selectedFilter);
        });
    });

    galleryFilterButtons.forEach(function (button) {
        button.setAttribute(
            "aria-pressed",
            button.classList.contains("active")
                ? "true"
                : "false"
        );
    });


    /* =====================================================
       2. ENGLISH TO BANGLA NUMBER
       ===================================================== */

    function convertNumberToBangla(number) {
        const banglaDigits = [
            "০",
            "১",
            "২",
            "৩",
            "৪",
            "৫",
            "৬",
            "৭",
            "৮",
            "৯"
        ];

        return String(number).replace(
            /\d/g,
            function (digit) {
                return banglaDigits[Number(digit)];
            }
        );
    }


    /* =====================================================
       3. LIGHTBOX ELEMENTS
       ===================================================== */

    const galleryLightbox = document.getElementById(
        "galleryLightbox"
    );

    const galleryLightboxImage = document.getElementById(
        "galleryLightboxImage"
    );

    const galleryLightboxTitle = document.getElementById(
        "galleryLightboxTitle"
    );

    const galleryLightboxDescription =
        document.getElementById(
            "galleryLightboxDescription"
        );

    const galleryLightboxCounter = document.getElementById(
        "galleryLightboxCounter"
    );

    const galleryLightboxLoader = document.getElementById(
        "galleryLightboxLoader"
    );

    const galleryLightboxPrevious = document.getElementById(
        "galleryLightboxPrevious"
    );

    const galleryLightboxNext = document.getElementById(
        "galleryLightboxNext"
    );

    const galleryLightboxCloseButtons =
        document.querySelectorAll("[data-lightbox-close]");

    const allGalleryLinks = Array.from(
        document.querySelectorAll("[data-gallery-lightbox]")
    );

    let activeLightboxLinks = allGalleryLinks.slice();
    let currentLightboxIndex = 0;
    let previousFocusedElement = null;
    let touchStartX = 0;
    let touchEndX = 0;


    /* =====================================================
       4. ACTIVE LIGHTBOX ITEMS
       ===================================================== */

    function updateActiveLightboxItems() {
        activeLightboxLinks = allGalleryLinks.filter(
            function (link) {
                const galleryItem = link.closest(".gallery-item");

                return (
                    galleryItem &&
                    !galleryItem.classList.contains("is-hidden")
                );
            }
        );
    }


    /* =====================================================
       5. LIGHTBOX IMAGE UPDATE
       ===================================================== */

    function updateLightboxContent(index) {
        if (!activeLightboxLinks.length) {
            return;
        }

        if (index < 0) {
            index = activeLightboxLinks.length - 1;
        }

        if (index >= activeLightboxLinks.length) {
            index = 0;
        }

        currentLightboxIndex = index;

        const selectedLink =
            activeLightboxLinks[currentLightboxIndex];

        const selectedImage =
            selectedLink.querySelector("img");

        const imageSource =
            selectedLink.getAttribute("href");

        const imageTitle =
            selectedLink.dataset.galleryTitle ||
            selectedImage?.alt ||
            "গ্যালারির ছবি";

        const imageDescription =
            selectedLink.dataset.galleryDescription || "";

        if (
            !galleryLightboxImage ||
            !galleryLightboxTitle ||
            !galleryLightboxDescription ||
            !galleryLightboxCounter
        ) {
            return;
        }

        galleryLightboxImage.classList.remove("is-loaded");
        galleryLightboxImage.classList.add("is-changing");

        if (galleryLightboxLoader) {
            galleryLightboxLoader.classList.add("is-visible");
        }

        const temporaryImage = new Image();

        temporaryImage.onload = function () {
            galleryLightboxImage.src = imageSource;
            galleryLightboxImage.alt = imageTitle;

            galleryLightboxImage.classList.remove("is-changing");
            galleryLightboxImage.classList.add("is-loaded");

            if (galleryLightboxLoader) {
                galleryLightboxLoader.classList.remove(
                    "is-visible"
                );
            }
        };

        temporaryImage.onerror = function () {
            galleryLightboxImage.src = "";
            galleryLightboxImage.alt =
                "ছবিটি প্রদর্শন করা সম্ভব হয়নি";

            galleryLightboxImage.classList.remove("is-changing");

            if (galleryLightboxLoader) {
                galleryLightboxLoader.classList.remove(
                    "is-visible"
                );
            }
        };

        temporaryImage.src = imageSource;

        galleryLightboxTitle.textContent = imageTitle;
        galleryLightboxDescription.textContent =
            imageDescription;

        galleryLightboxCounter.textContent =
            convertNumberToBangla(currentLightboxIndex + 1) +
            " / " +
            convertNumberToBangla(activeLightboxLinks.length);

        updateLightboxNavigationState();
    }


    /* =====================================================
       6. OPEN LIGHTBOX
       ===================================================== */

    function openGalleryLightbox(selectedLink) {
        if (!galleryLightbox) {
            return;
        }

        updateActiveLightboxItems();

        const selectedIndex =
            activeLightboxLinks.indexOf(selectedLink);

        currentLightboxIndex =
            selectedIndex >= 0 ? selectedIndex : 0;

        previousFocusedElement =
            document.activeElement;

        updateLightboxContent(currentLightboxIndex);

        galleryLightbox.classList.add("is-open");
        galleryLightbox.setAttribute("aria-hidden", "false");

        document.body.classList.add(
            "gallery-lightbox-open"
        );

        window.setTimeout(function () {
            const closeButton =
                galleryLightbox.querySelector(
                    ".gallery-lightbox-close"
                );

            if (closeButton) {
                closeButton.focus();
            }
        }, 100);
    }


    /* =====================================================
       7. CLOSE LIGHTBOX
       ===================================================== */

    function closeGalleryLightbox() {
        if (!galleryLightbox) {
            return;
        }

        galleryLightbox.classList.remove("is-open");
        galleryLightbox.setAttribute("aria-hidden", "true");

        document.body.classList.remove(
            "gallery-lightbox-open"
        );

        if (
            previousFocusedElement &&
            typeof previousFocusedElement.focus === "function"
        ) {
            previousFocusedElement.focus();
        }
    }


    /* =====================================================
       8. PREVIOUS AND NEXT
       ===================================================== */

    function showPreviousLightboxImage() {
        updateLightboxContent(currentLightboxIndex - 1);
    }

    function showNextLightboxImage() {
        updateLightboxContent(currentLightboxIndex + 1);
    }

    function updateLightboxNavigationState() {
        const hasMultipleImages =
            activeLightboxLinks.length > 1;

        if (galleryLightboxPrevious) {
            galleryLightboxPrevious.disabled =
                !hasMultipleImages;
        }

        if (galleryLightboxNext) {
            galleryLightboxNext.disabled =
                !hasMultipleImages;
        }
    }


    /* =====================================================
       9. LIGHTBOX EVENTS
       ===================================================== */

    allGalleryLinks.forEach(function (link) {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            openGalleryLightbox(link);
        });
    });

    galleryLightboxCloseButtons.forEach(
        function (closeButton) {
            closeButton.addEventListener(
                "click",
                closeGalleryLightbox
            );
        }
    );

    if (galleryLightboxPrevious) {
        galleryLightboxPrevious.addEventListener(
            "click",
            showPreviousLightboxImage
        );
    }

    if (galleryLightboxNext) {
        galleryLightboxNext.addEventListener(
            "click",
            showNextLightboxImage
        );
    }


    /* =====================================================
       10. KEYBOARD NAVIGATION
       ===================================================== */

    document.addEventListener("keydown", function (event) {
        if (
            !galleryLightbox ||
            !galleryLightbox.classList.contains("is-open")
        ) {
            return;
        }

        if (event.key === "Escape") {
            closeGalleryLightbox();
        }

        if (event.key === "ArrowLeft") {
            showPreviousLightboxImage();
        }

        if (event.key === "ArrowRight") {
            showNextLightboxImage();
        }

        if (event.key === "Tab") {
            trapLightboxFocus(event);
        }
    });


    /* =====================================================
       11. FOCUS TRAP
       ===================================================== */

    function trapLightboxFocus(event) {
        if (!galleryLightbox) {
            return;
        }

        const focusableElements = Array.from(
            galleryLightbox.querySelectorAll(
                [
                    "button:not([disabled])",
                    "a[href]",
                    "[tabindex]:not([tabindex='-1'])"
                ].join(",")
            )
        );

        if (!focusableElements.length) {
            return;
        }

        const firstElement = focusableElements[0];
        const lastElement =
            focusableElements[
                focusableElements.length - 1
            ];

        if (
            event.shiftKey &&
            document.activeElement === firstElement
        ) {
            event.preventDefault();
            lastElement.focus();
        } else if (
            !event.shiftKey &&
            document.activeElement === lastElement
        ) {
            event.preventDefault();
            firstElement.focus();
        }
    }


    /* =====================================================
       12. MOBILE SWIPE
       ===================================================== */

    if (galleryLightbox) {
        galleryLightbox.addEventListener(
            "touchstart",
            function (event) {
                touchStartX =
                    event.changedTouches[0].screenX;
            },
            {
                passive: true
            }
        );

        galleryLightbox.addEventListener(
            "touchend",
            function (event) {
                touchEndX =
                    event.changedTouches[0].screenX;

                handleLightboxSwipe();
            },
            {
                passive: true
            }
        );
    }

    function handleLightboxSwipe() {
        const swipeDistance =
            touchEndX - touchStartX;

        const minimumSwipeDistance = 55;

        if (
            Math.abs(swipeDistance) <
            minimumSwipeDistance
        ) {
            return;
        }

        if (swipeDistance > 0) {
            showPreviousLightboxImage();
        } else {
            showNextLightboxImage();
        }
    }


    /* =====================================================
       13. BROKEN GALLERY IMAGE FALLBACK
       ===================================================== */

    const galleryImages = document.querySelectorAll(
        ".gallery-item img"
    );

    galleryImages.forEach(function (image) {
        image.addEventListener("error", function () {
            const galleryItem =
                image.closest(".gallery-item");

            if (galleryItem) {
                galleryItem.classList.add(
                    "has-image-error"
                );
            }
        });

        if (
            image.complete &&
            image.naturalWidth === 0
        ) {
            const galleryItem =
                image.closest(".gallery-item");

            if (galleryItem) {
                galleryItem.classList.add(
                    "has-image-error"
                );
            }
        }
    });


    /* =====================================================
       14. SCROLL REVEAL
       ===================================================== */

    const revealElements = Array.from(
        document.querySelectorAll("[data-reveal]")
    );

    const prefersReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

    if (
        "IntersectionObserver" in window &&
        !prefersReducedMotion
    ) {
        const revealObserver =
            new IntersectionObserver(
                function (entries, observer) {
                    entries.forEach(function (entry) {
                        if (!entry.isIntersecting) {
                            return;
                        }

                        entry.target.classList.add(
                            "is-revealed"
                        );

                        observer.unobserve(entry.target);
                    });
                },
                {
                    threshold: 0.12,
                    rootMargin:
                        "0px 0px -45px 0px"
                }
            );

        revealElements.forEach(function (element) {
            revealObserver.observe(element);
        });
    } else {
        revealElements.forEach(function (element) {
            element.classList.add("is-revealed");
        });
    }


    /* =====================================================
       15. INITIAL SETTINGS
       ===================================================== */

    updateGalleryCount();
    updateActiveLightboxItems();
})();


/* =================================================
   STEP 6.4 — GALLERY FILTER, LIGHTBOX
   AND SCROLL REVEAL
   ================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =============================================
       1. REQUIRED ELEMENTS
       ============================================= */

    const galleryItems = Array.from(
        document.querySelectorAll(".gallery-item")
    );

    const galleryLinks = Array.from(
        document.querySelectorAll("[data-gallery-lightbox]")
    );

    const filterButtons = Array.from(
        document.querySelectorAll(".gallery-filter-button")
    );

    const visibleCountElement = document.getElementById(
        "galleryVisibleCount"
    );

    const lightbox = document.getElementById(
        "galleryLightbox"
    );

    const lightboxImage = document.getElementById(
        "galleryLightboxImage"
    );

    const lightboxTitle = document.getElementById(
        "galleryLightboxTitle"
    );

    const lightboxDescription = document.getElementById(
        "galleryLightboxDescription"
    );

    const lightboxCounter = document.getElementById(
        "galleryLightboxCounter"
    );

    const lightboxLoader = document.getElementById(
        "galleryLightboxLoader"
    );

    const previousButton = document.getElementById(
        "galleryLightboxPrevious"
    );

    const nextButton = document.getElementById(
        "galleryLightboxNext"
    );

    const closeButtons = Array.from(
        document.querySelectorAll("[data-lightbox-close]")
    );

    let visibleGalleryLinks = [...galleryLinks];
    let currentImageIndex = 0;
    let lastFocusedElement = null;


    /* =============================================
       2. BANGLA NUMBER CONVERTER
       ============================================= */

    function convertToBanglaNumber(number) {

        const banglaDigits = [
            "০",
            "১",
            "২",
            "৩",
            "৪",
            "৫",
            "৬",
            "৭",
            "৮",
            "৯"
        ];

        return String(number).replace(
            /\d/g,
            function (digit) {
                return banglaDigits[Number(digit)];
            }
        );
    }


    /* =============================================
       3. UPDATE VISIBLE IMAGE LIST
       ============================================= */

    function updateVisibleGalleryLinks() {

        visibleGalleryLinks = galleryLinks.filter(
            function (link) {

                const galleryItem = link.closest(".gallery-item");

                return galleryItem &&
                    !galleryItem.classList.contains("is-hidden");
            }
        );
    }


    /* =============================================
       4. UPDATE GALLERY COUNTER
       ============================================= */

    function updateGalleryCounter() {

        updateVisibleGalleryLinks();

        if (!visibleCountElement) {
            return;
        }

        visibleCountElement.textContent =
            convertToBanglaNumber(
                visibleGalleryLinks.length
            );
    }


    /* =============================================
       5. GALLERY FILTER
       ============================================= */

    function filterGallery(selectedCategory) {

        galleryItems.forEach(function (item) {

            const itemCategory =
                item.getAttribute("data-gallery-category");

            const shouldShow =
                selectedCategory === "all" ||
                itemCategory === selectedCategory;

            if (shouldShow) {

                item.classList.remove("is-hidden");

                window.requestAnimationFrame(function () {
                    item.classList.remove("is-filtering");
                });

            } else {

                item.classList.add("is-filtering");

                window.setTimeout(function () {
                    item.classList.add("is-hidden");
                }, 250);
            }
        });

        window.setTimeout(function () {
            updateGalleryCounter();
        }, 280);
    }


    /* =============================================
       6. FILTER BUTTON CLICK
       ============================================= */

    filterButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const selectedCategory =
                button.getAttribute("data-gallery-filter") || "all";

            filterButtons.forEach(function (singleButton) {

                singleButton.classList.remove("is-active");

                singleButton.setAttribute(
                    "aria-pressed",
                    "false"
                );
            });

            button.classList.add("is-active");

            button.setAttribute(
                "aria-pressed",
                "true"
            );

            filterGallery(selectedCategory);
        });
    });


    /* =============================================
       7. SHOW LIGHTBOX IMAGE
       ============================================= */

    function showLightboxImage(index) {

        if (
            !lightboxImage ||
            visibleGalleryLinks.length === 0
        ) {
            return;
        }

        if (index < 0) {
            index = visibleGalleryLinks.length - 1;
        }

        if (index >= visibleGalleryLinks.length) {
            index = 0;
        }

        currentImageIndex = index;

        const selectedLink =
            visibleGalleryLinks[currentImageIndex];

        const selectedImage =
            selectedLink.querySelector("img");

        const imageSource =
            selectedLink.getAttribute("href");

        const imageTitle =
            selectedLink.getAttribute("data-gallery-title") ||
            "ফটো গ্যালারি";

        const imageDescription =
            selectedLink.getAttribute(
                "data-gallery-description"
            ) || "";

        const imageAlt =
            selectedImage
                ? selectedImage.getAttribute("alt")
                : imageTitle;

        if (lightboxLoader) {
            lightboxLoader.classList.add("is-active");
        }

        lightboxImage.classList.remove("is-loaded");

        lightboxImage.onload = function () {

            lightboxImage.classList.add("is-loaded");

            if (lightboxLoader) {
                lightboxLoader.classList.remove("is-active");
            }
        };

        lightboxImage.onerror = function () {

            if (lightboxLoader) {
                lightboxLoader.classList.remove("is-active");
            }

            lightboxImage.alt =
                "ছবিটি লোড করা সম্ভব হয়নি";
        };

        lightboxImage.src = imageSource;
        lightboxImage.alt = imageAlt;

        if (lightboxTitle) {
            lightboxTitle.textContent = imageTitle;
        }

        if (lightboxDescription) {
            lightboxDescription.textContent =
                imageDescription;
        }

        if (lightboxCounter) {

            const currentNumber =
                convertToBanglaNumber(
                    currentImageIndex + 1
                );

            const totalNumber =
                convertToBanglaNumber(
                    visibleGalleryLinks.length
                );

            lightboxCounter.textContent =
                currentNumber + " / " + totalNumber;
        }
    }


    /* =============================================
       8. OPEN LIGHTBOX
       ============================================= */

    function openLightbox(index) {

        if (!lightbox) {
            return;
        }

        lastFocusedElement = document.activeElement;

        updateVisibleGalleryLinks();

        showLightboxImage(index);

        lightbox.classList.add("is-open");

        lightbox.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.classList.add(
            "gallery-lightbox-open"
        );

        window.setTimeout(function () {

            const closeButton =
                lightbox.querySelector(
                    ".gallery-lightbox-close"
                );

            if (closeButton) {
                closeButton.focus();
            }

        }, 100);
    }


    /* =============================================
       9. CLOSE LIGHTBOX
       ============================================= */

    function closeLightbox() {

        if (!lightbox) {
            return;
        }

        lightbox.classList.remove("is-open");

        lightbox.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.classList.remove(
            "gallery-lightbox-open"
        );

        if (lightboxImage) {

            lightboxImage.classList.remove("is-loaded");

            window.setTimeout(function () {

                if (
                    !lightbox.classList.contains("is-open")
                ) {
                    lightboxImage.src = "";
                }

            }, 300);
        }

        if (
            lastFocusedElement &&
            typeof lastFocusedElement.focus === "function"
        ) {
            lastFocusedElement.focus();
        }
    }


    /* =============================================
       10. OPEN IMAGE FROM GALLERY
       ============================================= */

    galleryLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            event.preventDefault();

            updateVisibleGalleryLinks();

            const selectedIndex =
                visibleGalleryLinks.indexOf(link);

            if (selectedIndex !== -1) {
                openLightbox(selectedIndex);
            }
        });
    });


    /* =============================================
       11. PREVIOUS IMAGE
       ============================================= */

    if (previousButton) {

        previousButton.addEventListener(
            "click",
            function () {
                showLightboxImage(
                    currentImageIndex - 1
                );
            }
        );
    }


    /* =============================================
       12. NEXT IMAGE
       ============================================= */

    if (nextButton) {

        nextButton.addEventListener(
            "click",
            function () {
                showLightboxImage(
                    currentImageIndex + 1
                );
            }
        );
    }


    /* =============================================
       13. CLOSE BUTTONS
       ============================================= */

    closeButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            closeLightbox
        );
    });


    /* =============================================
       14. KEYBOARD CONTROL
       ============================================= */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                !lightbox ||
                !lightbox.classList.contains("is-open")
            ) {
                return;
            }

            if (event.key === "Escape") {

                event.preventDefault();

                closeLightbox();
            }

            if (event.key === "ArrowLeft") {

                event.preventDefault();

                showLightboxImage(
                    currentImageIndex - 1
                );
            }

            if (event.key === "ArrowRight") {

                event.preventDefault();

                showLightboxImage(
                    currentImageIndex + 1
                );
            }
        }
    );


    /* =============================================
       15. SCROLL REVEAL ANIMATION
       ============================================= */

    const revealElements = Array.from(
        document.querySelectorAll("[data-reveal]")
    );

    function revealAllElements() {

        revealElements.forEach(function (element) {
            element.classList.add("is-revealed");
        });
    }

    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(

                function (entries, observer) {

                    entries.forEach(function (entry) {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "is-revealed"
                            );

                            observer.unobserve(
                                entry.target
                            );
                        }
                    });
                },

                {
                    threshold: 0.15,
                    rootMargin: "0px 0px -40px 0px"
                }
            );

        revealElements.forEach(function (element) {
            revealObserver.observe(element);
        });

    } else {

        revealAllElements();
    }


    /* =============================================
       16. INITIAL GALLERY SETUP
       ============================================= */

    updateGalleryCounter();

    const defaultActiveButton =
        filterButtons.find(function (button) {
            return button.classList.contains("is-active");
        });

    if (!defaultActiveButton && filterButtons.length > 0) {

        filterButtons[0].classList.add("is-active");

        filterButtons[0].setAttribute(
            "aria-pressed",
            "true"
        );
    }

});

/* =================================================
   STEP 7 — DONATION COPY SYSTEM
   ================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =============================================
       1. REQUIRED ELEMENTS
       ============================================= */

    const donationCopyButtons = Array.from(
        document.querySelectorAll(
            ".donation-copy-button[data-copy-target]"
        )
    );

    const donationCopyMessage =
        document.getElementById("donationCopyMessage");

    let donationMessageTimer = null;


    /* =============================================
       2. COPY TEXT USING MODERN BROWSER API
       ============================================= */

    async function copyWithClipboardAPI(text) {

        if (
            !navigator.clipboard ||
            typeof navigator.clipboard.writeText !== "function"
        ) {
            return false;
        }

        try {

            await navigator.clipboard.writeText(text);

            return true;

        } catch (error) {

            return false;
        }
    }


    /* =============================================
       3. FALLBACK COPY METHOD
       ============================================= */

    function copyWithFallback(text) {

        const temporaryTextArea =
            document.createElement("textarea");

        temporaryTextArea.value = text;

        temporaryTextArea.setAttribute(
            "readonly",
            ""
        );

        temporaryTextArea.style.position = "fixed";
        temporaryTextArea.style.top = "-9999px";
        temporaryTextArea.style.left = "-9999px";
        temporaryTextArea.style.opacity = "0";

        document.body.appendChild(
            temporaryTextArea
        );

        temporaryTextArea.focus();
        temporaryTextArea.select();

        let copiedSuccessfully = false;

        try {

            copiedSuccessfully =
                document.execCommand("copy");

        } catch (error) {

            copiedSuccessfully = false;
        }

        document.body.removeChild(
            temporaryTextArea
        );

        return copiedSuccessfully;
    }


    /* =============================================
       4. COPY TEXT
       ============================================= */

    async function copyDonationText(text) {

        const copiedWithModernMethod =
            await copyWithClipboardAPI(text);

        if (copiedWithModernMethod) {
            return true;
        }

        return copyWithFallback(text);
    }


    /* =============================================
       5. SHOW SUCCESS OR ERROR MESSAGE
       ============================================= */

    function showDonationCopyMessage(message) {

        if (!donationCopyMessage) {
            return;
        }

        donationCopyMessage.textContent = message;

        donationCopyMessage.classList.add(
            "is-visible"
        );

        donationCopyMessage.setAttribute(
            "aria-hidden",
            "false"
        );

        if (donationMessageTimer) {

            window.clearTimeout(
                donationMessageTimer
            );
        }

        donationMessageTimer =
            window.setTimeout(function () {

                donationCopyMessage.classList.remove(
                    "is-visible"
                );

                donationCopyMessage.setAttribute(
                    "aria-hidden",
                    "true"
                );

            }, 2500);
    }


    /* =============================================
       6. BUTTON COPIED STATE
       ============================================= */

    function showButtonCopiedState(button) {

        if (!button) {
            return;
        }

        const originalButtonHTML =
            button.innerHTML;

        button.classList.add(
            "is-copied"
        );

        button.innerHTML =
            '<span aria-hidden="true">✓</span> কপি হয়েছে';

        window.setTimeout(function () {

            button.classList.remove(
                "is-copied"
            );

            button.innerHTML =
                originalButtonHTML;

        }, 1800);
    }


    /* =============================================
       7. COPY BUTTON CLICK
       ============================================= */

    donationCopyButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            async function () {

                const targetId =
                    button.getAttribute(
                        "data-copy-target"
                    );

                if (!targetId) {

                    showDonationCopyMessage(
                        "কপি করার তথ্য পাওয়া যায়নি"
                    );

                    return;
                }

                const targetElement =
                    document.getElementById(
                        targetId
                    );

                if (!targetElement) {

                    showDonationCopyMessage(
                        "কপি করার তথ্য পাওয়া যায়নি"
                    );

                    return;
                }

                const textToCopy =
                    targetElement.textContent.trim();

                if (!textToCopy) {

                    showDonationCopyMessage(
                        "কপি করার মতো কোনো তথ্য নেই"
                    );

                    return;
                }

                const copiedSuccessfully =
                    await copyDonationText(
                        textToCopy
                    );

                if (copiedSuccessfully) {

                    showButtonCopiedState(
                        button
                    );

                    showDonationCopyMessage(
                        "নম্বর সফলভাবে কপি হয়েছে"
                    );

                } else {

                    showDonationCopyMessage(
                        "কপি করা সম্ভব হয়নি। অনুগ্রহ করে নম্বরটি ম্যানুয়ালি কপি করুন।"
                    );
                }
            }
        );
    });

});

/* =================================================
   STEP 8 — VOLUNTEER REGISTRATION FORM
   VALIDATION AND SUBMISSION
   ================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =============================================
       1. REQUIRED ELEMENTS
       ============================================= */

    const volunteerForm =
        document.getElementById(
            "volunteerRegistrationForm"
        );

    const volunteerSubmitButton =
        document.getElementById(
            "volunteerSubmitButton"
        );

    const volunteerFormMessage =
        document.getElementById(
            "volunteerFormMessage"
        );

    const volunteerInterestError =
        document.getElementById(
            "volunteerInterestError"
        );

    const volunteerAgreementError =
        document.getElementById(
            "volunteerAgreementError"
        );

    if (!volunteerForm) {
        return;
    }


    /* =============================================
       2. FIELD CONFIGURATION
       ============================================= */

    const requiredFields = [
        {
            id: "volunteerFullName",
            message: "আপনার পূর্ণ নাম লিখুন।"
        },
        {
            id: "volunteerGender",
            message: "লিঙ্গ নির্বাচন করুন।"
        },
        {
            id: "volunteerProfession",
            message: "পেশা নির্বাচন করুন।"
        },
        {
            id: "volunteerMobile",
            message: "সঠিক মোবাইল নম্বর লিখুন।"
        },
        {
            id: "volunteerAddress",
            message: "বর্তমান ঠিকানা লিখুন।"
        },
        {
            id: "volunteerAvailability",
            message: "সময় দেওয়ার সক্ষমতা নির্বাচন করুন।"
        },
        {
            id: "volunteerMotivation",
            message: "কেন স্বেচ্ছাসেবক হতে চান তা লিখুন।"
        }
    ];


    /* =============================================
       3. FORM MESSAGE
       ============================================= */

    function showVolunteerFormMessage(
        message,
        type
    ) {
        if (!volunteerFormMessage) {
            return;
        }

        volunteerFormMessage.textContent =
            message;

        volunteerFormMessage.classList.remove(
            "is-success",
            "is-error"
        );

        volunteerFormMessage.classList.add(
            "is-visible"
        );

        if (type === "success") {
            volunteerFormMessage.classList.add(
                "is-success"
            );
        }

        if (type === "error") {
            volunteerFormMessage.classList.add(
                "is-error"
            );
        }

        volunteerFormMessage.setAttribute(
            "aria-hidden",
            "false"
        );
    }


    function hideVolunteerFormMessage() {
        if (!volunteerFormMessage) {
            return;
        }

        volunteerFormMessage.textContent = "";

        volunteerFormMessage.classList.remove(
            "is-visible",
            "is-success",
            "is-error"
        );

        volunteerFormMessage.setAttribute(
            "aria-hidden",
            "true"
        );
    }


    /* =============================================
       4. FIELD ERROR HELPERS
       ============================================= */

    function getFieldWrapper(field) {
        return field.closest(
            ".volunteer-form-field"
        );
    }


    function getFieldErrorElement(field) {
        const wrapper = getFieldWrapper(field);

        if (!wrapper) {
            return null;
        }

        return wrapper.querySelector(
            ".volunteer-field-error"
        );
    }


    function showFieldError(
        field,
        message
    ) {
        const wrapper = getFieldWrapper(field);

        const errorElement =
            getFieldErrorElement(field);

        if (wrapper) {
            wrapper.classList.add("has-error");
            wrapper.classList.remove(
                "has-success"
            );
        }

        if (errorElement) {
            errorElement.textContent = message;
        }

        field.setAttribute(
            "aria-invalid",
            "true"
        );
    }


    function clearFieldError(field) {
        const wrapper = getFieldWrapper(field);

        const errorElement =
            getFieldErrorElement(field);

        if (wrapper) {
            wrapper.classList.remove(
                "has-error"
            );

            wrapper.classList.add(
                "has-success"
            );
        }

        if (errorElement) {
            errorElement.textContent = "";
        }

        field.setAttribute(
            "aria-invalid",
            "false"
        );
    }


    function resetFieldState(field) {
        const wrapper = getFieldWrapper(field);

        const errorElement =
            getFieldErrorElement(field);

        if (wrapper) {
            wrapper.classList.remove(
                "has-error",
                "has-success"
            );
        }

        if (errorElement) {
            errorElement.textContent = "";
        }

        field.removeAttribute("aria-invalid");
    }


    /* =============================================
       5. MOBILE NUMBER VALIDATION
       ============================================= */

    function normalizeBangladeshMobile(
        value
    ) {
        return value.replace(/\D/g, "");
    }


    function isValidBangladeshMobile(
        value
    ) {
        const mobileNumber =
            normalizeBangladeshMobile(value);

        return /^01[3-9]\d{8}$/.test(
            mobileNumber
        );
    }


    /* =============================================
       6. EMAIL VALIDATION
       ============================================= */

    function isValidEmail(value) {
        if (!value) {
            return true;
        }

        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
            value
        );
    }


    /* =============================================
       7. SINGLE FIELD VALIDATION
       ============================================= */

    function validateSingleField(field) {
        const fieldValue =
            field.value.trim();

        const fieldId = field.id;

        const configuredField =
            requiredFields.find(
                function (item) {
                    return item.id === fieldId;
                }
            );

        if (
            configuredField &&
            !fieldValue
        ) {
            showFieldError(
                field,
                configuredField.message
            );

            return false;
        }

        if (
            fieldId === "volunteerMobile" &&
            !isValidBangladeshMobile(fieldValue)
        ) {
            showFieldError(
                field,
                "১১ সংখ্যার সঠিক বাংলাদেশি মোবাইল নম্বর লিখুন।"
            );

            return false;
        }

        if (
            fieldId === "volunteerWhatsApp" &&
            fieldValue &&
            !isValidBangladeshMobile(fieldValue)
        ) {
            showFieldError(
                field,
                "সঠিক WhatsApp নম্বর লিখুন।"
            );

            return false;
        }

        if (
            fieldId === "volunteerEmail" &&
            !isValidEmail(fieldValue)
        ) {
            showFieldError(
                field,
                "সঠিক Email Address লিখুন।"
            );

            return false;
        }

        if (
            fieldId === "volunteerMotivation" &&
            fieldValue.length < 10
        ) {
            showFieldError(
                field,
                "কমপক্ষে ১০ অক্ষরে আপনার আগ্রহ লিখুন।"
            );

            return false;
        }

        clearFieldError(field);

        return true;
    }


    /* =============================================
       8. INTEREST VALIDATION
       ============================================= */

    function validateVolunteerInterests() {
        const selectedInterests =
            volunteerForm.querySelectorAll(
                'input[name="interests"]:checked'
            );

        if (selectedInterests.length === 0) {
            if (volunteerInterestError) {
                volunteerInterestError.textContent =
                    "কমপক্ষে একটি কার্যক্রম নির্বাচন করুন।";
            }

            return false;
        }

        if (volunteerInterestError) {
            volunteerInterestError.textContent = "";
        }

        return true;
    }


    /* =============================================
       9. AGREEMENT VALIDATION
       ============================================= */

    function validateVolunteerAgreement() {
        const agreementCheckbox =
            document.getElementById(
                "volunteerAgreement"
            );

        if (
            !agreementCheckbox ||
            !agreementCheckbox.checked
        ) {
            if (volunteerAgreementError) {
                volunteerAgreementError.textContent =
                    "নিবন্ধন জমা দিতে সম্মতি প্রদান করুন।";
            }

            return false;
        }

        if (volunteerAgreementError) {
            volunteerAgreementError.textContent = "";
        }

        return true;
    }


    /* =============================================
       10. COMPLETE FORM VALIDATION
       ============================================= */

    function validateVolunteerForm() {
        let formIsValid = true;
        let firstInvalidField = null;

        requiredFields.forEach(
            function (configuredField) {
                const field =
                    document.getElementById(
                        configuredField.id
                    );

                if (!field) {
                    return;
                }

                const fieldIsValid =
                    validateSingleField(field);

                if (!fieldIsValid) {
                    formIsValid = false;

                    if (!firstInvalidField) {
                        firstInvalidField = field;
                    }
                }
            }
        );

        const optionalFields = [
            "volunteerWhatsApp",
            "volunteerEmail"
        ];

        optionalFields.forEach(
            function (fieldId) {
                const field =
                    document.getElementById(
                        fieldId
                    );

                if (
                    field &&
                    field.value.trim()
                ) {
                    const fieldIsValid =
                        validateSingleField(field);

                    if (!fieldIsValid) {
                        formIsValid = false;

                        if (!firstInvalidField) {
                            firstInvalidField =
                                field;
                        }
                    }
                }
            }
        );

        if (!validateVolunteerInterests()) {
            formIsValid = false;

            if (!firstInvalidField) {
                firstInvalidField =
                    volunteerForm.querySelector(
                        'input[name="interests"]'
                    );
            }
        }

        if (!validateVolunteerAgreement()) {
            formIsValid = false;

            if (!firstInvalidField) {
                firstInvalidField =
                    document.getElementById(
                        "volunteerAgreement"
                    );
            }
        }

        if (
            !formIsValid &&
            firstInvalidField
        ) {
            firstInvalidField.focus();

            firstInvalidField.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
        }

        return formIsValid;
    }


    /* =============================================
       11. SUBMIT BUTTON LOADING STATE
       ============================================= */

    function setVolunteerLoadingState(
        isLoading
    ) {
        if (!volunteerSubmitButton) {
            return;
        }

        volunteerSubmitButton.classList.toggle(
            "is-loading",
            isLoading
        );

        volunteerSubmitButton.disabled =
            isLoading;

        const buttonText =
            volunteerSubmitButton.querySelector(
                ".volunteer-submit-text"
            );

        if (buttonText) {
            buttonText.textContent =
                isLoading
                    ? "জমা দেওয়া হচ্ছে..."
                    : "নিবন্ধন জমা দিন";
        }
    }


    /* =============================================
       12. FORM DATA PREPARATION
       ============================================= */

    function collectVolunteerFormData() {
        const formData =
            new FormData(volunteerForm);

        const selectedInterests =
            Array.from(
                volunteerForm.querySelectorAll(
                    'input[name="interests"]:checked'
                )
            ).map(function (checkbox) {
                return checkbox.value;
            });

        return {
            fullName:
                formData.get("fullName") || "",
            guardianName:
                formData.get("guardianName") || "",
            dateOfBirth:
                formData.get("dateOfBirth") || "",
            gender:
                formData.get("gender") || "",
            bloodGroup:
                formData.get("bloodGroup") || "",
            profession:
                formData.get("profession") || "",
            mobile:
                formData.get("mobile") || "",
            whatsApp:
                formData.get("whatsApp") || "",
            email:
                formData.get("email") || "",
            address:
                formData.get("address") || "",
            interests: selectedInterests,
            skills:
                formData.get("skills") || "",
            availability:
                formData.get("availability") || "",
            experience:
                formData.get("experience") || "",
            motivation:
                formData.get("motivation") || "",
            agreement:
                formData.get("agreement")
                    ? true
                    : false
        };
    }


    /* =============================================
       13. FORM SUBMISSION
       ============================================= */

    volunteerForm.addEventListener(
        "submit",
        function (event) {
            event.preventDefault();

            hideVolunteerFormMessage();

            const formIsValid =
                validateVolunteerForm();

            if (!formIsValid) {
                showVolunteerFormMessage(
                    "অনুগ্রহ করে চিহ্নিত তথ্যগুলো সঠিকভাবে পূরণ করুন।",
                    "error"
                );

                return;
            }

            setVolunteerLoadingState(true);

            const volunteerData =
                collectVolunteerFormData();

            /*
                ভবিষ্যতে Google Sheets অথবা
                অন্য Database-এ পাঠাতে এই
                volunteerData ব্যবহার করা হবে।
            */

            console.log(
                "Volunteer Registration Data:",
                volunteerData
            );

            window.setTimeout(function () {
                setVolunteerLoadingState(false);

                showVolunteerFormMessage(
                    "আপনার স্বেচ্ছাসেবক নিবন্ধন সফলভাবে গ্রহণ করা হয়েছে। শিগগিরই আপনার সঙ্গে যোগাযোগ করা হবে।",
                    "success"
                );

                volunteerForm.reset();

                resetAllVolunteerFieldStates();

                volunteerFormMessage.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });
            }, 1200);
        }
    );


    /* =============================================
       14. LIVE FIELD VALIDATION
       ============================================= */

    const volunteerFormFields =
        Array.from(
            volunteerForm.querySelectorAll(
                "input, select, textarea"
            )
        );

    volunteerFormFields.forEach(
        function (field) {
            if (
                field.type === "checkbox"
            ) {
                return;
            }

            field.addEventListener(
                "blur",
                function () {
                    if (
                        field.required ||
                        field.value.trim()
                    ) {
                        validateSingleField(field);
                    }
                }
            );

            field.addEventListener(
                "input",
                function () {
                    const wrapper =
                        getFieldWrapper(field);

                    if (
                        wrapper &&
                        wrapper.classList.contains(
                            "has-error"
                        )
                    ) {
                        validateSingleField(field);
                    }
                }
            );

            field.addEventListener(
                "change",
                function () {
                    if (
                        field.required ||
                        field.value.trim()
                    ) {
                        validateSingleField(field);
                    }
                }
            );
        }
    );


    /* =============================================
       15. INTEREST CHECKBOX EVENTS
       ============================================= */

    const interestCheckboxes =
        Array.from(
            volunteerForm.querySelectorAll(
                'input[name="interests"]'
            )
        );

    interestCheckboxes.forEach(
        function (checkbox) {
            checkbox.addEventListener(
                "change",
                validateVolunteerInterests
            );
        }
    );


    /* =============================================
       16. AGREEMENT EVENT
       ============================================= */

    const volunteerAgreement =
        document.getElementById(
            "volunteerAgreement"
        );

    if (volunteerAgreement) {
        volunteerAgreement.addEventListener(
            "change",
            validateVolunteerAgreement
        );
    }


    /* =============================================
       17. RESET ALL FIELD STATES
       ============================================= */

    function resetAllVolunteerFieldStates() {
        volunteerFormFields.forEach(
            function (field) {
                resetFieldState(field);
            }
        );

        if (volunteerInterestError) {
            volunteerInterestError.textContent = "";
        }

        if (volunteerAgreementError) {
            volunteerAgreementError.textContent = "";
        }
    }


    /* =============================================
       18. RESET BUTTON EVENT
       ============================================= */

    volunteerForm.addEventListener(
        "reset",
        function () {
            window.setTimeout(function () {
                resetAllVolunteerFieldStates();
                hideVolunteerFormMessage();
                setVolunteerLoadingState(false);
            }, 0);
        }
    );

});

/* =================================================
   STEP 9 — EXECUTIVE COMMITTEE IMAGE FALLBACK
   ================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const committeeImages = Array.from(
        document.querySelectorAll(
            ".committee-member-image img, " +
            ".committee-small-member-card img"
        )
    );

    if (!committeeImages.length) {
        return;
    }

    function applyCommitteeImageFallback(image) {

        const mainImageWrapper = image.closest(
            ".committee-member-image"
        );

        const smallMemberCard = image.closest(
            ".committee-small-member-card"
        );

        if (mainImageWrapper) {
            mainImageWrapper.classList.add(
                "has-image-error"
            );
        }

        if (smallMemberCard) {
            smallMemberCard.classList.add(
                "has-image-error"
            );
        }

        image.setAttribute(
            "aria-hidden",
            "true"
        );
    }

    committeeImages.forEach(function (image) {

        image.addEventListener(
            "error",
            function () {
                applyCommitteeImageFallback(image);
            }
        );

        if (
            image.complete &&
            image.naturalWidth === 0
        ) {
            applyCommitteeImageFallback(image);
        }
    });

});
/* =================================================
   STEP 10 — CONTACT FORM VALIDATION
   ================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const contactForm =
        document.getElementById("contactForm");

    const contactSubmitButton =
        document.getElementById(
            "contactSubmitButton"
        );

    const contactFormMessage =
        document.getElementById(
            "contactFormMessage"
        );

    if (!contactForm) {
        return;
    }

    const contactName =
        document.getElementById("contactName");

    const contactPhone =
        document.getElementById("contactPhone");

    const contactEmail =
        document.getElementById("contactEmail");

    const contactSubject =
        document.getElementById("contactSubject");

    const contactMessage =
        document.getElementById("contactMessage");


    /* =============================================
       1. FORM MESSAGE
       ============================================= */

    function showContactFormMessage(
        message,
        type
    ) {
        if (!contactFormMessage) {
            return;
        }

        contactFormMessage.textContent = message;

        contactFormMessage.classList.remove(
            "is-success",
            "is-error"
        );

        contactFormMessage.classList.add(
            "is-visible"
        );

        if (type === "success") {
            contactFormMessage.classList.add(
                "is-success"
            );
        }

        if (type === "error") {
            contactFormMessage.classList.add(
                "is-error"
            );
        }

        contactFormMessage.setAttribute(
            "aria-hidden",
            "false"
        );
    }


    function hideContactFormMessage() {
        if (!contactFormMessage) {
            return;
        }

        contactFormMessage.textContent = "";

        contactFormMessage.classList.remove(
            "is-visible",
            "is-success",
            "is-error"
        );

        contactFormMessage.setAttribute(
            "aria-hidden",
            "true"
        );
    }


    /* =============================================
       2. FIELD ERROR
       ============================================= */

    function showContactFieldError(field) {
        if (!field) {
            return;
        }

        field.classList.add("has-error");

        field.setAttribute(
            "aria-invalid",
            "true"
        );
    }


    function clearContactFieldError(field) {
        if (!field) {
            return;
        }

        field.classList.remove("has-error");

        field.setAttribute(
            "aria-invalid",
            "false"
        );
    }


    /* =============================================
       3. MOBILE VALIDATION
       ============================================= */

    function isValidContactMobile(value) {
        const cleanNumber =
            value.replace(/\D/g, "");

        return /^01[3-9]\d{8}$/.test(
            cleanNumber
        );
    }


    /* =============================================
       4. EMAIL VALIDATION
       ============================================= */

    function isValidContactEmail(value) {
        if (!value) {
            return true;
        }

        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
            value
        );
    }


    /* =============================================
       5. COMPLETE VALIDATION
       ============================================= */

    function validateContactForm() {
        let isValid = true;
        let firstInvalidField = null;

        const requiredFields = [
            contactName,
            contactPhone,
            contactSubject,
            contactMessage
        ];

        requiredFields.forEach(function (field) {
            if (!field) {
                return;
            }

            if (!field.value.trim()) {
                showContactFieldError(field);

                isValid = false;

                if (!firstInvalidField) {
                    firstInvalidField = field;
                }
            } else {
                clearContactFieldError(field);
            }
        });

        if (
            contactPhone &&
            contactPhone.value.trim() &&
            !isValidContactMobile(
                contactPhone.value
            )
        ) {
            showContactFieldError(contactPhone);

            isValid = false;

            if (!firstInvalidField) {
                firstInvalidField = contactPhone;
            }
        }

        if (
            contactEmail &&
            contactEmail.value.trim() &&
            !isValidContactEmail(
                contactEmail.value.trim()
            )
        ) {
            showContactFieldError(contactEmail);

            isValid = false;

            if (!firstInvalidField) {
                firstInvalidField = contactEmail;
            }
        } else if (
            contactEmail &&
            contactEmail.value.trim()
        ) {
            clearContactFieldError(contactEmail);
        }

        if (
            contactMessage &&
            contactMessage.value.trim() &&
            contactMessage.value.trim().length < 10
        ) {
            showContactFieldError(contactMessage);

            isValid = false;

            if (!firstInvalidField) {
                firstInvalidField = contactMessage;
            }
        }

        if (
            !isValid &&
            firstInvalidField
        ) {
            firstInvalidField.focus();

            firstInvalidField.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
        }

        return isValid;
    }


    /* =============================================
       6. SUBMIT LOADING STATE
       ============================================= */

    function setContactLoadingState(
        isLoading
    ) {
        if (!contactSubmitButton) {
            return;
        }

        contactSubmitButton.classList.toggle(
            "is-loading",
            isLoading
        );

        contactSubmitButton.disabled =
            isLoading;

        const buttonText =
            contactSubmitButton.querySelector(
                ".contact-submit-text"
            );

        if (buttonText) {
            buttonText.textContent =
                isLoading
                    ? "পাঠানো হচ্ছে..."
                    : "বার্তা পাঠান";
        }
    }


    /* =============================================
       7. FORM SUBMISSION
       ============================================= */

    contactForm.addEventListener(
        "submit",
        function (event) {
            event.preventDefault();

            hideContactFormMessage();

            const formIsValid =
                validateContactForm();

            if (!formIsValid) {
                showContactFormMessage(
                    "অনুগ্রহ করে প্রয়োজনীয় তথ্যগুলো সঠিকভাবে পূরণ করুন।",
                    "error"
                );

                return;
            }

            setContactLoadingState(true);

            const contactFormData = {
                name: contactName.value.trim(),
                phone: contactPhone.value.trim(),
                email: contactEmail
                    ? contactEmail.value.trim()
                    : "",
                subject:
                    contactSubject.value.trim(),
                message:
                    contactMessage.value.trim()
            };

            /*
                ভবিষ্যতে Email Service,
                Google Sheets অথবা Database-এ
                পাঠাতে contactFormData ব্যবহার হবে।
            */

            console.log(
                "Contact Form Data:",
                contactFormData
            );

            window.setTimeout(function () {
                setContactLoadingState(false);

                showContactFormMessage(
                    "আপনার বার্তা সফলভাবে গ্রহণ করা হয়েছে। শিগগিরই আপনার সঙ্গে যোগাযোগ করা হবে।",
                    "success"
                );

                contactForm.reset();

                [
                    contactName,
                    contactPhone,
                    contactEmail,
                    contactSubject,
                    contactMessage
                ].forEach(function (field) {
                    clearContactFieldError(field);
                });

                contactFormMessage.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });
            }, 1100);
        }
    );


    /* =============================================
       8. LIVE ERROR CLEAR
       ============================================= */

    [
        contactName,
        contactPhone,
        contactEmail,
        contactSubject,
        contactMessage
    ].forEach(function (field) {
        if (!field) {
            return;
        }

        field.addEventListener(
            "input",
            function () {
                if (field.value.trim()) {
                    clearContactFieldError(field);
                }
            }
        );
    });

});

/* =================================================
   STEP 11 — FOOTER AUTOMATIC YEAR
   ================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const footerCurrentYear =
        document.getElementById(
            "footerCurrentYear"
        );

    if (footerCurrentYear) {
        footerCurrentYear.textContent =
            new Date().getFullYear();
    }

});
/* =================================================
   STEP 11 — FOOTER SMOOTH SCROLL
   ================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const footerInternalLinks =
        document.querySelectorAll(
            '.site-footer a[href^="#"]'
        );

    footerInternalLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function (event) {

                const targetId =
                    link.getAttribute("href");

                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }

                const targetSection =
                    document.querySelector(targetId);

                if (!targetSection) {
                    return;
                }

                event.preventDefault();

                targetSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        );
    });

});

/* =================================================
   STEP 12 — FLOATING ACTIONS
   BACK TO TOP + FOOTER POSITION
   ================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const backToTopButton =
        document.getElementById(
            "backToTopButton"
        );

    const floatingActions =
        document.getElementById(
            "floatingActions"
        );

    const footer =
        document.getElementById(
            "footer"
        );

    const donationFloatingButton =
        document.querySelector(
            '.floating-donation[href="#donation"]'
        );


    /* =============================================
       1. BACK TO TOP VISIBILITY
       ============================================= */

    function updateBackToTopVisibility() {

        if (!backToTopButton) {
            return;
        }

        const scrollPosition =
            window.scrollY ||
            document.documentElement.scrollTop;

        if (scrollPosition > 500) {

            backToTopButton.classList.add(
                "is-visible"
            );

        } else {

            backToTopButton.classList.remove(
                "is-visible"
            );
        }
    }


    /* =============================================
       2. BACK TO TOP CLICK
       ============================================= */

    if (backToTopButton) {

        backToTopButton.addEventListener(
            "click",
            function () {

                const prefersReducedMotion =
                    window.matchMedia(
                        "(prefers-reduced-motion: reduce)"
                    ).matches;

                window.scrollTo({
                    top: 0,
                    behavior:
                        prefersReducedMotion
                            ? "auto"
                            : "smooth"
                });
            }
        );
    }


    /* =============================================
       3. FLOATING DONATION SMOOTH SCROLL
       ============================================= */

    if (donationFloatingButton) {

        donationFloatingButton.addEventListener(
            "click",
            function (event) {

                const donationSection =
                    document.getElementById(
                        "donation"
                    );

                if (!donationSection) {
                    return;
                }

                event.preventDefault();

                const prefersReducedMotion =
                    window.matchMedia(
                        "(prefers-reduced-motion: reduce)"
                    ).matches;

                donationSection.scrollIntoView({
                    behavior:
                        prefersReducedMotion
                            ? "auto"
                            : "smooth",
                    block: "start"
                });
            }
        );
    }


    /* =============================================
       4. FOOTER DISTANCE CHECK
       ============================================= */

    function updateFloatingPositionNearFooter() {

        if (!footer) {
            return;
        }

        const footerRect =
            footer.getBoundingClientRect();

        const viewportHeight =
            window.innerHeight;

        const footerIsNear =
            footerRect.top <
            viewportHeight - 70;

        if (floatingActions) {

            floatingActions.classList.toggle(
                "is-near-footer",
                footerIsNear
            );
        }

        if (backToTopButton) {

            backToTopButton.classList.toggle(
                "is-near-footer",
                footerIsNear
            );
        }
    }


    /* =============================================
       5. OPTIMIZED SCROLL HANDLER
       ============================================= */

    let floatingScrollTicking = false;

    function handleFloatingScroll() {

        if (floatingScrollTicking) {
            return;
        }

        floatingScrollTicking = true;

        window.requestAnimationFrame(
            function () {

                updateBackToTopVisibility();

                updateFloatingPositionNearFooter();

                floatingScrollTicking = false;
            }
        );
    }


    /* =============================================
       6. SCROLL EVENT
       ============================================= */

    window.addEventListener(
        "scroll",
        handleFloatingScroll,
        {
            passive: true
        }
    );


    /* =============================================
       7. RESIZE EVENT
       ============================================= */

    window.addEventListener(
        "resize",
        function () {

            updateFloatingPositionNearFooter();
        }
    );


    /* =============================================
       8. INITIAL STATE
       ============================================= */

    updateBackToTopVisibility();

    updateFloatingPositionNearFooter();

});

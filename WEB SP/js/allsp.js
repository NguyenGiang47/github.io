document.addEventListener('DOMContentLoaded', function() {
    // --- Carousel (Hero Section) functionality ---
    const carouselSlide = document.querySelector('.carousel-slide');
    const carouselImages = document.querySelectorAll('.carousel-slide img');
    const dotsContainer = document.querySelector('.carousel-dots');

    if (carouselSlide && carouselImages.length > 0 && dotsContainer) {
        let currentIndex = 0;
        const totalImages = carouselImages.length;
        let slideInterval;

        // Create dots
        for (let i = 0; i < totalImages; i++) {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (i === 0) {
                dot.classList.add('active');
            }
            dot.dataset.index = i;
            dotsContainer.appendChild(dot);
            dot.addEventListener('click', function() {
                clearInterval(slideInterval); // Clear interval on manual click
                currentIndex = parseInt(this.dataset.index);
                updateCarousel();
                startSlideShow(); // Restart interval after manual click
            });
        }

        const dots = document.querySelectorAll('.dot');

        function updateCarousel() {
            const offset = -currentIndex * 100;
            carouselSlide.style.transform = `translateX(${offset}%)`;

            // Update active dot
            dots.forEach(dot => dot.classList.remove('active'));
            if (dots[currentIndex]) {
                dots[currentIndex].classList.add('active');
            }
        }

        function nextSlide() {
            currentIndex = (currentIndex + 1) % totalImages;
            updateCarousel();
        }

        function startSlideShow() {
            // Clear any existing interval to prevent multiple intervals running
            clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, 5000); // Change image every 5 seconds
        }

        // Initialize carousel and start slideshow
        updateCarousel();
        startSlideShow();

        // Optional: Pause slideshow on hover
        carouselSlide.addEventListener('mouseenter', () => clearInterval(slideInterval));
        carouselSlide.addEventListener('mouseleave', () => startSlideShow());
    } else {
        console.warn("Carousel elements not found. Carousel functionality disabled.");
    }


    // --- User Icon Redirection (Example: to login page) ---
    const userIcon = document.querySelector('.header-icons a[href="login.html"]');
    if (userIcon) {
        userIcon.addEventListener('click', function(event) {
            // This prevents the default link behavior if you want to add more complex JS logic
            // event.preventDefault();
            // console.log("User icon clicked, redirecting to login page...");
            // window.location.href = this.href; // Explicitly navigate
        });
    }

    // You can add more general JavaScript functionalities here
    // For example, a simple dropdown menu toggle if you expand the "Sản phẩm" menu
    const dropdownToggle = document.querySelector('.navigation .dropdown > a');
    const dropdownContent = document.querySelector('.navigation .dropdown .dropdown-content');

    if (dropdownToggle && dropdownContent) {
        dropdownToggle.addEventListener('click', function(event) {
            // This prevents the default link navigation if a dropdown is active
            // and instead just toggles the dropdown visibility.
            // If you want the link to navigate AND have a dropdown, you'd need a different approach (e.g., hover).
            // event.preventDefault(); // Uncomment if you want to stop the link from navigating on click
            dropdownContent.classList.toggle('show'); // 'show' class would need CSS for display: block
        });

        // Close the dropdown if the user clicks outside of it
        window.addEventListener('click', function(event) {
            if (!event.target.matches('.navigation .dropdown > a') && !event.target.closest('.dropdown-content')) {
                if (dropdownContent.classList.contains('show')) {
                    dropdownContent.classList.remove('show');
                }
            }
        });
    }
});
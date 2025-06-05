document.addEventListener('DOMContentLoaded', function () {
    // ================= SLIDER ẢNH TRANG CHỦ =================
    const heroImage = document.getElementById('hero-img');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const images = [
        'imgindex/ao-polo-nam-pc.webp',
        'imgindex/sanhdoi-collection-pc.webp',
        'imgindex/slider-tnrp_pc.webp',
        'imgindex/social-circle_pc.webp'
    ];
    let currentIndex = 0;
    const intervalTime = 5000;
    let intervalId;

    function updateImage() {
        heroImage.src = images[currentIndex];
    }

    function nextImage() {
        currentIndex = (currentIndex + 1) % images.length;
        updateImage();
    }

    function prevImage() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateImage();
    }

    nextBtn.addEventListener('click', nextImage);
    prevBtn.addEventListener('click', prevImage);
    updateImage();
    intervalId = setInterval(nextImage, intervalTime);

    // ================= DROPDOWN MENU =================
    const sanPhamDropdown = document.querySelector('.navigation .dropdown > a');
    const horizontalMenu = document.querySelector('.navigation .dropdown-content.horizontal-menu');

    if (sanPhamDropdown && horizontalMenu) {
        sanPhamDropdown.addEventListener('click', function (event) {
            event.preventDefault();
            horizontalMenu.style.display = (horizontalMenu.style.display === 'block') ? 'none' : 'block';
            const otherDropdowns = document.querySelectorAll('.navigation .dropdown-content:not(.horizontal-menu)');
            otherDropdowns.forEach(dropdown => dropdown.style.display = 'none');
        });
    }

    // ================= SEARCH OVERLAY =================
    const openSearchBtn = document.getElementById('openSearchBtn');
    const closeSearchBtn = document.getElementById('closeSearchBtn');
    const searchOverlay = document.getElementById('searchOverlay');

    openSearchBtn?.addEventListener('click', function (e) {
        e.preventDefault();
        searchOverlay.classList.add('active');
    });

    closeSearchBtn?.addEventListener('click', function () {
        searchOverlay.classList.remove('active');
    });

    searchOverlay?.addEventListener('click', function (event) {
        if (event.target === searchOverlay) {
            searchOverlay.classList.remove('active');
        }
    });

    // ================= SLIDER DANH SÁCH SẢN PHẨM =================
    const productSlider = document.querySelector('.best-selling-products .product-slider');
    const prevButton = document.querySelector('.best-selling-products .prev-btn');
    const nextButton = document.querySelector('.best-selling-products .next-btn');

    if (productSlider && prevButton && nextButton) {
        prevButton.addEventListener('click', () => {
            productSlider.scrollLeft -= 300;
        });
        nextButton.addEventListener('click', () => {
            productSlider.scrollLeft += 300;
        });

        const updateButtonVisibility = () => {
            prevButton.style.display = productSlider.scrollLeft > 0 ? 'block' : 'none';
            nextButton.style.display = productSlider.scrollLeft < productSlider.scrollWidth - productSlider.clientWidth ? 'block' : 'none';
        };

        productSlider.addEventListener('scroll', updateButtonVisibility);
        updateButtonVisibility();
    }

    // ================= ICON NGƯỜI DÙNG CHUYỂN TRANG LOGIN =================
    const userIcon = document.querySelector('.header-icons a:nth-child(2)');
    userIcon?.addEventListener('click', function (event) {
        event.preventDefault();
        window.location.href = '/login.html';
    });

    // ================= ĐĂNG KÝ - ĐĂNG NHẬP =================
    const loginContainer = document.getElementById('loginContainer');
    const registerContainer = document.getElementById('registerContainer');
    const logoutContainer = document.getElementById('logoutContainer');
    const showRegisterForm = document.getElementById('showRegisterForm');
    const showLoginForm = document.getElementById('showLoginForm');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const logoutButton = document.getElementById('logoutButton');
    const loggedInUserDisplay = document.getElementById('loggedInUser');

    function displayRegisterForm() {
        loginContainer.style.display = 'none';
        logoutContainer.style.display = 'none';
        registerContainer.style.display = 'block';
    }

    function displayLoginForm() {
        registerContainer.style.display = 'none';
        logoutContainer.style.display = 'none';
        loginContainer.style.display = 'block';
    }

    function displayLogoutPage(username) {
        loginContainer.style.display = 'none';
        registerContainer.style.display = 'none';
        loggedInUserDisplay.textContent = `Đã đăng nhập với tên: ${username}`;
        logoutContainer.style.display = 'block';
    }

    showRegisterForm?.addEventListener('click', (e) => {
        e.preventDefault();
        displayRegisterForm();
    });

    showLoginForm?.addEventListener('click', (e) => {
        e.preventDefault();
        displayLoginForm();
    });

    registerForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('registerUsername').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (password !== confirmPassword) {
            alert('Mật khẩu xác nhận không khớp!');
            return;
        }

        localStorage.setItem('user_' + username, JSON.stringify({ email, password }));
        alert(`Đăng ký thành công với tên đăng nhập: ${username}!`);
        displayLoginForm();
    });

    loginForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;

        const storedUser = localStorage.getItem('user_' + username);
        if (storedUser) {
            const userData = JSON.parse(storedUser);
            if (userData.password === password) {
                localStorage.setItem('loggedInUser', username);
                displayLogoutPage(username);
                window.location.href = 'index.html';
            } else {
                alert('Sai mật khẩu!');
            }
        } else {
            alert('Tên đăng nhập không tồn tại!');
        }
    });

    logoutButton?.addEventListener('click', () => {
        localStorage.removeItem('loggedInUser');
        displayLoginForm();
    });

    // ================= KIỂM TRA TRẠNG THÁI ĐĂNG NHẬP =================
    const loggedInUsername = localStorage.getItem('loggedInUser');
    if (loggedInUsername) {
        displayLogoutPage(loggedInUsername);
    } else {
        displayLoginForm();
    }
});


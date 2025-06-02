    document.addEventListener('DOMContentLoaded', function() {
        const heroImage = document.getElementById('hero-img');
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        const images = [
    'imgindex/ao-polo-nam-pc.webp', // Đã sửa phần mở rộng .web thành .webp (nếu là webp)
    'imgindex/sanhdoi-collection-pc.webp',
    'imgindex/slider-tnrp_pc.webp',
    'imgindex/social-circle_pc.webp'
];  
        let currentIndex = 0;
        const intervalTime = 5000; // Thời gian đổi ảnh tự động
        let intervalId; // Biến để lưu ID của interval
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
    });

    const sanPhamDropdown = document.querySelector('.navigation .dropdown > a');
    const horizontalMenu = document.querySelector('.navigation .dropdown-content.horizontal-menu');

    if (sanPhamDropdown && horizontalMenu) {
        sanPhamDropdown.addEventListener('click', function(event) {
            event.preventDefault(); // Ngăn chặn hành vi mặc định của thẻ <a> (nếu bạn không muốn nó chuyển trang)
            horizontalMenu.style.display = (horizontalMenu.style.display === 'block') ? 'none' : 'block';

            // Đóng các dropdown khác nếu cần
            const otherDropdowns = document.querySelectorAll('.navigation .dropdown-content:not(.horizontal-menu)');
            otherDropdowns.forEach(dropdown => {
                dropdown.style.display = 'none';
            });
        });
    }

    document.addEventListener('DOMContentLoaded', function() {
        const openSearchBtn = document.getElementById('openSearchBtn');
        const closeSearchBtn = document.getElementById('closeSearchBtn');
        const searchOverlay = document.getElementById('searchOverlay');

        openSearchBtn.addEventListener('click', function(e) {
            e.preventDefault();
            searchOverlay.classList.add('active');
        });

        closeSearchBtn.addEventListener('click', function() {
            searchOverlay.classList.remove('active');
        });

        // Đóng lớp phủ khi nhấp chuột ra ngoài nội dung (tùy chọn)
        searchOverlay.addEventListener('click', function(event) {
            if (event.target === searchOverlay) {
                searchOverlay.classList.remove('active');
            }
        });
    });

    document.addEventListener('DOMContentLoaded', function() {
        const productSlider = document.querySelector('.best-selling-products .product-slider');
        const prevButton = document.querySelector('.best-selling-products .prev-btn');
        const nextButton = document.querySelector('.best-selling-products .next-btn');

        if (productSlider && prevButton && nextButton) {
            prevButton.addEventListener('click', () => {
                productSlider.scrollLeft -= 300; // Điều chỉnh khoảng cách cuộn
            });

            nextButton.addEventListener('click', () => {
                productSlider.scrollLeft += 300; // Điều chỉnh khoảng cách cuộn
            });

            // Ẩn/hiện nút điều khiển khi không thể cuộn nữa (tùy chọn)
            const updateButtonVisibility = () => {
                prevButton.style.display = productSlider.scrollLeft > 0 ? 'block' : 'none';
                nextButton.style.display = productSlider.scrollLeft < productSlider.scrollWidth - productSlider.clientWidth ? 'block' : 'none';
            };

            productSlider.addEventListener('scroll', updateButtonVisibility);
            updateButtonVisibility(); // Gọi khi tải trang
        }
    });

    document.addEventListener('DOMContentLoaded', function() {
        const userIcon = document.querySelector('.header-icons a:nth-child(2)'); // Chọn thẻ a thứ hai trong .header-icons (ảnh người)

        if (userIcon) {
            userIcon.addEventListener('click', function(event) {
                event.preventDefault(); // Ngăn chặn hành động mặc định của thẻ a (nếu có)
                window.location.href = '/login.html'; // Thay '/login.html' bằng đường dẫn trang đăng nhập của bạn
            });
        } else {
            console.error('Không tìm thấy icon người dùng để đăng nhập');
        }
    });


const loginContainer = document.getElementById('loginContainer');
const registerContainer = document.getElementById('registerContainer');
const logoutContainer = document.getElementById('logoutContainer');

const showRegisterForm = document.getElementById('showRegisterForm');
const showLoginForm = document.getElementById('showLoginForm');

const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const logoutButton = document.getElementById('logoutButton');
const loggedInUserDisplay = document.getElementById('loggedInUser');

// Hàm hiển thị form đăng ký
function displayRegisterForm() {
    loginContainer.style.display = 'none';
    logoutContainer.style.display = 'none';
    registerContainer.style.display = 'block';
}

// Hàm hiển thị form đăng nhập
function displayLoginForm() {
    registerContainer.style.display = 'none';
    logoutContainer.style.display = 'none';
    loginContainer.style.display = 'block';
}

// Hàm hiển thị trang đã đăng nhập
function displayLogoutPage(username) {
    loginContainer.style.display = 'none';
    registerContainer.style.display = 'none';
    loggedInUserDisplay.textContent = `Đã đăng nhập với tên: ${username}`;
    logoutContainer.style.display = 'block';
}

// Sự kiện hiển thị form đăng ký
showRegisterForm.addEventListener('click', (e) => {
    e.preventDefault();
    displayRegisterForm();
});

// Sự kiện hiển thị form đăng nhập
showLoginForm.addEventListener('click', (e) => {
    e.preventDefault();
    displayLoginForm();
});

// Xử lý đăng ký
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('registerUsername').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        alert('Mật khẩu xác nhận không khớp!');
        return;
    }

    // Lưu thông tin người dùng vào localStorage (chỉ để minh họa)
    localStorage.setItem('user_' + username, JSON.stringify({ email: email, password: password }));
    alert(`Đăng ký thành công với tên đăng nhập: ${username}!`);
    displayLoginForm();
});

// Xử lý đăng nhập
loginForm.addEventListener('submit', (e) => {
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

// Xử lý đăng xuất
logoutButton.addEventListener('click', () => {
    localStorage.removeItem('loggedInUser');
    displayLoginForm();
});

// Kiểm tra xem đã đăng nhập chưa khi tải trang
document.addEventListener('DOMContentLoaded', () => {
    const loggedInUsername = localStorage.getItem('loggedInUser');
    if (loggedInUsername) {
        displayLogoutPage(loggedInUsername);
    } else {
        displayLoginForm();
    }
});





















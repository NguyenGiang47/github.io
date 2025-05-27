// product-page.js

document.addEventListener('DOMContentLoaded', () => {
    // 1. Chức năng cập nhật số lượng
    const quantityInput = document.getElementById('quantity');
    const decreaseQtyBtn = document.getElementById('decrease-qty');
    const increaseQtyBtn = document.getElementById('increase-qty');

    decreaseQtyBtn.addEventListener('click', () => {
        let currentQuantity = parseInt(quantityInput.value);
        if (currentQuantity > 1) {
            quantityInput.value = currentQuantity - 1;
        }
    });

    increaseQtyBtn.addEventListener('click', () => {
        let currentQuantity = parseInt(quantityInput.value);
        quantityInput.value = currentQuantity + 1;
    });

    // 2. Xử lý chọn size
    const sizeButtons = document.querySelectorAll('.size-btn');
    sizeButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (!button.classList.contains('disabled')) {
                sizeButtons.forEach(btn => btn.classList.remove('active')); // Bỏ active khỏi tất cả
                button.classList.add('active'); // Thêm active vào nút được click
            }
        });
    });

    // 3. Cập nhật số lượng sản phẩm trong giỏ hàng trên Header (Icon giỏ hàng)
    function updateCartCountDisplay() {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        const cartCountElement = document.querySelector('.cart-count');
        if (cartCountElement) {
            cartCountElement.textContent = totalItems;
            // Hiển thị/ẩn số lượng nếu bằng 0
            if (totalItems > 0) {
                cartCountElement.style.display = 'inline-block';
            } else {
                cartCountElement.style.display = 'none';
            }
        }
    }

    // Gọi khi trang tải để hiển thị số lượng giỏ hàng ban đầu
    updateCartCountDisplay();


    // 4. Chức năng Thêm vào giỏ hàng
    const addToCartBtn = document.querySelector('.add-to-cart-btn');

    addToCartBtn.addEventListener('click', () => {
        // Lấy thông tin sản phẩm
        const productId = 'NAOH-POLO-001'; // Cần một ID duy nhất cho sản phẩm
        const productName = document.querySelector('.product-title').textContent;
        const currentPriceText = document.querySelector('.current-price').textContent;
        // Loại bỏ ký tự '₫' và dấu chấm phân cách hàng nghìn để chuyển sang số
        const currentPrice = parseFloat(currentPriceText.replace('₫', '').replace(/\./g, ''));
        const quantity = parseInt(quantityInput.value);

        const selectedSizeBtn = document.querySelector('.size-btn.active');
        if (!selectedSizeBtn) {
            alert('Vui lòng chọn kích cỡ sản phẩm trước khi thêm vào giỏ hàng!');
            return; // Dừng lại nếu chưa chọn size
        }
        const selectedSize = selectedSizeBtn.textContent;

        const productImageSrc = document.querySelector('.product-image-section img').src;

        const product = {
            id: productId,
            name: productName,
            price: currentPrice,
            quantity: quantity,
            size: selectedSize,
            image: productImageSrc
        };

        // Lấy giỏ hàng từ localStorage
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        // Kiểm tra xem sản phẩm (cùng ID và size) đã tồn tại trong giỏ chưa
        const existingProductIndex = cart.findIndex(item => item.id === product.id && item.size === product.size);

        if (existingProductIndex > -1) {
            // Nếu có, tăng số lượng
            cart[existingProductIndex].quantity += product.quantity;
        } else {
            // Nếu chưa, thêm sản phẩm mới vào giỏ
            cart.push(product);
        }

        // Lưu giỏ hàng đã cập nhật vào localStorage
        localStorage.setItem('cart', JSON.stringify(cart));

        // Cập nhật hiển thị số lượng giỏ hàng trên header
        updateCartCountDisplay();

        alert(`${product.quantity} sản phẩm ${product.name} (Size: ${product.size}) đã được thêm vào giỏ hàng.`);
        // Tùy chọn: Bạn có thể hiển thị một pop-up "Thêm thành công" thay vì alert
        // Hoặc chuyển hướng đến trang giỏ hàng: window.location.href = 'cart.html';
    });

    // 5. Chức năng "Giỏ hàng" và "Thanh toán" (Placeholder)
    // Để có chức năng này, bạn sẽ cần:
    // a. Tạo file `cart.html` và `checkout.html`
    // b. Viết JavaScript trong `cart.html` để:
    //    - Đọc dữ liệu giỏ hàng từ localStorage.
    //    - Hiển thị danh sách sản phẩm, số lượng, giá, tổng tiền.
    //    - Cho phép thay đổi số lượng, xóa sản phẩm khỏi giỏ hàng.
    //    - Có nút "Tiến hành thanh toán" để chuyển sang `checkout.html`.
    // c. Viết JavaScript trong `checkout.html` để:
    //    - Hiển thị tóm tắt đơn hàng.
    //    - Thu thập thông tin giao hàng (tên, địa chỉ, số điện thoại).
    //    - Chọn phương thức thanh toán.
    //    - Xử lý việc gửi đơn hàng (thường cần một Backend Server tại bước này).
    //    - Xóa giỏ hàng sau khi thanh toán thành công.

    // Đây chỉ là một ví dụ về cấu trúc. Việc triển khai đầy đủ sẽ rất lớn.
});
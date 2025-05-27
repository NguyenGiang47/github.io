// js/Polo.js

document.addEventListener('DOMContentLoaded', () => {
    // Hàm định dạng số tiền VND
    function formatCurrency(amount) {
        return amount.toLocaleString('vi-VN') + '₫';
    }

    // Hàm cập nhật số lượng sản phẩm trên icon giỏ hàng ở header
    function updateCartCountDisplay() {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        const cartCountElement = document.querySelector('.cart-count');
        if (cartCountElement) {
            cartCountElement.textContent = totalItems;
            if (totalItems > 0) {
                cartCountElement.style.display = 'inline-block';
            } else {
                cartCountElement.style.display = 'none';
            }
        }
    }

    // Hàm thêm sản phẩm vào giỏ hàng
    function addToCart(product) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa (dựa trên ID và Size)
        // Vì trong trang này không có lựa chọn size, chúng ta sẽ mặc định là 'One Size'
        const existingItemIndex = cart.findIndex(item => item.id === product.id && item.size === product.size);

        if (existingItemIndex > -1) {
            // Nếu sản phẩm đã có, tăng số lượng
            cart[existingItemIndex].quantity += product.quantity;
        } else {
            // Nếu chưa có, thêm sản phẩm mới vào giỏ
            cart.push(product);
        }

        // Lưu giỏ hàng đã cập nhật vào Local Storage
        localStorage.setItem('cart', JSON.stringify(cart));

        // Cập nhật hiển thị số lượng trên icon giỏ hàng
        updateCartCountDisplay();

        // Hiển thị thông báo thành công (thay vì alert())
        showCustomMessage(`${product.name} (Size: ${product.size}) đã được thêm vào giỏ hàng.`);
    }

    // Hàm hiển thị thông báo tùy chỉnh (thay cho alert)
    function showCustomMessage(message, type = 'success') {
        const messageDiv = document.createElement('div');
        messageDiv.textContent = message;
        messageDiv.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            padding: 15px 30px;
            border-radius: 8px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            z-index: 1000;
            font-size: 1.1em;
            text-align: center;
            opacity: 0;
            transition: opacity 0.3s ease-in-out;
        `;

        if (type === 'success') {
            messageDiv.style.backgroundColor = '#d4edda';
            messageDiv.style.color = '#155724';
        } else if (type === 'error') {
            messageDiv.style.backgroundColor = '#f8d7da';
            messageDiv.style.color = '#721c24';
        } else { // default to info
            messageDiv.style.backgroundColor = '#cce5ff';
            messageDiv.style.color = '#004085';
        }

        document.body.appendChild(messageDiv);

        // Hiển thị thông báo
        setTimeout(() => {
            messageDiv.style.opacity = '1';
        }, 10);

        // Tự động ẩn sau 3 giây
        setTimeout(() => {
            messageDiv.style.opacity = '0';
            messageDiv.addEventListener('transitionend', () => messageDiv.remove());
        }, 3000);
    }

    // Gắn sự kiện cho tất cả các nút "Thêm vào giỏ"
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', function() {
            const productItem = this.closest('.product-item'); // Lấy phần tử cha .product-item
            if (!productItem) {
                console.error("Không tìm thấy .product-item cho nút 'Thêm vào giỏ'.");
                showCustomMessage('Lỗi: Không thể thêm sản phẩm vào giỏ hàng.', 'error');
                return;
            }

            const productId = productItem.dataset.productId;
            const productName = productItem.dataset.productName;
            const productPrice = parseFloat(productItem.dataset.productPrice); // Đảm bảo là số

            // Lấy đường dẫn ảnh từ thẻ <img> bên trong product-item
            const productImageElement = productItem.querySelector('img');
            const productImageSrc = productImageElement ? productImageElement.src : 'placeholder.webp'; // Ảnh mặc định nếu không tìm thấy

            // Vì trong HTML hiện tại không có lựa chọn size, mặc định là 'One Size' hoặc 'M'
            // Nếu sau này bạn thêm lựa chọn size, bạn sẽ cần lấy giá trị size đã chọn ở đây
            const selectedSize = 'M'; // Mặc định size là M

            const productToAdd = {
                id: productId,
                name: productName,
                price: productPrice,
                image: productImageSrc,
                size: selectedSize,
                quantity: 1 // Mặc định số lượng là 1 khi thêm từ danh sách sản phẩm
            };

            if (productId && productName && !isNaN(productPrice)) {
                addToCart(productToAdd);
            } else {
                showCustomMessage('Lỗi: Thiếu thông tin sản phẩm để thêm vào giỏ hàng.', 'error');
                console.error('Thiếu thông tin sản phẩm:', { productId, productName, productPrice });
            }
        });
    });

    // Cập nhật số lượng giỏ hàng khi tải trang lần đầu
    updateCartCountDisplay();
});

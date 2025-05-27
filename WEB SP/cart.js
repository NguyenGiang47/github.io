// cart.js

document.addEventListener('DOMContentLoaded', () => {
    const cartItemsWrapper = document.getElementById('cart-items-wrapper');
    const cartSubtotalElement = document.getElementById('cart-subtotal');
    const cartTotalAmountElement = document.getElementById('cart-total-amount');
    const emptyCartMessage = document.getElementById('empty-cart-message');
    const checkoutButton = document.getElementById('checkout-button');

    // Hàm định dạng số tiền VND
    function formatCurrency(amount) {
        return amount.toLocaleString('vi-VN') + '₫';
    }

    // Hàm cập nhật số lượng sản phẩm trên icon giỏ hàng ở header
    // (Đây là hàm copy từ product-page.js để đảm bảo nó hoạt động trên trang cart.html)
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

    // Hàm render (hiển thị) giỏ hàng
    function renderCart() {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cartItemsWrapper.innerHTML = ''; // Xóa nội dung cũ

        if (cart.length === 0) {
            emptyCartMessage.style.display = 'block';
            cartItemsWrapper.style.display = 'none';
            document.querySelector('.cart-summary').style.display = 'none';
        } else {
            emptyCartMessage.style.display = 'none';
            cartItemsWrapper.style.display = 'block';
            document.querySelector('.cart-summary').style.display = 'block';

            let subtotal = 0;

            cart.forEach((item, index) => {
                const itemElement = document.createElement('div');
                itemElement.classList.add('cart-item');
                itemElement.innerHTML = `
                    <div class="cart-item-image-wrapper">
                        <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                    </div>
                    <div class="cart-item-details">
                        <h4>${item.name}</h4>
                        <p>Kích cỡ: ${item.size}</p>
                        <div class="item-quantity-control">
                            <button class="decrease-qty-btn" data-index="${index}">-</button>
                            <input type="text" value="${item.quantity}" readonly>
                            <button class="increase-qty-btn" data-index="${index}">+</button>
                        </div>
                    </div>
                    <div class="cart-item-price">${formatCurrency(item.price * item.quantity)}</div>
                    <button class="remove-item-btn" data-index="${index}"><i class="fas fa-trash-alt"></i></button>
                `;
                cartItemsWrapper.appendChild(itemElement);

                subtotal += item.price * item.quantity;
            });

            cartSubtotalElement.textContent = formatCurrency(subtotal);
            cartTotalAmountElement.textContent = formatCurrency(subtotal); // Tạm thời tổng bằng tổng phụ, chưa tính phí ship
        }

        updateCartCountDisplay(); // Cập nhật lại số lượng trên header
        attachEventListeners(); // Gắn lại các sự kiện sau khi render lại
    }

    // Hàm gắn các sự kiện cho nút tăng/giảm số lượng và nút xóa
    function attachEventListeners() {
        // Sự kiện giảm số lượng
        document.querySelectorAll('.decrease-qty-btn').forEach(button => {
            button.onclick = (event) => {
                const index = event.target.dataset.index;
                let cart = JSON.parse(localStorage.getItem('cart'));
                if (cart[index].quantity > 1) {
                    cart[index].quantity--;
                    localStorage.setItem('cart', JSON.stringify(cart));
                    renderCart(); // Render lại giỏ hàng
                }
            };
        });

        // Sự kiện tăng số lượng
        document.querySelectorAll('.increase-qty-btn').forEach(button => {
            button.onclick = (event) => {
                const index = event.target.dataset.index;
                let cart = JSON.parse(localStorage.getItem('cart'));
                cart[index].quantity++;
                localStorage.setItem('cart', JSON.stringify(cart));
                renderCart(); // Render lại giỏ hàng
            };
        });

        // Sự kiện xóa sản phẩm
        document.querySelectorAll('.remove-item-btn').forEach(button => {
            button.onclick = (event) => {
                const index = event.target.closest('.remove-item-btn').dataset.index; // Lấy index từ nút cha gần nhất
                let cart = JSON.parse(localStorage.getItem('cart'));
                cart.splice(index, 1); // Xóa sản phẩm khỏi mảng
                localStorage.setItem('cart', JSON.stringify(cart));
                renderCart(); // Render lại giỏ hàng
            };
        });
    }

    // Xử lý nút "Tiến hành thanh toán"
    checkoutButton.addEventListener('click', () => {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        if (cart.length === 0) {
            alert('Giỏ hàng của bạn đang trống. Vui lòng thêm sản phẩm trước khi thanh toán.');
            return;
        }
        // Chuyển hướng đến trang thanh toán
        window.location.href = 'checkout.html'; // Bạn cần tạo trang checkout.html này
    });

    // Gọi renderCart khi trang được tải lần đầu
    renderCart();
});

// Ví dụ trong product-page.js khi lấy thông tin sản phẩm để thêm vào giỏ hàng:
const productPriceText = document.querySelector('.product-price').textContent; // Ví dụ: "339.000₫"
let productPrice = 0;

// Xóa ký hiệu tiền tệ và dấu chấm phân cách hàng nghìn, sau đó chuyển thành số
if (productPriceText) {
    productPrice = parseFloat(productPriceText.replace('₫', '').replace(/\./g, ''));
    // parseFloat sẽ xử lý "339000" thành 339000. Nếu có "," cho thập phân thì cần xử lý thêm.
}

const selectedQuantity = parseInt(quantityInput.value); // Chắc chắn là số nguyên

const product = {
    // ... các thuộc tính khác ...
    price: productPrice, // Đảm bảo đây là một số
    quantity: selectedQuantity // Đảm bảo đây là một số
};
// Giả sử đây là sự kiện khi click nút "Thêm vào giỏ"
document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', function() {
        const productContainer = this.closest('.product-item') || this.closest('.product-page-container'); // Tìm container sản phẩm
        if (!productContainer) {
            console.error("Không tìm thấy container sản phẩm.");
            return;
        }

        const productId = productContainer.dataset.productId || 'UNKNOWN_ID'; // Lấy ID
        const productName = productContainer.dataset.productName || productContainer.querySelector('.product-title, h3').textContent; // Lấy tên
        const productPriceElement = productContainer.querySelector('.price, .current-price');
        let productPrice = 0;
        if (productPriceElement) {
            // Lấy giá trị số, loại bỏ dấu . và ký tự đ, sau đó chuyển thành số
            productPrice = parseFloat(productPriceElement.textContent.replace(/\./g, '').replace('₫', ''));
        }


        // Lấy đường dẫn ảnh: Quan trọng nhất cho vấn đề của bạn
        const productImageElement = productContainer.querySelector('img');
        const productImageSrc = productImageElement ? productImageElement.src : 'placeholder.webp'; // Đặt ảnh mặc định nếu không tìm thấy

        // Lấy kích cỡ đã chọn: Nguyên nhân "undefined"
        const selectedSizeButton = productContainer.querySelector('.size-btn.active');
        const selectedSize = selectedSizeButton ? selectedSizeButton.textContent : 'Chưa chọn'; // Đặt giá trị mặc định nếu chưa chọn

        // Tạo đối tượng sản phẩm để thêm vào giỏ
        const productToAdd = {
            id: productId,
            name: productName,
            price: productPrice,
            image: productImageSrc, // LƯU ĐƯỜNG DẪN ẢNH VÀO ĐÂY
            size: selectedSize, // LƯU KÍCH CỠ VÀO ĐÂY
            quantity: 1 // Hoặc lấy từ input số lượng nếu có
        };

        // Gọi hàm thêm vào giỏ hàng của bạn (addToCart)
        addToCart(productToAdd); // Hàm này sẽ đẩy productToAdd vào mảng giỏ hàng
        updateCartCount(); // Cập nhật số lượng trên icon giỏ hàng
        alert(`${productToAdd.name} (Size: ${productToAdd.size}) đã được thêm vào giỏ hàng.`);
        // window.location.href = 'cart.html'; // Tùy chọn: chuyển hướng đến trang giỏ hàng
    });
});
// ... sau đó lưu vào localStorage ...

// checkout.js

document.addEventListener('DOMContentLoaded', () => {
    // ... (các biến và hàm đã có) ...
    const placeOrderButton = document.getElementById('place-order-button');
    const shippingForm = document.getElementById('shipping-form');
    const orderSummaryItems = document.getElementById('order-summary-items');
    const summarySubtotalElement = document.getElementById('summary-subtotal');
    const summaryShippingCostElement = document.getElementById('summary-shipping-cost');
    const summaryTotalAmountElement = document.getElementById('summary-total-amount');

    // Hàm định dạng số tiền (có thể copy từ cart.js để đồng bộ)
    function formatCurrency(amount) {
        if (typeof amount !== 'number' || isNaN(amount)) {
            return '0₫';
        }
        return amount.toLocaleString('vi-VN') + '₫';
    }

    // Hàm cập nhật số lượng sản phẩm trên icon giỏ hàng ở header
    function updateCartCountDisplay() {
        // ... (copy hàm này từ cart.js) ...
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const totalItems = cart.reduce((sum, item) => {
            const quantity = parseInt(item.quantity) || 0;
            return sum + quantity;
        }, 0);
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

    // Hàm hiển thị tóm tắt đơn hàng
    function renderOrderSummary() {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        orderSummaryItems.innerHTML = '';
        let subtotal = 0;

        if (cart.length === 0) {
            // Có thể ẩn phần tóm tắt hoặc hiển thị thông báo giỏ hàng trống
            alert('Giỏ hàng của bạn đang trống. Vui lòng quay lại giỏ hàng.');
            window.location.href = 'cart.html'; // Chuyển hướng về giỏ hàng nếu trống
            return;
        }

        cart.forEach(item => {
            const itemPrice = parseFloat(item.price) || 0;
            const itemQuantity = parseInt(item.quantity) || 0;

            const itemElement = document.createElement('div');
            itemElement.classList.add('order-summary-item');
            itemElement.innerHTML = `
                <div class="item-info">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="details">
                        <h4>${item.name}</h4>
                        <p>Kích cỡ: ${item.size}</p>
                        <p>Số lượng: ${itemQuantity}</p>
                    </div>
                </div>
                <span class="item-price">${formatCurrency(itemPrice * itemQuantity)}</span>
            `;
            orderSummaryItems.appendChild(itemElement);
            subtotal += itemPrice * itemQuantity;
        });

        // Tính toán phí vận chuyển
        let shippingCost = 0;
        const standardShippingRadio = document.getElementById('standard-shipping');
        const expressShippingRadio = document.getElementById('express-shipping');

        if (standardShippingRadio && standardShippingRadio.checked) {
            shippingCost = 25000;
        } else if (expressShippingRadio && expressShippingRadio.checked) {
            shippingCost = 45000;
        }

        const totalAmount = subtotal + shippingCost;

        summarySubtotalElement.textContent = formatCurrency(subtotal);
        summaryShippingCostElement.textContent = formatCurrency(shippingCost);
        summaryTotalAmountElement.textContent = formatCurrency(totalAmount);
    }

    // Lắng nghe sự kiện thay đổi phương thức vận chuyển để cập nhật tổng tiền
    document.querySelectorAll('input[name="shippingMethod"]').forEach(radio => {
        radio.addEventListener('change', renderOrderSummary);
    });


    // Lắng nghe sự kiện thay đổi phương thức thanh toán để hiển thị/ẩn chi tiết
    document.querySelectorAll('input[name="paymentMethod"]').forEach(radio => {
        radio.addEventListener('change', (event) => {
            const bankTransferDetails = document.getElementById('bank-transfer-details');
            const creditCardDetails = document.getElementById('credit-card-details');
            const cardNumberInput = document.getElementById('card-number');
            const expiryDateInput = document.getElementById('expiry-date');
            const cvvInput = document.getElementById('cvv');

            // Ẩn tất cả chi tiết trước
            if (bankTransferDetails) bankTransferDetails.style.display = 'none';
            if (creditCardDetails) {
                creditCardDetails.style.display = 'none';
                // Vô hiệu hóa các trường input khi không chọn
                cardNumberInput.disabled = true;
                expiryDateInput.disabled = true;
                cvvInput.disabled = true;
            }

            // Hiển thị chi tiết tương ứng
            if (event.target.value === 'bank_transfer') {
                if (bankTransferDetails) bankTransferDetails.style.display = 'block';
            } else if (event.target.value === 'credit_card') {
                if (creditCardDetails) {
                    creditCardDetails.style.display = 'block';
                    // Kích hoạt các trường input khi chọn
                    cardNumberInput.disabled = false;
                    expiryDateInput.disabled = false;
                    cvvInput.disabled = false;
                }
            }
        });
    });

    // Xử lý khi nhấn nút "Đặt hàng"
    placeOrderButton.addEventListener('click', (event) => {
        event.preventDefault(); // Ngăn chặn form submit mặc định

        // 1. Validation form thông tin giao hàng
        if (!shippingForm.checkValidity()) {
            alert('Vui lòng điền đầy đủ và chính xác tất cả các trường bắt buộc trong thông tin giao hàng.');
            shippingForm.reportValidity(); // Hiển thị các lỗi validation của trình duyệt
            return;
        }

        // Lấy dữ liệu từ form
        const formData = new FormData(shippingForm);
        const shippingInfo = {};
        for (let [key, value] of formData.entries()) {
            shippingInfo[key] = value;
        }

        // Lấy thông tin giỏ hàng
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        if (cart.length === 0) {
            alert('Giỏ hàng của bạn đang trống. Vui lòng thêm sản phẩm trước khi đặt hàng.');
            window.location.href = 'cart.html';
            return;
        }

        // Lấy phương thức vận chuyển và thanh toán
        const selectedShippingMethod = document.querySelector('input[name="shippingMethod"]:checked').value;
        const selectedPaymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;

        // Tính toán lại tổng tiền (đảm bảo đồng bộ với hiển thị)
        let subtotal = 0;
        cart.forEach(item => {
            const itemPrice = parseFloat(item.price) || 0;
            const itemQuantity = parseInt(item.quantity) || 0;
            subtotal += itemPrice * itemQuantity;
        });

        let shippingCost = 0;
        if (selectedShippingMethod === 'standard') {
            shippingCost = 25000;
        } else if (selectedShippingMethod === 'express') {
            shippingCost = 45000;
        }
        const totalAmount = subtotal + shippingCost;


        // Tạo đối tượng đơn hàng
        const orderDetails = {
            id: 'ORDER-' + Date.now(), // Mã đơn hàng đơn giản
            items: cart,
            shippingInfo: shippingInfo,
            shippingMethod: selectedShippingMethod,
            shippingCost: shippingCost,
            paymentMethod: selectedPaymentMethod,
            subtotal: subtotal,
            totalAmount: totalAmount,
            orderDate: new Date().toISOString(),
            status: 'Pending' // Trạng thái ban đầu
        };

        console.log('Thông tin đơn hàng:', orderDetails);

        // --- BƯỚC QUAN TRỌNG: GỬI DỮ LIỆU LÊN SERVER (Nếu có Backend) ---
        // Trong một ứng dụng thực tế, bạn sẽ gửi `orderDetails` lên server tại đây.
        // Ví dụ:
        /*
        fetch('/api/place-order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderDetails)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Xóa giỏ hàng sau khi đặt hàng thành công
                localStorage.removeItem('cart');
                updateCartCountDisplay(); // Cập nhật số lượng giỏ hàng trên header

                // Chuyển hướng đến trang xác nhận đơn hàng
                // Truyền dữ liệu đơn hàng qua query params hoặc lưu vào sessionStorage/localStorage tạm thời
                window.location.href = `order-confirmation.html?orderId=${orderDetails.id}`;
            } else {
                alert('Có lỗi xảy ra khi đặt hàng: ' + (data.message || 'Vui lòng thử lại.'));
            }
        })
        .catch(error => {
            console.error('Lỗi khi gửi đơn hàng:', error);
            alert('Đã xảy ra lỗi hệ thống. Vui lòng thử lại sau.');
        });
        */

        // --- KHI KHÔNG CÓ BACKEND (CHỈ DEMO FRONTEND) ---
        // Giả lập đặt hàng thành công:
        alert('Đơn hàng của bạn đã được đặt thành công! Mã đơn hàng: ' + orderDetails.id);

        // Xóa giỏ hàng sau khi đặt hàng thành công
        localStorage.removeItem('cart');
        updateCartCountDisplay(); // Cập nhật số lượng giỏ hàng trên header

        // Chuyển hướng đến trang xác nhận đơn hàng
        // Để hiển thị thông tin trên trang xác nhận, bạn có thể lưu orderDetails vào sessionStorage
        sessionStorage.setItem('lastOrderDetails', JSON.stringify(orderDetails));
        window.location.href = 'order-confirmation.html'; // Tạo file này nếu chưa có
    });

    // Gọi renderOrderSummary khi trang được tải lần đầu
    renderOrderSummary();
    updateCartCountDisplay(); // Cập nhật số lượng trên header
});
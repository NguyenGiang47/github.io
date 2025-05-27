// order-confirmation.js

document.addEventListener('DOMContentLoaded', () => {
    const lastOrderDetails = JSON.parse(sessionStorage.getItem('lastOrderDetails'));

    if (lastOrderDetails) {
        // Cập nhật thông tin tổng quan
        document.getElementById('display-order-id').textContent = lastOrderDetails.id;
        document.getElementById('display-order-date').textContent = new Date(lastOrderDetails.orderDate).toLocaleDateString('vi-VN', {
            year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
        });
        document.getElementById('display-total-amount').textContent = formatCurrency(lastOrderDetails.totalAmount);
        document.getElementById('display-payment-method').textContent = formatPaymentMethod(lastOrderDetails.paymentMethod);

        // Cập nhật thông tin giao hàng
        const shippingInfo = lastOrderDetails.shippingInfo;
        document.getElementById('display-full-name').textContent = shippingInfo.fullName;
        document.getElementById('display-address').textContent = `${shippingInfo.address}, ${shippingInfo.district}, ${shippingInfo.province}`;
        document.getElementById('display-phone').textContent = shippingInfo.phone;

        // Hiển thị danh sách sản phẩm
        const orderItemsList = document.getElementById('display-order-items');
        orderItemsList.innerHTML = '<h3>Sản phẩm đã đặt</h3>'; // Reset
        lastOrderDetails.items.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('order-confirmation-item');
            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="item-details">
                    <h4>${item.name} (${item.size})</h4>
                    <p>Số lượng: ${item.quantity}</p>
                    <p>Giá: ${formatCurrency(item.price)}</p>
                </div>
                <span class="item-total">${formatCurrency(item.price * item.quantity)}</span>
            `;
            orderItemsList.appendChild(itemElement);
        });

        // Xóa thông tin đơn hàng khỏi sessionStorage sau khi hiển thị để tránh lỗi
        sessionStorage.removeItem('lastOrderDetails');

    } else {
        // Nếu không tìm thấy thông tin đơn hàng, chuyển hướng về trang chủ hoặc giỏ hàng
        alert('Không tìm thấy thông tin đơn hàng. Vui lòng kiểm tra lại.');
        window.location.href = 'index.html';
    }

    // Hàm định dạng tiền tệ (cần giống cart.js và checkout.js)
    function formatCurrency(amount) {
        if (typeof amount !== 'number' || isNaN(amount)) {
            return '0₫';
        }
        return amount.toLocaleString('vi-VN') + '₫';
    }

    // Hàm định dạng phương thức thanh toán cho dễ đọc
    function formatPaymentMethod(method) {
        switch (method) {
            case 'cod': return 'Thanh toán khi nhận hàng (COD)';
            case 'bank_transfer': return 'Chuyển khoản ngân hàng';
            case 'credit_card': return 'Thẻ tín dụng/ghi nợ';
            default: return method;
        }
    }

    // Cập nhật số lượng giỏ hàng trên header (dù đã xóa nhưng cần set lại về 0)
    function updateCartCountDisplay() {
        const cartCountElement = document.querySelector('.cart-count');
        if (cartCountElement) {
            cartCountElement.textContent = '0';
            cartCountElement.style.display = 'none';
        }
    }
    updateCartCountDisplay();
});
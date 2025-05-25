document.addEventListener('DOMContentLoaded', function () {
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    const cartItemsContainer = document.querySelector('.cart-items');
    const totalPriceElement = document.querySelector('.total-price');
    const cartCountElement = document.querySelector('.cart-count');
    const checkoutButton = document.querySelector('.checkout-btn');

    let cart = loadCart();
    updateCartDisplay();

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function () {
            const productItem = this.closest('.product-item');
            const productId = productItem.dataset.productId;
            const productName = productItem.dataset.productName;
            const productPrice = parseFloat(productItem.dataset.productPrice);

            addToCart(productId, productName, productPrice);
            updateCartDisplay();
        });
    });

    function addToCart(id, name, price) {
        const existingItem = cart.find(item => item.id === id);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ id, name, price, quantity: 1 });
        }
        saveCart();
    }

    function removeFromCart(id) {
        cart = cart.filter(item => item.id !== id);
        saveCart();
        updateCartDisplay();
    }

    function updateQuantity(id, quantity) {
        const item = cart.find(item => item.id === id);
        if (item) {
            item.quantity = parseInt(quantity);
            if (item.quantity < 1) {
                removeFromCart(id);
            } else {
                saveCart();
                updateCartDisplay();
            }
        }
    }

    function updateCartDisplay() {
        cartItemsContainer.innerHTML = '';
        let total = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-cart">Giỏ hàng của bạn đang trống.</p>';
            totalPriceElement.textContent = '0đ';
            cartCountElement.textContent = '0';
        } else {
            cart.forEach(item => {
                const cartItemDiv = document.createElement('div');
                cartItemDiv.classList.add('cart-item');
                cartItemDiv.innerHTML = `
                    <img src="${getProductImage(item.id)}" alt="${item.name}">
                    <div class="cart-item-details">
                        <h4>${item.name}</h4>
                        <span class="cart-item-price">${formatCurrency(item.price)}</span>
                        <div class="cart-item-quantity">
                            <button class="quantity-btn minus-btn" data-id="${item.id}">-</button>
                            <input type="number" min="1" value="${item.quantity}" data-id="${item.id}" class="quantity-input">
                            <button class="quantity-btn plus-btn" data-id="${item.id}">+</button>
                        </div>
                        <button class="remove-item-btn" data-id="${item.id}">Xóa</button>
                    </div>
                `;
                cartItemsContainer.appendChild(cartItemDiv);
                total += item.price * item.quantity;
            });

            totalPriceElement.textContent = formatCurrency(total);
            cartCountElement.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);

            // Gán lại sự kiện
            document.querySelectorAll('.quantity-input').forEach(input => {
                input.addEventListener('change', function () {
                    updateQuantity(this.dataset.id, this.value);
                });
            });

            document.querySelectorAll('.plus-btn').forEach(button => {
                button.addEventListener('click', function () {
                    const input = this.previousElementSibling;
                    input.value = parseInt(input.value) + 1;
                    updateQuantity(this.dataset.id, input.value);
                });
            });

            document.querySelectorAll('.minus-btn').forEach(button => {
                button.addEventListener('click', function () {
                    const input = this.nextElementSibling;
                    input.value = Math.max(1, parseInt(input.value) - 1);
                    updateQuantity(this.dataset.id, input.value);
                });
            });

            document.querySelectorAll('.remove-item-btn').forEach(button => {
                button.addEventListener('click', function () {
                    removeFromCart(this.dataset.id);
                });
            });
        }
    }

    function getProductImage(productId) {
        const imageMap = {
            'polo-naoh': 'ÁO POLO NAM NAOH.webp',
            'polo-basic': 'ÁO POLO NAM BASIC DIMONOD.webp',
            'polo-milo1': 'ÁO POLO NAM MILO.webp',
            'polo-gin1': 'ÁO POLO NAM GIN.webp',
            'polo-wind': 'ÁO POLO WIND.webp',
            'polo-ray': 'ÁO POLO NAM RAY.webp',
            'polo-simon1': 'ÁO POLO SIMON.webp',
            'somi-cotton': 'ÁO SƠ MI NAM EXTRA COTTON.webp',
            'polo-milo2': 'ÁO POLO NAM MILO.webp',
            'polo-milo3': 'ÁO POLO NAM MILO.webp',
            'polo-gin2': 'ÁO POLO NAM GIN.webp',
            'polo-simon2': 'ÁO POLO SIMON.webp',
            'polo-basic2': 'ÁO POLO NAM BASIC DIMONOD.webp',
            'polo-gin3': 'ÁO POLO NAM GIN.webp',
            'polo-milo4': 'ÁO POLO NAM MILO.webp'
        };
        return imageMap[productId] || 'placeholder.png';
    }

    function formatCurrency(number) {
        return number.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    }

    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    function loadCart() {
        const cartData = localStorage.getItem('cart');
        return cartData ? JSON.parse(cartData) : [];
    }

    if (checkoutButton) {
        checkoutButton.addEventListener('click', function () {
            if (cart.length === 0) {
                alert('Giỏ hàng của bạn đang trống!');
            } else {
                alert('Cảm ơn bạn đã thanh toán!');
                cart = [];
                saveCart();
                updateCartDisplay();
            }
        });
    }

    // Bộ lọc sản phẩm theo danh mục
    document.querySelectorAll('input[name="category"]').forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            const checked = Array.from(document.querySelectorAll('input[name="category"]:checked')).map(cb => cb.value);
            document.querySelectorAll('.product-item').forEach(item => {
                const name = item.dataset.productName.toLowerCase();
                const show = checked.length === 0 || checked.some(cat => name.includes(cat.replace('-', ' ')));
                item.style.display = show ? 'block' : 'none';
            });
        });
    });
});
// Trong js/ao.js
const checkboxes = document.querySelectorAll('input[name="category"]');
checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        const selectedCategories = Array.from(checkboxes)
            .filter(cb => cb.checked)
            .map(cb => cb.value.toLowerCase());

        const products = document.querySelectorAll('.product-item');
        products.forEach(product => {
            const name = product.dataset.productName.toLowerCase();
            const match = selectedCategories.length === 0 || selectedCategories.some(cat => name.includes(cat));
            product.style.display = match ? 'block' : 'none';
        });
    });
});
// Trong js/ao.js
let cartItems = [];
const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
const cartContainer = document.querySelector('.cart-items');
const totalPriceElement = document.querySelector('.total-price');
const emptyMessage = document.querySelector('.empty-cart');

addToCartButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const productItem = btn.closest('.product-item');
        const name = productItem.dataset.productName;
        const price = parseInt(productItem.dataset.productPrice);
        
        cartItems.push({ name, price });
        renderCart();
    });
});

function renderCart() {
    cartContainer.innerHTML = '';
    let total = 0;

    cartItems.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.textContent = `${item.name} - ${item.price.toLocaleString()}đ`;
        cartContainer.appendChild(itemDiv);
        total += item.price;
    });

    totalPriceElement.textContent = total.toLocaleString() + 'đ';
    emptyMessage.style.display = cartItems.length === 0 ? 'block' : 'none';
}

addToCartButtons.forEach(button => {
    button.addEventListener('click', function () {
        const productItem = this.closest('.product-item');
        const productId = productItem.dataset.productId;
        const productName = productItem.dataset.productName;
        const productPrice = parseFloat(productItem.dataset.productPrice);

        addToCart(productId, productName, productPrice); // dùng hàm addToCart để tăng số lượng
        updateCartDisplay();
    });
});
document.addEventListener('DOMContentLoaded', function () {
  const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
  const cartItemsContainer = document.querySelector('.cart-items');
  const totalPriceElement = document.querySelector('.total-price');
  const cartCountElement = document.querySelector('.cart-count');

  let cart = [];

  // Thêm món hàng vào giỏ, nếu có rồi thì tăng số lượng
  function addToCart(id, name, price) {
    const item = cart.find(i => i.id === id);
    if (item) {
      item.quantity++;
    } else {
      cart.push({ id, name, price, quantity: 1 });
    }
    updateCartDisplay();
  }

  // Xóa món hàng khỏi giỏ
  function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartDisplay();
  }

  // Cập nhật số lượng món hàng
  function updateQuantity(id, quantity) {
    const item = cart.find(i => i.id === id);
    if (item) {
      item.quantity = quantity < 1 ? 1 : quantity; // tối thiểu 1
      updateCartDisplay();
    }
  }

  // Hiển thị giỏ hàng và tổng tiền
  function updateCartDisplay() {
    cartItemsContainer.innerHTML = '';
    let total = 0;
    let count = 0;

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = '<p>Giỏ hàng trống</p>';
      totalPriceElement.textContent = '0đ';
      cartCountElement.textContent = '0';
      return;
    }

    cart.forEach(item => {
      const itemDiv = document.createElement('div');
      itemDiv.classList.add('cart-item');
      itemDiv.innerHTML = `
        <span>${item.name}</span> - 
        <span>${item.price.toLocaleString()}đ</span> - 
        <button class="minus-btn" data-id="${item.id}">-</button>
        <input type="number" min="1" value="${item.quantity}" data-id="${item.id}" class="quantity-input" style="width:40px; text-align:center;">
        <button class="plus-btn" data-id="${item.id}">+</button>
        <button class="remove-btn" data-id="${item.id}">Xóa</button>
      `;
      cartItemsContainer.appendChild(itemDiv);

      total += item.price * item.quantity;
      count += item.quantity;
    });

    totalPriceElement.textContent = total.toLocaleString() + 'đ';
    cartCountElement.textContent = count;

    // Gán sự kiện cho nút +, -, input thay đổi số lượng và xóa
    document.querySelectorAll('.plus-btn').forEach(btn => {
      btn.onclick = () => {
        const id = btn.dataset.id;
        const item = cart.find(i => i.id === id);
        if (item) {
          item.quantity++;
          updateCartDisplay();
        }
      };
    });

    document.querySelectorAll('.minus-btn').forEach(btn => {
      btn.onclick = () => {
        const id = btn.dataset.id;
        const item = cart.find(i => i.id === id);
        if (item && item.quantity > 1) {
          item.quantity--;
          updateCartDisplay();
        }
      };
    });

    document.querySelectorAll('.quantity-input').forEach(input => {
      input.onchange = () => {
        const id = input.dataset.id;
        let value = parseInt(input.value);
        if (isNaN(value) || value < 1) value = 1;
        updateQuantity(id, value);
      };
    });

    document.querySelectorAll('.remove-btn').forEach(btn => {
      btn.onclick = () => {
        removeFromCart(btn.dataset.id);
      };
    });
  }

  // Gán sự kiện cho các nút "Thêm vào giỏ"
  addToCartButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const productItem = btn.closest('.product-item');
      const id = productItem.dataset.productId;
      const name = productItem.dataset.productName;
      const price = parseFloat(productItem.dataset.productPrice);

      addToCart(id, name, price);
    });
  });

  // Khởi tạo hiển thị giỏ hàng lúc đầu
  updateCartDisplay();
});
document.addEventListener('DOMContentLoaded', function () {
  const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
  const cartItemsContainer = document.querySelector('.cart-items');
  const totalPriceElement = document.querySelector('.total-price');
  const cartCountElement = document.querySelector('.cart-count');
  const checkoutButton = document.querySelector('.checkout-btn'); // Nút Thanh toán

  let cart = [];

  function addToCart(id, name, price) {
    const item = cart.find(i => i.id === id);
    if (item) {
      item.quantity++;
    } else {
      cart.push({ id, name, price, quantity: 1 });
    }
    updateCartDisplay();
  }

  function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartDisplay();
  }

  function updateQuantity(id, quantity) {
    const item = cart.find(i => i.id === id);
    if (item) {
      item.quantity = quantity < 1 ? 1 : quantity;
      updateCartDisplay();
    }
  }

  function updateCartDisplay() {
    cartItemsContainer.innerHTML = '';
    let total = 0;
    let count = 0;

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = '<p>Giỏ hàng trống</p>';
      totalPriceElement.textContent = '0đ';
      cartCountElement.textContent = '0';
      return;
    }

    cart.forEach(item => {
      const itemDiv = document.createElement('div');
      itemDiv.classList.add('cart-item');
      itemDiv.innerHTML = `
        <span>${item.name}</span> - 
        <span>${item.price.toLocaleString()}đ</span> - 
        <button class="minus-btn" data-id="${item.id}">-</button>
        <input type="number" min="1" value="${item.quantity}" data-id="${item.id}" class="quantity-input" style="width:40px; text-align:center;">
        <button class="plus-btn" data-id="${item.id}">+</button>
        <button class="remove-btn" data-id="${item.id}">Xóa</button>
      `;
      cartItemsContainer.appendChild(itemDiv);

      total += item.price * item.quantity;
      count += item.quantity;
    });

    totalPriceElement.textContent = total.toLocaleString() + 'đ';
    cartCountElement.textContent = count;

    document.querySelectorAll('.plus-btn').forEach(btn => {
      btn.onclick = () => {
        const id = btn.dataset.id;
        const item = cart.find(i => i.id === id);
        if (item) {
          item.quantity++;
          updateCartDisplay();
        }
      };
    });

    document.querySelectorAll('.minus-btn').forEach(btn => {
      btn.onclick = () => {
        const id = btn.dataset.id;
        const item = cart.find(i => i.id === id);
        if (item && item.quantity > 1) {
          item.quantity--;
          updateCartDisplay();
        }
      };
    });

    document.querySelectorAll('.quantity-input').forEach(input => {
      input.onchange = () => {
        const id = input.dataset.id;
        let value = parseInt(input.value);
        if (isNaN(value) || value < 1) value = 1;
        updateQuantity(id, value);
      };
    });

    document.querySelectorAll('.remove-btn').forEach(btn => {
      btn.onclick = () => {
        removeFromCart(btn.dataset.id);
      };
    });
  }

  addToCartButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const productItem = btn.closest('.product-item');
      const id = productItem.dataset.productId;
      const name = productItem.dataset.productName;
      const price = parseFloat(productItem.dataset.productPrice);

      addToCart(id, name, price);
    });
  });

  // **PHẦN THÊM XỬ LÝ THANH TOÁN**
  if (checkoutButton) {
    checkoutButton.addEventListener('click', () => {
      if (cart.length === 0) {
        alert('Giỏ hàng của bạn đang trống!');
      } else {
        alert('Cảm ơn bạn đã thanh toán!');
        cart = [];
        updateCartDisplay();
      }
    });
  }

  updateCartDisplay();
});

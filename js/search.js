document.addEventListener('DOMContentLoaded', function() {
    const openSearchBtn = document.getElementById('openSearchBtn');
    const closeSearchBtn = document.getElementById('closeSearchBtn');
    const searchOverlay = document.getElementById('searchOverlay');
    const overlaySearchInput = document.getElementById('overlaySearchInput');
    const searchResultsContainer = document.getElementById('searchResultsContainer');
    const noResultsMessage = document.getElementById('noResultsMessage');

    // Dữ liệu sản phẩm (Bạn có thể lấy từ API thực tế hoặc cơ sở dữ liệu)
    // Đảm bảo đường dẫn ảnh chính xác!
    const products = [
        { id: 1, name: 'Áo Polo Nam Classic', image: 'imgpolo/ao-polo-nam-kanis.webp', price: '350.000 VNĐ', description: 'Áo polo thoáng mát, form dáng chuẩn, phù hợp nhiều dịp.' },
        { id: 2, name: 'Áo Thun Nữ Basic', image: 'imgaothun/ao-thun-nu-basic.webp', price: '200.000 VNĐ', description: 'Áo thun cotton 100% mềm mại, dễ phối đồ, đa dạng màu sắc.' },
        { id: 3, name: 'Quần Jeans Slim Fit Nam', image: 'imgquandai/quan-jeans-nam.webp', price: '500.000 VNĐ', description: 'Quần jeans co giãn, phong cách hiện đại, tôn dáng.' },
        { id: 4, name: 'Mũ Lưỡi Trai Thể Thao', image: 'imgphukien/mu-luoi-trai.webp', price: '150.000 VNĐ', description: 'Mũ cá tính, phù hợp dã ngoại, thể thao, chất liệu bền.' },
        { id: 5, name: 'Áo Khoác Bomber Nữ', image: 'imgaokhoac/ao-khoac-bomber.webp', price: '680.000 VNĐ', description: 'Áo khoác phong cách bomber, ấm áp và thời trang.' },
        { id: 6, name: 'Giày Sneaker Unisex', image: 'imggiay/giay-sneaker-unisex.webp', price: '850.000 VNĐ', description: 'Giày sneaker thoải mái, đa năng, phù hợp đi học, đi chơi.' },
        { id: 7, name: 'Váy Maxi Hoa', image: 'imgvay/vay-maxi-hoa.webp', price: '420.000 VNĐ', description: 'Váy maxi họa tiết hoa, chất liệu voan nhẹ nhàng, bay bổng.' },
        { id: 8, name: 'Balo Du Lịch Đa Năng', image: 'imgphukien/balo-du-lich.webp', price: '320.000 VNĐ', description: 'Balo lớn, nhiều ngăn, chống nước, thích hợp du lịch.' },
        // Thêm tất cả các sản phẩm của bạn vào đây với đường dẫn ảnh đúng của bạn
        // Đảm bảo các thư mục ảnh như imgpolo, imgaothun, imgquandai, v.v. tồn tại và các file ảnh bên trong chúng.
    ];

    function displaySearchResults(query) {
        searchResultsContainer.innerHTML = '';
        const lowerCaseQuery = query.toLowerCase().trim();

        if (lowerCaseQuery.length === 0) {
            noResultsMessage.style.display = 'none';
            return;
        }

        const filteredProducts = products.filter(product =>
            product.name.toLowerCase().includes(lowerCaseQuery) ||
            product.description.toLowerCase().includes(lowerCaseQuery)
        );

        if (filteredProducts.length === 0) {
            noResultsMessage.style.display = 'block';
        } else {
            noResultsMessage.style.display = 'none';
            filteredProducts.forEach(product => {
                const resultItem = document.createElement('a');
                resultItem.href = `/product/${product.id}`;
                resultItem.classList.add('search-result-item');

                const img = document.createElement('img');
                img.src = product.image;
                img.alt = product.name;

                const infoDiv = document.createElement('div');
                infoDiv.classList.add('search-result-info');

                const title = document.createElement('h4');
                title.textContent = product.name;

                const price = document.createElement('p');
                price.textContent = product.price;

                infoDiv.appendChild(title);
                infoDiv.appendChild(price);

                resultItem.appendChild(img);
                resultItem.appendChild(infoDiv);

                searchResultsContainer.appendChild(resultItem);
            });
        }
    }

    openSearchBtn.addEventListener('click', (event) => {
        event.preventDefault();
        searchOverlay.classList.add('active');
        overlaySearchInput.focus();
        displaySearchResults(overlaySearchInput.value);
    });

    closeSearchBtn.addEventListener('click', () => {
        searchOverlay.classList.remove('active');
        overlaySearchInput.value = '';
        searchResultsContainer.innerHTML = '';
        noResultsMessage.style.display = 'none';
    });

    searchOverlay.addEventListener('click', (event) => {
        if (event.target === searchOverlay) {
            searchOverlay.classList.remove('active');
            overlaySearchInput.value = '';
            searchResultsContainer.innerHTML = '';
            noResultsMessage.style.display = 'none';
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && searchOverlay.classList.contains('active')) {
            searchOverlay.classList.remove('active');
            overlaySearchInput.value = '';
            searchResultsContainer.innerHTML = '';
            noResultsMessage.style.display = 'none';
        }
    });

    overlaySearchInput.addEventListener('input', (event) => {
        const query = event.target.value;
        displaySearchResults(query);
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const openSearchBtn = document.getElementById('openSearchBtn');
    const closeSearchBtn = document.getElementById('closeSearchBtn');
    const searchOverlay = document.getElementById('searchOverlay');
    const overlaySearchInput = document.getElementById('overlaySearchInput');
    const searchResultsContainer = document.getElementById('searchResultsContainer');
    const noResultsMessage = document.getElementById('noResultsMessage');

    // Sample product data (replace with actual data from a backend/API in a real project)
    const products = [
        { id: 1, name: "Áo Polo Nam Kanis", price: "350.000 VNĐ", image: "imgpolo/ao-polo-nam-kanis.webp" },
        { id: 2, name: "Áo Polo Nam Milo", price: "200.000 VNĐ", image: "imgpolo/ao-polo-nam-milo.webp" },
        { id: 3, name: "Áo Polo Nam Noah", price: "500.000 VNĐ", image: "imgpolo/ao-polo-nam-naoh.webp" },
        { id: 4, name: "Áo Polo Nam Ray", price: "150.000 VNĐ", image: "imgpolo/ao-polo-nam-ray.webp" },
        { id: 5, name: "Áo Polo Nam Basic Dimonod", price: "680.000 VNĐ", image: "imgpolo/ao-polo-nam-basic-dimonod.webp" },
        { id: 6, name: "Áo Polo Nam Simon", price: "850.000 VNĐ", image: "imgpolo/ao-polo-nam-simon.webp" },
        { id: 7, name: "Áo Polo Nam Wind", price: "420.000 VNĐ", image: "imgpolo/ao-polo-nam-wind.webp" },
        { id: 8, name: "Áo Polo Nam Gin", price: "320.000 VNĐ", image: "imgpolo/ao-polonam-nam-gin.webp" },

        { id: 9, name: "Áo Thun Nam Mike", price: "400.000 VNĐ", image: "imgaothun/ao-thun-nam-mike.webp" },
        { id: 10, name: "Áo Thun Nam Tshirt Basic", price: "280.000 VNĐ", image: "imgaothun/ao-thun-nam-t-shirt-basic.webp" },
        { id: 11, name: "Áo Thun Nam Tshirt Porin", price: "280.000 VNĐ", image: "imgaothun/ao-thun-nam-t-shirt-porin.webp" },
        { id: 12, name: "Áo Thun Nam Tay Dài Liam Shirt", price: "280.000 VNĐ", image: "imgaothun/ao-thun-nam-tay-dai-liam-shirt.webp" },
        { id: 13, name: "Áo Thun Nam Tshirt Basic", price: "280.000 VNĐ", image: "imgaothun/ao-thun-nam-t-shirt-basic.webp" },
        { id: 14, name: "Áo Thun Nam Teper", price: "280.000 VNĐ", image: "imgaothun/ao-thun-nam-teper.webp" },
        { id: 15, name: "Áo Thun Nam Tshirt Basic USA", price: "280.000 VNĐ", image: "imgaothun/ao-thun-nam-tshirt-basic-usa.webp" },

        { id: 16, name: "Quần Nam Classic Pants", price: "280.000 VNĐ", image: "imgquandai/quan-classic-pants.webp" },
        { id: 17, name: "Quần Nam Kaki SD Gân", price: "280.000 VNĐ", image: "imgquandai/quan-kaki-sd-gan.webp" },
        { id: 18, name: "Quần Nam SideTab Khaki Tây", price: "280.000 VNĐ", image: "imgquandai/quan-sidetab-khaki-tay.webp" },
        { id: 19, name: "Quần Nam Smart Fit Khaki", price: "280.000 VNĐ", image: "imgquandai/quan-smart-fit-khaki.webp" },

        { id: 20, name: "Quần Short Nam Classic Tây", price: "280.000 VNĐ", image: "imgquandai/quan-classic-pants.webp" },
        { id: 21, name: "Quần short Nam Kaki", price: "280.000 VNĐ", image: "imgquandai/quan-kaki-sd-gan.webp" },
        { id: 22, name: "Quần Short Nam Nỉ", price: "280.000 VNĐ", image: "imgquandai/quan-sidetab-khaki-tay.webp" },
        { id: 23, name: "Quần Short Nam Tây Nam", price: "280.000 VNĐ", image: "imgquandai/quan-smart-fit-khaki.webp" },

        { id: 24, name: "Áo Sơmi Nam Extra Cotton", price: "280.000 VNĐ", image: "imgsomi/ao-somi-extra-cotton.webp" },
        { id: 25, name: "Áo Sơmi Nam Linen", price: "280.000 VNĐ", image: "imgsomi/ao-somi-linen.webp" },
        { id: 26, name: "Áo Sơmi Oxford", price: "280.000 VNĐ", image: "imgsomi/ao-somi-oxford.webp" },
        { id: 27, name: "Áo Sơmi Ribbed", price: "280.000 VNĐ", image: "imgsomi/ao-somi-ribbed.webp" },
        { id: 28, name: "Áo Sơmi Stripy", price: "280.000 VNĐ", image: "imgsomi/ao-somi-stripy.webp" }
        


        // Add more products here
    ];

    if (openSearchBtn && closeSearchBtn && searchOverlay && overlaySearchInput && searchResultsContainer && noResultsMessage) {
        // Open search overlay
        openSearchBtn.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default link behavior
            searchOverlay.classList.add('active');
            overlaySearchInput.focus(); // Focus on the input field when opening
            displaySearchResults(''); // Clear previous search results
        });

        // Close search overlay
        closeSearchBtn.addEventListener('click', function() {
            searchOverlay.classList.remove('active');
            overlaySearchInput.value = ''; // Clear input field
            displaySearchResults(''); // Clear results when closing
        });

        // Close overlay if clicking outside the content (on the dark background)
        searchOverlay.addEventListener('click', function(event) {
            if (event.target === searchOverlay) {
                searchOverlay.classList.remove('active');
                overlaySearchInput.value = '';
                displaySearchResults('');
            }
        });

        // Handle search input
        overlaySearchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase();
            displaySearchResults(query);
        });

        function displaySearchResults(query) {
            searchResultsContainer.innerHTML = ''; // Clear previous results
            const filteredProducts = products.filter(product =>
                product.name.toLowerCase().includes(query)
            );

            if (query === '' || filteredProducts.length === 0) {
                noResultsMessage.style.display = 'block';
                if (query === '') {
                    noResultsMessage.textContent = 'Bắt đầu gõ để tìm kiếm sản phẩm...';
                } else {
                    noResultsMessage.textContent = 'Không tìm thấy sản phẩm nào khớp với tìm kiếm của bạn.';
                }
            } else {
                noResultsMessage.style.display = 'none';
                filteredProducts.forEach(product => {
                    const resultItem = document.createElement('a');
                    resultItem.href = `product-detail.html?id=${product.id}`; // Link to product detail page
                    resultItem.classList.add('search-result-item');

                    resultItem.innerHTML = `
                        <img src="${product.image}" alt="${product.name}">
                        <div class="search-result-info">
                            <h4>${product.name}</h4>
                            <p class="price">${product.price}</p>
                        </div>
                    `;
                    searchResultsContainer.appendChild(resultItem);
                });
            }
        }
    } else {
        console.warn("Search overlay elements not found. Search functionality disabled.");
    }
});
document.addEventListener('DOMContentLoaded', function () {
    const pages = document.querySelectorAll('.pagination-page');
    const pageContents = document.querySelectorAll('[class^="page-"]');
    const prevBtn = document.querySelector('.pagination-prev');
    const nextBtn = document.querySelector('.pagination-next');

    // Функция показа страницы
    function showPage(pageNum) {
        pageContents.forEach(page => {
            page.style.display = 'none';
            page.classList.remove('active-page');
        });

        const activePage = document.querySelector(`.page-${pageNum}`);
        if (activePage) {
            activePage.style.display = 'grid';
            activePage.classList.add('active-page');
        }

        pages.forEach(p => {
            p.classList.remove('active');
            if (p.textContent == pageNum) {
                p.classList.add('active');
            }
        });
        updateButtons(pageNum);
    }

    // Функция обновления кнопок
    function updateButtons(currentPage) {
        const firstPage = 1;
        const lastPage = 11;

        if (currentPage == firstPage) {
            prevBtn.classList.add('disabled');
        } else {
            prevBtn.classList.remove('disabled');
        }

        if (currentPage == lastPage) {
            nextBtn.classList.add('disabled');
        } else {
            nextBtn.classList.remove('disabled');
        }
    }

    function getCurrentPage() {
        const activePage = document.querySelector('.pagination-page.active');
        return activePage ? parseInt(activePage.textContent) : 1;
    }


    pages.forEach(page => {
        page.addEventListener('click', function (e) {
            e.preventDefault();
            const pageNum = this.textContent;
            if (!isNaN(pageNum)) {
                showPage(pageNum);
            }
        });
    });

    prevBtn.addEventListener('click', function (e) {
        e.preventDefault();

        if (!this.classList.contains('disabled')) {
            const currentPage = getCurrentPage();
            const prevPage = currentPage - 1;

            let targetPage = prevPage;
            if (prevPage === 6) { 
            }

            showPage(targetPage);
        }
    });

    nextBtn.addEventListener('click', function (e) {
        e.preventDefault();

        if (!this.classList.contains('disabled')) {
            const currentPage = getCurrentPage();
            const nextPage = currentPage + 1;
            let targetPage = nextPage;
            if (currentPage === 5 && nextPage === 6) {
                targetPage = 11;
            }

            showPage(targetPage);
        }
    });

    showPage(1);
});

document.addEventListener('DOMContentLoaded', function () {
    const collectionCheckboxes = document.querySelectorAll('.filter-section:first-child .filter-checkbox input');
    const availabilityRadios = document.querySelectorAll('.filter-section:nth-child(2) .filter-radio input');
    const orientationCheckboxes = document.querySelectorAll('.filter-section:nth-child(3) .filter-checkbox input');
    const minPriceInput = document.querySelector('.min-price');
    const maxPriceInput = document.querySelector('.max-price');
    const applyBtn = document.querySelector('.apply-filters-btn');
    const resetBtn = document.querySelector('.reset-link');

    const allPosters = document.querySelectorAll('.catalog-poster-item');

    // Функция применения фильтров
    function applyFilters() {
        const selectedCollections = [];
        collectionCheckboxes.forEach((checkbox, index) => {
            if (checkbox.checked) {
                const years = ['1982', '1986', '1987', '1988', '1989'];
                selectedCollections.push(years[index]);
            }
        });
        let selectedAvailability = null;
        availabilityRadios.forEach((radio, index) => {
            if (radio.checked) {
                if (index === 0) selectedAvailability = true; 
                else if (index === 1) selectedAvailability = false; 
                else selectedAvailability = 'all'; 
            }
        });
        const selectedOrientations = [];
        orientationCheckboxes.forEach((checkbox, index) => {
            if (checkbox.checked) {
                const orientations = ['portrait', 'landscape'];
                selectedOrientations.push(orientations[index]);
            }
        });
        const minPrice = parseInt(minPriceInput.value) || 0;
        const maxPrice = parseInt(maxPriceInput.value) || 5000;


        allPosters.forEach(poster => {
            let showPoster = true;

            // Фильтр по коллекции
            if (selectedCollections.length > 0) {
                const posterCollection = poster.dataset.collection;
                if (!selectedCollections.includes(posterCollection)) {
                    showPoster = false;
                }
            }

            // Фильтр по наличию
            if (showPoster && selectedAvailability !== null && selectedAvailability !== 'all') {
                const posterAvailable = poster.dataset.available === 'true';
                if (posterAvailable !== selectedAvailability) {
                    showPoster = false;
                }
            }

            // Фильтр по ориентации
            if (showPoster && selectedOrientations.length > 0) {
                const posterOrientation = poster.dataset.orientation;
                if (!selectedOrientations.includes(posterOrientation)) {
                    showPoster = false;
                }
            }

            // Фильтр по цене
            if (showPoster) {
                const posterPrice = parseInt(poster.dataset.price);
                if (posterPrice < minPrice || posterPrice > maxPrice) {
                    showPoster = false;
                }
            }
            if (showPoster) {
                poster.style.display = 'block';
            } else {
                poster.style.display = 'none';
            }
        });
        updateProductsCount();
    }

    // Функция сброса фильтров
    function resetFilters() {
        collectionCheckboxes.forEach(checkbox => {
            checkbox.checked = false;
        });

        availabilityRadios.forEach((radio, index) => {
            radio.checked = index === 2; 
        });

        orientationCheckboxes.forEach(checkbox => {
            checkbox.checked = false;
        });

        minPriceInput.value = 0;
        maxPriceInput.value = 5000;

        allPosters.forEach(poster => {
            poster.style.display = 'block';
        });

        updateProductsCount();

        if (typeof updateRange === 'function') {
            updateRange();
        }
    }

    // Функция обновления счетчика товаров
    function updateProductsCount() {
        const visiblePosters = document.querySelectorAll('.catalog-poster-item[style="display: block"]');
        const count = visiblePosters.length;
        const paginationInfo = document.querySelector('.pagination-info');
        if (paginationInfo) {
            paginationInfo.textContent = `Показано ${count} из ${allPosters.length} товаров`;
        }
    }

    applyBtn.addEventListener('click', function (e) {
        e.preventDefault();
        applyFilters();
    });

    resetBtn.addEventListener('click', function (e) {
        e.preventDefault();
        resetFilters();
    });

    updateProductsCount();
});

document.addEventListener('DOMContentLoaded', function () {
    const collectionCheckboxes = document.querySelectorAll('.filter-section:first-child .filter-checkbox input');
    const availabilityRadios = document.querySelectorAll('.filter-section:nth-child(2) .filter-radio input');
    const orientationCheckboxes = document.querySelectorAll('.filter-section:nth-child(3) .filter-checkbox input');
    const rangeMin = document.querySelector('.range-min');
    const rangeMax = document.querySelector('.range-max');
    const minPriceInput = document.querySelector('.min-price');
    const maxPriceInput = document.querySelector('.max-price');
    const track = document.querySelector('.slider-track');

    const applyBtn = document.querySelector('.apply-filters-btn');
    const resetBtn = document.querySelector('.reset-link');

    const allPosters = document.querySelectorAll('.catalog-poster-item');

    function updateRange() {
        const minVal = parseInt(rangeMin.value);
        const maxVal = parseInt(rangeMax.value);
        const minPercent = (minVal / 5000) * 100;
        const maxPercent = (maxVal / 5000) * 100;

        track.style.background = `linear-gradient(to right, #ddd ${minPercent}%, #0066ff ${minPercent}%, #0066ff ${maxPercent}%, #ddd ${maxPercent}%)`;

        minPriceInput.value = minVal;
        maxPriceInput.value = maxVal;
    }

    rangeMin.addEventListener('input', function () {
        if (parseInt(rangeMin.value) > parseInt(rangeMax.value) - 100) {
            rangeMin.value = parseInt(rangeMax.value) - 100;
        }
        updateRange();
    });

    rangeMax.addEventListener('input', function () {
        if (parseInt(rangeMax.value) < parseInt(rangeMin.value) + 100) {
            rangeMax.value = parseInt(rangeMin.value) + 100;
        }
        updateRange();
    });

    minPriceInput.addEventListener('change', function () {
        let val = parseInt(minPriceInput.value);
        if (isNaN(val)) val = 0;
        if (val < 0) val = 0;
        if (val > parseInt(maxPriceInput.value) - 100) {
            val = parseInt(maxPriceInput.value) - 100;
        }
        rangeMin.value = val;
        updateRange();
    });

    maxPriceInput.addEventListener('change', function () {
        let val = parseInt(maxPriceInput.value);
        if (isNaN(val)) val = 5000;
        if (val > 5000) val = 5000;
        if (val < parseInt(minPriceInput.value) + 100) {
            val = parseInt(minPriceInput.value) + 100;
        }
        rangeMax.value = val;
        updateRange();
    });

    // Функция применения фильтров
    function applyFilters() {
        const selectedCollections = [];
        collectionCheckboxes.forEach((checkbox, index) => {
            if (checkbox.checked) {
                const years = ['1982', '1986', '1987', '1988', '1989'];
                selectedCollections.push(years[index]);
            }
        });

        let selectedAvailability = null;
        availabilityRadios.forEach((radio, index) => {
            if (radio.checked) {
                if (index === 0) selectedAvailability = true;  
                else if (index === 1) selectedAvailability = false;  
                else selectedAvailability = 'all';  
            }
        });

        const selectedOrientations = [];
        orientationCheckboxes.forEach((checkbox, index) => {
            if (checkbox.checked) {
                const orientations = ['portrait', 'landscape'];
                selectedOrientations.push(orientations[index]);
            }
        });

        const minPrice = parseInt(rangeMin.value);
        const maxPrice = parseInt(rangeMax.value);

        allPosters.forEach(poster => {
            let showPoster = true;

            if (selectedCollections.length > 0) {
                const posterCollection = poster.dataset.collection;
                if (!selectedCollections.includes(posterCollection)) {
                    showPoster = false;
                }
            }

            if (showPoster && selectedAvailability !== null && selectedAvailability !== 'all') {
                const posterAvailable = poster.dataset.available === 'true';
                if (posterAvailable !== selectedAvailability) {
                    showPoster = false;
                }
            }

            if (showPoster && selectedOrientations.length > 0) {
                const posterOrientation = poster.dataset.orientation;
                if (!selectedOrientations.includes(posterOrientation)) {
                    showPoster = false;
                }
            }

            if (showPoster) {
                const posterPrice = parseInt(poster.dataset.price);
                if (posterPrice < minPrice || posterPrice > maxPrice) {
                    showPoster = false;
                }
            }

            poster.style.display = showPoster ? 'block' : 'none';
        });

        updateProductsCount();
    }

    // Функция сброса фильтров
    function resetFilters() {
        collectionCheckboxes.forEach(checkbox => {
            checkbox.checked = false;
        });

        availabilityRadios.forEach((radio, index) => {
            radio.checked = index === 2;
        });

        orientationCheckboxes.forEach(checkbox => {
            checkbox.checked = false;
        });

        rangeMin.value = 0;
        rangeMax.value = 5000;
        updateRange();

        allPosters.forEach(poster => {
            poster.style.display = 'block';
        });

        updateProductsCount();
    }

    // Функция обновления счетчика товаров
    function updateProductsCount() {
        const visiblePosters = document.querySelectorAll('.catalog-poster-item[style="display: block"]');
        const count = visiblePosters.length;

        const paginationInfo = document.querySelector('.pagination-info');
        if (paginationInfo) {
            paginationInfo.textContent = `Показано ${count} из ${allPosters.length} товаров`;
        }
    }
    function updatePriceLabels() {
        const minVal = parseInt(rangeMin.value);
        const maxVal = parseInt(rangeMax.value);

        document.querySelector('.min-label').textContent = minVal + ' ₽';
        document.querySelector('.max-label').textContent = maxVal + ' ₽';

        minPriceInput.value = minVal;
        maxPriceInput.value = maxVal;
    }

    function updateRange() {
        const minVal = parseInt(rangeMin.value);
        const maxVal = parseInt(rangeMax.value);
        const minPercent = (minVal / 5000) * 100;
        const maxPercent = (maxVal / 5000) * 100;

        track.style.background = `linear-gradient(to right, #ddd ${minPercent}%, #0066ff ${minPercent}%, #0066ff ${maxPercent}%, #ddd ${maxPercent}%)`;

        updatePriceLabels();
    }


    updateRange();

    applyBtn.addEventListener('click', function (e) {
        e.preventDefault();
        applyFilters();
    });


    resetBtn.addEventListener('click', function (e) {
        e.preventDefault();
        resetFilters();
    });

    updateRange();
    updateProductsCount();
});



document.addEventListener('DOMContentLoaded', function () {

    const POSTERS_PER_PAGE = 9;

    const productsGrid = document.getElementById('products-grid');
    const allPosters = Array.from(document.querySelectorAll('.catalog-poster-item'));
    const paginationPages = document.querySelector('.pagination-pages');
    const prevBtn = document.querySelector('.pagination-prev');
    const nextBtn = document.querySelector('.pagination-next');
    const paginationInfo = document.querySelector('.pagination-info');

    let currentPage = 1;
    let filteredPosters = allPosters; 


    function applyFilters() {
        const selectedCollections = getSelectedCollections();
        const selectedAvailability = getSelectedAvailability();
        const selectedOrientations = getSelectedOrientations();
        const minPrice = parseInt(document.querySelector('.range-min').value);
        const maxPrice = parseInt(document.querySelector('.range-max').value);


        filteredPosters = allPosters.filter(poster => {
            let showPoster = true;

            if (selectedCollections.length > 0) {
                const posterCollection = poster.dataset.collection;
                if (!selectedCollections.includes(posterCollection)) {
                    showPoster = false;
                }
            }

            if (showPoster && selectedAvailability !== null && selectedAvailability !== 'all') {
                const posterAvailable = poster.dataset.available === 'true';
                if (posterAvailable !== selectedAvailability) {
                    showPoster = false;
                }
            }

            if (showPoster && selectedOrientations.length > 0) {
                const posterOrientation = poster.dataset.orientation;
                if (!selectedOrientations.includes(posterOrientation)) {
                    showPoster = false;
                }
            }

            if (showPoster) {
                const posterPrice = parseInt(poster.dataset.price);
                if (posterPrice < minPrice || posterPrice > maxPrice) {
                    showPoster = false;
                }
            }

            return showPoster;
        });

        currentPage = 1;

        updateDisplay();
        updatePagination();
        updateProductsCount();
    }

    function updateDisplay() {
        allPosters.forEach(poster => {
            poster.style.display = 'none';
        });

        const startIndex = (currentPage - 1) * POSTERS_PER_PAGE;
        const endIndex = Math.min(startIndex + POSTERS_PER_PAGE, filteredPosters.length);

        console.log(`Показываем постеры с ${startIndex} по ${endIndex - 1}`);
        console.log(`Всего отфильтровано: ${filteredPosters.length}`);

        for (let i = startIndex; i < endIndex; i++) {
            if (filteredPosters[i]) {
                filteredPosters[i].style.display = 'block';
                console.log(`Показываем постер ${i}`);
            }
        }

        const visibleCount = document.querySelectorAll('.catalog-poster-item[style*="display: block"]').length;
        console.log(`Видимых постеров: ${visibleCount}`);


        console.log('Первый постер display:', allPosters[0]?.style.display);
    }
    // Функция обновления пагинации
    function updatePagination() {
        const totalPages = Math.ceil(filteredPosters.length / POSTERS_PER_PAGE);

        let pagesHTML = '';

        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) {
                pagesHTML += `<a href="#" class="pagination-page ${i === currentPage ? 'active' : ''}">${i}</a>`;
            }
        } else {
            pagesHTML += `<a href="#" class="pagination-page ${currentPage === 1 ? 'active' : ''}">1</a>`;

            if (currentPage > 3) {
                pagesHTML += `<span class="pagination-dots">...</span>`;
            }

            for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
                if (i > 1 && i < totalPages) {
                    pagesHTML += `<a href="#" class="pagination-page ${i === currentPage ? 'active' : ''}">${i}</a>`;
                }
            }

            if (currentPage < totalPages - 2) {
                pagesHTML += `<span class="pagination-dots">...</span>`;
            }

            pagesHTML += `<a href="#" class="pagination-page ${currentPage === totalPages ? 'active' : ''}">${totalPages}</a>`;
        }

        paginationPages.innerHTML = pagesHTML;

        prevBtn.classList.toggle('disabled', currentPage === 1);
        nextBtn.classList.toggle('disabled', currentPage === totalPages);

        attachPaginationHandlers();
    }

    function updateProductsCount() {
        const start = (currentPage - 1) * POSTERS_PER_PAGE + 1;
        const end = Math.min(currentPage * POSTERS_PER_PAGE, filteredPosters.length);

        paginationInfo.textContent = `Показано ${start}-${end} из ${filteredPosters.length} товаров`;
    }

    function attachPaginationHandlers() {
        document.querySelectorAll('.pagination-page').forEach(page => {
            page.addEventListener('click', function (e) {
                e.preventDefault();
                const pageNum = parseInt(this.textContent);
                if (!isNaN(pageNum)) {
                    currentPage = pageNum;
                    updateDisplay();
                    updatePagination();
                    updateProductsCount();
                    productsGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    }

    function getSelectedCollections() {
        const checkboxes = document.querySelectorAll('.filter-section:first-child .filter-checkbox input');
        const selected = [];
        checkboxes.forEach((checkbox, index) => {
            if (checkbox.checked) {
                const years = ['1982', '1986', '1987', '1988', '1989'];
                selected.push(years[index]);
            }
        });
        return selected;
    }

    function getSelectedAvailability() {
        const radios = document.querySelectorAll('.filter-section:nth-child(2) .filter-radio input');
        let selected = 'all';
        radios.forEach((radio, index) => {
            if (radio.checked) {
                if (index === 0) selected = true;
                else if (index === 1) selected = false;
                else selected = 'all';
            }
        });
        return selected;
    }

    function getSelectedOrientations() {
        const checkboxes = document.querySelectorAll('.filter-section:nth-child(3) .filter-checkbox input');
        const selected = [];
        checkboxes.forEach((checkbox, index) => {
            if (checkbox.checked) {
                const orientations = ['portrait', 'landscape'];
                selected.push(orientations[index]);
            }
        });
        return selected;
    }

    document.querySelector('.apply-filters-btn').addEventListener('click', function (e) {
        e.preventDefault();
        applyFilters();
    });

    document.querySelector('.reset-link').addEventListener('click', function (e) {
        e.preventDefault();
        resetFilters();
    });

    function resetFilters() {
        document.querySelectorAll('.filter-section:first-child .filter-checkbox input').forEach(cb => cb.checked = false);
        document.querySelectorAll('.filter-section:nth-child(2) .filter-radio input').forEach((radio, index) => {
            radio.checked = index === 2;
        });
        document.querySelectorAll('.filter-section:nth-child(3) .filter-checkbox input').forEach(cb => cb.checked = false);

        document.querySelector('.range-min').value = 0;
        document.querySelector('.range-max').value = 5000;
        if (typeof updateRange === 'function') updateRange();

        applyFilters();
    }




    updateDisplay();
    updatePagination();
    updateProductsCount();
});


function isUserLoggedIn() {
    return localStorage.getItem('isLoggedIn') === 'true';
}

function loadFavorites() {
    return JSON.parse(localStorage.getItem('favorites')) || [];
}

function saveFavorites(favorites) {
    localStorage.setItem('favorites', JSON.stringify(favorites));
    updateFavoritesCounter();
}

function loadCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCounter();
}


function updateFavoritesCounter() {
    const favorites = loadFavorites();
    const favCounter = document.getElementById('favoritesCounter');

    if (favCounter) {
        favCounter.textContent = favorites.length;
        favCounter.style.display = favorites.length > 0 ? 'block' : 'none';
    }
}

function updateCartCounter() {
    const cart = loadCart();
    const cartCounter = document.getElementById('cartCounter');

    if (cartCounter) {
        cartCounter.textContent = cart.length;
        cartCounter.style.display = cart.length > 0 ? 'block' : 'none';
    }
}


function updateAllHearts() {
    if (!isUserLoggedIn()) return;

    const favorites = loadFavorites();
    const hearts = document.querySelectorAll('.catalog-poster-heart .catalog-heart-icon');

    hearts.forEach((heart, index) => {
        const productItem = heart.closest('.catalog-poster-item');
        const productId = productItem?.dataset.productId || productItem?.dataset.id || index.toString();

        if (favorites.includes(productId)) {
            heart.classList.add('active');
            if (heart.tagName === 'IMG') heart.src = 'heart-blue.png';
        } else {
            heart.classList.remove('active');
            if (heart.tagName === 'IMG') heart.src = 'сердце.png';
        }
    });
}

function toggleFavorite(heartElement) {
    if (!isUserLoggedIn()) {
        showLoginPrompt();
        return false;
    }

    const productItem = heartElement.closest('.catalog-poster-item');
    const productId = productItem?.dataset.productId || productItem?.dataset.id || Date.now().toString();

    let favorites = loadFavorites();

    if (heartElement.classList.contains('active')) {
        favorites = favorites.filter(id => id !== productId);
        heartElement.classList.remove('active');
        if (heartElement.tagName === 'IMG') heartElement.src = 'сердце.png';
        showNotification('Удалено из избранного');
    } else {
        if (!favorites.includes(productId)) favorites.push(productId);
        heartElement.classList.add('active');
        if (heartElement.tagName === 'IMG') heartElement.src = 'heart-blue.png';
        showNotification('Добавлено в избранное');
    }

    saveFavorites(favorites);
    return true;
}

function heartClickHandler(e) {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(this);
}

function initFavoriteHearts() {
    document.querySelectorAll('.catalog-poster-heart .catalog-heart-icon').forEach(heart => {
        heart.removeEventListener('click', heartClickHandler);
        heart.addEventListener('click', heartClickHandler);
    });
}


function initCartHandlers() {
    document.querySelectorAll('.catalog-poster-cart').forEach(cartBtn => {
        const newBtn = cartBtn.cloneNode(true);
        cartBtn.parentNode.replaceChild(newBtn, cartBtn);

        newBtn.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();

            if (!isUserLoggedIn()) {
                showLoginPrompt();
                return;
            }

            const productItem = this.closest('.catalog-poster-item');
            const product = {
                id: productItem?.dataset.productId || productItem?.dataset.id || Date.now().toString(),
                title: productItem?.querySelector('.catalog-poster-title')?.textContent || 'Постер',
                price: productItem?.querySelector('.catalog-poster-price')?.textContent || '0 ₽',
                image: productItem?.querySelector('img')?.src || ''
            };

            let cart = loadCart();
            const existingItem = cart.find(item => item.id === product.id);

            if (existingItem) {
                existingItem.quantity = (existingItem.quantity || 1) + 1;
            } else {
                product.quantity = 1;
                cart.push(product);
            }

            saveCart(cart);
            showNotification('Товар добавлен в корзину');
        });
    });
}


function updateUserSection() {
    const userSection = document.getElementById('userSection');
    const isLoggedIn = isUserLoggedIn();

    if (userSection) {
        if (isLoggedIn) {
            userSection.innerHTML = `
                <a href="#" class="icon-link" id="logoutBtn" title="Выйти">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                        <polyline points="16 17 21 12 16 7"/>
                        <line x1="21" y1="12" x2="9" y2="12"/>
                    </svg>
                </a>
            `;
            document.getElementById('logoutBtn').addEventListener('click', function (e) {
                e.preventDefault();
                logout();
            });
        } else {
            userSection.innerHTML = `
                <a href="login.html" class="icon-link" id="userIcon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                        <circle cx="12" cy="7" r="4"/>
                    </svg>
                </a>
            `;
        }
    }
}

function updateHeader() {
    const body = document.body;

    if (isUserLoggedIn()) {
        body.classList.add('logged-in');
        updateAllHearts();
    } else {
        body.classList.remove('logged-in');
    }

    updateFavoritesCounter();
    updateCartCounter();
}

function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    localStorage.removeItem('cart');
    localStorage.removeItem('favorites');

    document.body.classList.remove('logged-in');
    updateUserSection();
    updateFavoritesCounter();
    updateCartCounter();

    document.querySelectorAll('.catalog-poster-heart .catalog-heart-icon').forEach(heart => {
        heart.classList.remove('active');
        if (heart.tagName === 'IMG') heart.src = 'сердце.png';
    });

    showNotification('Вы вышли из системы');
}


function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'action-notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => notification.classList.add('show'), 10);
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

function showLoginPrompt() {
    if (document.querySelector('.auth-overlay')) return;

    const overlay = document.createElement('div');
    overlay.className = 'auth-overlay';
    overlay.innerHTML = `
        <div class="auth-modal">
            <h3>Требуется авторизация</h3>
            <p>Чтобы добавить товар в корзину или избранное, пожалуйста, войдите в систему</p>
            <div class="auth-modal-buttons">
                <a href="login.html" class="auth-btn login-btn">Войти</a>
                <a href="register.html" class="auth-btn register-btn">Регистрация</a>
                <button class="auth-btn close-btn">Закрыть</button>
            </div>
        </div>
    `;

    document.body.appendChild(overlay);
    setTimeout(() => overlay.classList.add('active'), 10);

    overlay.addEventListener('click', function (e) {
        if (e.target.classList.contains('close-btn') || e.target === overlay) {
            overlay.classList.remove('active');
            setTimeout(() => overlay.remove(), 300);
        }
    });
}


document.addEventListener('DOMContentLoaded', function () {
    console.log('Инициализация каталога');

    updateUserSection();
    updateHeader();
    updateFavoritesCounter();
    updateCartCounter();
    initFavoriteHearts();
    initCartHandlers();

    window.addEventListener('storage', function (e) {
        if (e.key === 'isLoggedIn' || e.key === 'cart' || e.key === 'favorites') {
            updateUserSection();
            updateHeader();
            updateFavoritesCounter();
            updateCartCounter();
            updateAllHearts();
        }
    });
});
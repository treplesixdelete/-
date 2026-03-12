function getProductIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id') || '1';
}
const productId = getProductIdFromUrl();
console.log('Текущий ID постера:', productId);
document.addEventListener('DOMContentLoaded', function () {
    const minusBtn = document.querySelector('.quantity-btn:first-child');
    const plusBtn = document.querySelector('.quantity-btn:last-child');
    const quantityInput = document.querySelector('.quantity-input');

    if (minusBtn && plusBtn && quantityInput) {
        minusBtn.addEventListener('click', function (e) {
            e.preventDefault();
            let currentValue = parseInt(quantityInput.value);
            if (currentValue > 1) {
                quantityInput.value = currentValue - 1;
            }
        });

        plusBtn.addEventListener('click', function (e) {
            e.preventDefault();
            let currentValue = parseInt(quantityInput.value);
            quantityInput.value = currentValue + 1;
        });
        quantityInput.addEventListener('change', function () {
            let value = parseInt(this.value);
            if (isNaN(value) || value < 1) {
                this.value = 1;
            }
        });
    }

    const variantOptions = document.querySelectorAll('.variant-option');
    if (variantOptions.length > 0) {
        variantOptions.forEach(option => {
            option.addEventListener('click', function () {
                variantOptions.forEach(opt => opt.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }

    const radioInputs = document.querySelectorAll('input[name="poster-type"]');
    if (radioInputs.length > 0) {
        radioInputs.forEach(radio => {
            radio.addEventListener('change', function () {
                console.log('Выбран тип:', this.value);
            });
        });
    }

    const addToCartBtn = document.querySelector('.add-to-cart-btn');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', function (e) {
            e.preventDefault();

            const productName = document.querySelector('.product-title')?.textContent || 'Товар';
            const productPrice = document.querySelector('.product-price')?.textContent || '0 ₽';
            const quantity = document.querySelector('.quantity-input')?.value || 1;

            let selectedType = 'Бумажный';
            const selectedRadio = document.querySelector('input[name="poster-type"]:checked');
            if (selectedRadio) {
                selectedType = selectedRadio.nextElementSibling?.nextElementSibling?.textContent || 'Бумажный';
            }

            console.log('Добавлено в корзину:', {
                товар: productName,
                цена: productPrice,
                количество: quantity,
                тип: selectedType
            });

            alert(`Товар "${productName}" (${selectedType}) в количестве ${quantity} шт. добавлен в корзину`);

        });
    }

    const favoriteIcon = document.querySelector('.favorite-icon');
    if (favoriteIcon) {
        favoriteIcon.addEventListener('click', function (e) {
            e.preventDefault();

            this.classList.toggle('active');

            if (this.classList.contains('active')) {
                console.log('Товар добавлен в избранное');
                const heartImg = this.querySelector('.heart-img');
                if (heartImg) {
                    heartImg.src = 'heart.png';
                }
            } else {
                console.log('Товар удален из избранного');
                const heartImg = this.querySelector('.heart-img');
                if (heartImg) {
                    heartImg.src = 'сердце.png'; 
                }
            }
        });
    }
});
document.addEventListener('DOMContentLoaded', function () {
    const mainImage = document.querySelector('.product-main-image img');
    const seriesLinks = document.querySelectorAll('.series-link');

    seriesLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const newImage = this.dataset.image;

            if (newImage && mainImage) {
                mainImage.style.opacity = '0';

                setTimeout(() => {
                    mainImage.src = newImage;
                    mainImage.style.opacity = '1';
                }, 300);
            }

            seriesLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
});


document.addEventListener('DOMContentLoaded', function () {
    const mainImage = document.querySelector('.product-main-image img');
    const popupOverlay = document.getElementById('popupOverlay');
    const popupImage = document.getElementById('popupImage');
    const popupClose = document.querySelector('.popup-close');

    if (mainImage) {
        mainImage.addEventListener('click', function () {
            popupImage.src = this.src;
            popupOverlay.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    }

    if (popupClose) {
        popupClose.addEventListener('click', function () {
            popupOverlay.style.display = 'none';
            document.body.style.overflow = '';
        });
    }

    popupOverlay.addEventListener('click', function (e) {
        if (e.target === popupOverlay) {
            popupOverlay.style.display = 'none';
            document.body.style.overflow = '';
        }
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && popupOverlay.style.display === 'block') {
            popupOverlay.style.display = 'none';
            document.body.style.overflow = '';
        }
    });
});
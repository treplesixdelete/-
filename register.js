document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registerForm');
    const agreementCheckbox = document.getElementById('agreementCheckbox');
    const registerBtn = document.getElementById('registerBtn');
    
    document.querySelector('input[type="tel"]').addEventListener('input', function(e) {
        let x = e.target.value.replace(/\D/g, '').match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
        e.target.value = !x[2] ? x[1] : '+7 (' + x[2] + ') ' + x[3] + (x[4] ? '-' + x[4] : '') + (x[5] ? '-' + x[5] : '');
    });

    if (agreementCheckbox && registerBtn) {
        registerBtn.disabled = !agreementCheckbox.checked;
        
        agreementCheckbox.addEventListener('change', function() {
            registerBtn.disabled = !this.checked;
        });
    }

    function validateField(input) {
        const formGroup = input.closest('.form-group');
        const errorMessage = formGroup.querySelector('.error-message');
        const label = formGroup.querySelector('.form-label');
        const isRequired = label && label.textContent.includes('*');
        
        if (isRequired && !input.value.trim()) {
            input.style.borderBottomColor = '#ff0000';
            
            if (!errorMessage) {
                const message = document.createElement('div');
                message.className = 'error-message';
                message.textContent = 'Это поле обязательно';
                message.style.color = '#ff0000';
                message.style.fontSize = '12px';
                message.style.marginTop = '5px';
                message.style.fontFamily = 'Montserrat, sans-serif';
                formGroup.appendChild(message);
            }
            return false;
        } else {
            input.style.borderBottomColor = '#000';
            if (errorMessage) {
                errorMessage.remove();
            }
            return true;
        }
    }
  
    document.querySelectorAll('.form-group .form-input[required], .form-group .country-select[required]').forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            this.style.borderBottomColor = '#000';
            const errorMessage = this.closest('.form-group').querySelector('.error-message');
            if (errorMessage) errorMessage.remove();
        });
    });
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        const requiredFields = document.querySelectorAll('.form-group .form-input[required], .form-group .country-select[required]');
        
        requiredFields.forEach(field => {
            if (!validateField(field)) isValid = false;
        });
        
        const password = document.querySelectorAll('input[type="password"]')[0];
        const confirmPassword = document.querySelectorAll('input[type="password"]')[1];
        
        if (password && confirmPassword && password.value !== confirmPassword.value) {
            [password, confirmPassword].forEach(field => {
                field.style.borderBottomColor = '#ff0000';
                const formGroup = field.closest('.form-group');
                let errorMessage = formGroup.querySelector('.error-message');
                
                if (!errorMessage) {
                    errorMessage = document.createElement('div');
                    errorMessage.className = 'error-message';
                    errorMessage.textContent = 'Пароли не совпадают';
                    errorMessage.style.color = '#ff0000';
                    errorMessage.style.fontSize = '12px';
                    errorMessage.style.marginTop = '5px';
                    formGroup.appendChild(errorMessage);
                }
            });
            isValid = false;
        }
    
        if (!agreementCheckbox.checked) {
            alert('Необходимо подтвердить согласие с условиями');
            isValid = false;
        }
        
        if (isValid) {
            const formData = {
                email: document.querySelector('input[type="email"]').value,
                firstName: document.querySelectorAll('input[type="text"]')[0].value,
                lastName: document.querySelectorAll('input[type="text"]')[1].value,
                password: password.value,
                confirmPassword: confirmPassword.value,
                phone: document.querySelector('input[type="tel"]').value,
                country: document.querySelector('.country-select').value,
                birthDay: document.querySelectorAll('.birthdate-input')[0].value,
                birthMonth: document.querySelectorAll('.birthdate-input')[1].value,
                birthYear: document.querySelectorAll('.birthdate-input')[2].value
            };
            
            localStorage.setItem('user', JSON.stringify(formData));
            localStorage.setItem('isLoggedIn', 'true');
            
            alert('Регистрация прошла успешно!');
            window.location.href = 'catalog.html';
        }
    });
});
const calendarBtn = document.querySelector('.calendar-btn');
const dayInput = document.querySelectorAll('.birthdate-input')[0];
const monthInput = document.querySelectorAll('.birthdate-input')[1];
const yearInput = document.querySelectorAll('.birthdate-input')[2];

if (calendarBtn) {
    calendarBtn.addEventListener('click', function() {
        const tempDateInput = document.createElement('input');
        tempDateInput.type = 'date';
        tempDateInput.style.position = 'fixed';
        tempDateInput.style.opacity = '0';
        tempDateInput.style.pointerEvents = 'none';
        document.body.appendChild(tempDateInput);
        
        tempDateInput.showPicker();
        
        tempDateInput.addEventListener('change', function() {
            const date = new Date(this.value);
            if (!isNaN(date.getTime())) {
                dayInput.value = date.getDate().toString().padStart(2, '0');
                monthInput.value = (date.getMonth() + 1).toString().padStart(2, '0');
                yearInput.value = date.getFullYear();
            }
            document.body.removeChild(tempDateInput);
        });
    });
}
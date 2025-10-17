const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const loginForm = document.getElementById('loginForm');
const loginBox = document.getElementById('loginBox');
const successMessage = document.getElementById('successMessage');
const signupLink = document.getElementById('signupLink');

// Handle input styling when user types
emailInput.addEventListener('input', function() {
    if (this.value.length > 0) {
        this.classList.add('filled');
        this.classList.remove('error');
    } else {
        this.classList.remove('filled');
    }
});

passwordInput.addEventListener('input', function() {
    if (this.value.length > 0) {
        this.classList.add('filled');
        this.classList.remove('error');
    } else {
        this.classList.remove('filled');
    }
});

// Handle form submission
loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    // Reset error states
    emailInput.classList.remove('error');
    passwordInput.classList.remove('error');

    // Validate inputs
    if (email === '' || password === '') {
        if (email === '') emailInput.classList.add('error');
        if (password === '') passwordInput.classList.add('error');
        return;
    }

    // Show success message
    loginBox.classList.add('hide');
    successMessage.classList.add('show');

    // Reset form after 3 seconds
    setTimeout(function() {
        loginBox.classList.remove('hide');
        successMessage.classList.remove('show');
        loginForm.reset();
        emailInput.classList.remove('filled');
        passwordInput.classList.remove('filled');
    }, 3000);
});

// Handle signup link click
signupLink.addEventListener('click', function(e) {
    e.preventDefault();
    alert('Signup functionality would be implemented here');
});

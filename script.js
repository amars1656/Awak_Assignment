document.getElementById('loginForm').addEventListener('submit', async function (e) {
    e.preventDefault();
  
    // Get input values
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    // Validate form fields
    if (!validateForm(username, password)) return;
  
    // Prepare payload
    const payload = {
      username: username,
      password: password
    };
  
    // Show loading spinner (optional)
    const responseMessage = document.getElementById('responseMessage');
    responseMessage.textContent = 'Logging in...';
  
    try {
      // Call API
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
  
      if (response.ok) {
        responseMessage.textContent = 'Login successful!';
        responseMessage.style.color = 'green';
      } else {
        responseMessage.textContent = 'Login failed. Please check your credentials.';
        responseMessage.style.color = 'red';
      }
    } catch (error) {
      responseMessage.textContent = 'An error occurred. Please try again later.';
      responseMessage.style.color = 'red';
    }
  });
  
  function validateForm(username, password) {
    let valid = true;
  
    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(username)) {
      showError('username', 'Invalid email format.');
      valid = false;
    } else {
      hideError('username');
    }
  
    // Password validation
    if (password.length < 6) {
      showError('password', 'Password must be at least 6 characters long.');
      valid = false;
    } else {
      hideError('password');
    }
  
    return valid;
  }
  
  function showError(id, message) {
    const inputGroup = document.getElementById(id).parentElement;
    const small = inputGroup.querySelector('small');
    small.textContent = message;
    small.style.display = 'block';
  }
  
  function hideError(id) {
    const inputGroup = document.getElementById(id).parentElement;
    const small = inputGroup.querySelector('small');
    small.style.display = 'none';
  }
  
  // Show/hide password functionality
  document.getElementById('showPassword').addEventListener('change', function () {
    const passwordField = document.getElementById('password');
    passwordField.type = this.checked ? 'text' : 'password';
  });
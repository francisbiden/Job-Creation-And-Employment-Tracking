document.addEventListener('DOMContentLoaded', function() {
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        form.addEventListener('submit', function(event) {
            const inputs = form.querySelectorAll('input, textarea, select');
            let valid = true;

            inputs.forEach(input => {
                if (input.required && input.value.trim() === '') {
                    input.classList.add('error');
                    valid = false;
                } else {
                    input.classList.remove('error');
                }
            });

            if (!valid) {
                event.preventDefault();
                alert('Please fill out all required fields.');
            }
        });
    });
});


const register = document.getElementById('register-candidate');

register.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from reloading the page

    const registerData = {
      name: document.getElementById('full_name').value,
      email: document.getElementById('email').value,
      phone: document.getElementById('phone_number').value,
      experience: document.getElementById('experience').value,
      location: document.getElementById('location').value,
    };

    fetch('/submit-login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registerData),
    })
    .then(response => response.json())
    .then(data => {
      alert('Login form submitted successfully!');
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  });


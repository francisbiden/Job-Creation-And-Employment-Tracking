// Form Validation and Interactivity
document.addEventListener('DOMContentLoaded', function () {
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
      form.addEventListener('submit', function (event) {
          event.preventDefault();
          if (validateForm(form)) {
              form.submit();  // Only submit if validation passes
          } else {
              alert('Please fill in all fields correctly.');
          }
      });
  });
});

// Validation functions for each form type
function validateForm(form) {
  let isValid = true;
  const inputs = form.querySelectorAll('input, textarea, select');

  inputs.forEach(input => {
      if (input.required && input.value.trim() === '') {
          showError(input, `${input.name} is required.`);
          isValid = false;
      } else if (input.type === 'email' && !validateEmail(input.value)) {
          showError(input, 'Please enter a valid email.');
          isValid = false;
      } else if (input.name === 'phone' && !validatePhone(input.value)) {
          showError(input, 'Please enter a valid phone number.');
          isValid = false;
      } else if (input.name === 'password' && input.value.length < 6) {
          showError(input, 'Password must be at least 6 characters.');
          isValid = false;
      } else {
          clearError(input);
      }
  });

  return isValid;
}

// Helper functions for validation
function showError(input, message) {
  const error = document.createElement('span');
  error.classList.add('error');
  error.textContent = message;
  if (!input.nextElementSibling) {
      input.parentElement.appendChild(error);
  }
  input.classList.add('error-input');
}

function clearError(input) {
  if (input.nextElementSibling) {
      input.parentElement.removeChild(input.nextElementSibling);
  }
  input.classList.remove('error-input');
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validatePhone(phone) {
  const re = /^\+?[0-9]{10,15}$/;
  return re.test(phone);
}

// Interactive UI elements
document.querySelectorAll('.button').forEach(button => {
  button.addEventListener('click', () => {
      alert(`Button ${button.innerText} was clicked!`);
  });
});

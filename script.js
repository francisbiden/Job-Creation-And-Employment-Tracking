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

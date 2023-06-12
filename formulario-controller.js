const form = document.getElementById('contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const subjectInput = document.getElementById('subject');
const messageInput = document.getElementById('message');
const submitButton = document.getElementById('submit-button');

submitButton.addEventListener('click', function(event) {
    let isValid = true;

    if (nameInput.value === '') {
        alert('Por favor, preencha o campo "Nome".');
        isValid = false;
    }

    if (emailInput.value === '') {
        alert('Por favor, preencha o campo "E-mail".');
        isValid = false;
    } else if (!isValidEmail(emailInput.value)) {
        alert('Por favor, insira um endereço de e-mail válido.');
        isValid = false;
    }

    if (subjectInput.value === '') {
        alert('Por favor, preencha o campo "Assunto".');
        isValid = false;
    }

    if (messageInput.value === '') {
        alert('Por favor, preencha o campo "Mensagem".');
        isValid = false;
    }

    if (!isValid) {
        event.preventDefault();
    } else {
        form.action = 'enviar-email.php';
        window.location.href = 'agradecimento.html';

    }
});

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
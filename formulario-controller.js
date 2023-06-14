const form = document.getElementById('contact-form');
const nameInput = document.getElementById('nome');
const emailInput = document.getElementById('email');
const whatsAppInput = document.getElementById('whatsapp');
const empresaInput = document.getElementById('empresa');
const cidadeInput = document.getElementById('cidade');
const estadoInput = document.getElementById('estado');
const submitButton = document.getElementById('submit-button');
const radioComoEncontrou = document.querySelectorAll('input[name="encontrou"]');
var radioComoEncontrouMarcado = false;
submitButton.addEventListener('click', function(event) {
    let isValid = true;

    if (nameInput.value === '') {
        alert('Por favor, preencha o campo "Nome".');
        isValid = false;
    }

    if (whatsAppInput.value === '') {
        alert('Por favor, preencha o campo "WhatsApp".');
        isValid = false;
    }

    if (emailInput.value === '') {
        alert('Por favor, preencha o campo "E-mail".');
        isValid = false;
    } else if (!isValidEmail(emailInput.value)) {
        alert('Por favor, insira um endereço de e-mail válido.');
        isValid = false;
    }

    if (empresaInput.value === '') {
        alert('Por favor, preencha o campo "Empresa".');
        isValid = false;
    }

    if (cidadeInput.value === '') {
        alert('Por favor, preencha o campo "Cidade".');
        isValid = false;
    }

    if (estadoInput.value === '') {
        alert('Por favor, preencha o campo "Estado".');
        isValid = false;
    }

    for (var i = 0; i < radioComoEncontrou.length; i++) {
        if (radioComoEncontrou[i].checked) {
            radioComoEncontrouMarcado = true;
            break;
        }
    }

    if (!radioComoEncontrouMarcado) {
        event.preventDefault();
        alert('Por favor, selecione como você nos encontrou.');
    }

    if (!isValid) {
        event.preventDefault();
    } else {
        form.action = 'formulario-sendEmail.php';
        window.location.href = 'agradecimento.html';

    }
});

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
const form = document.getElementById('contact-form');
const nameInput = document.getElementById('nome');
const emailInput = document.getElementById('email');
const whatsAppInput = document.getElementById('whatsapp');
const empresaInput = document.getElementById('empresa');
const cidadeInput = document.getElementById('cidade');
const estadoInput = document.getElementById('estado');
const submitButton = document.getElementById('submit-button');
const radioComoEncontrou = document.querySelectorAll('input[name="encontrou"]');
let radioComoEncontrouMarcado = false;
let projetoInput = document.getElementById('projeto');
let projetoError = document.getElementById('projeto-error');
let projetoValue = projetoInput.value;
let radioEmpresaFazVende = document.querySelectorAll('input[name="categoria"]');
let radioEmpresaFazVendeMarcado = false;
let categoriaError = document.getElementById('categoria-error');
let radioTamanhoEmpresa = document.querySelectorAll('input[name="empresa"]');
let radioTamanhoEmpresaMarcado = false;
let empresaError = document.getElementById('empresa-error');
let checkItens = document.querySelectorAll('input[name="itens[]"]');
let checkItensMarcado = false;
let itensError = document.getElementById('itens-error');

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

    for (let i = 0; i < radioComoEncontrou.length; i++) {
        if (radioComoEncontrou[i].checked) {
            radioComoEncontrouMarcado = true;
            break;
        }
    }

    if (!radioComoEncontrouMarcado) {
        event.preventDefault();
        alert('Por favor, selecione como você nos encontrou.');
    }

    if (projetoValue === '') {
        event.preventDefault();
        projetoInput.classList.add('error');
        projetoError.textContent = 'Por favor, preencha este campo.';
    } else {
        projetoInput.classList.remove('error');
        projetoError.textContent = '';
    }

    for (let i = 0; i < radioEmpresaFazVende.length; i++) {
        if (radioEmpresaFazVende[i].checked) {
            radioEmpresaFazVendeMarcado = true;
            break;
        }
    }

    if (!radioEmpresaFazVendeMarcado) {
        event.preventDefault();
        categoriaError.textContent = 'Por favor, selecione uma categoria.';
    } else {
        categoriaError.textContent = '';
    }

    for (let i = 0; i < radioTamanhoEmpresa.length; i++) {
        if (radioTamanhoEmpresa[i].checked) {
            radioTamanhoEmpresaMarcado = true;
            break;
        }
    }

    if (!radioTamanhoEmpresaMarcado) {
        event.preventDefault();
        empresaError.textContent = 'Por favor, selecione o porte da empresa.';
    } else {
        empresaError.textContent = '';
    }

    for (let i = 0; i < checkItens.length; i++) {
        if (checkItens[i].checked) {
            checkItensMarcado = true;
            break;
        }
    }

    if (!checkItensMarcado) {
        event.preventDefault();
        itensError.textContent = 'Por favor, selecione pelo menos um item.';
    } else {
        itensError.textContent = '';
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
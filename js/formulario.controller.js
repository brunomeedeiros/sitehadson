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

submitButton.addEventListener('click', function (event) {
    event.preventDefault();
    let isValid = true;

    if (nameInput.value === '') {
        alert('Por favor, preencha o campo "Nome".');
        return;
    }

    if (emailInput.value === '') {
        alert('Por favor, preencha o campo "E-mail".');
        return;
    } else if (!isValidEmail(emailInput.value)) {
        alert('Por favor, insira um endereço de e-mail válido.');
        return;
    }

    if (whatsAppInput.value === '') {
        alert('Por favor, preencha o campo "WhatsApp".');
        return;
    }

    if (empresaInput.value === '') {
        alert('Por favor, preencha o campo "Empresa".');
        return;
    }

    if (cidadeInput.value === '') {
        alert('Por favor, preencha o campo "Cidade".');
        return;
    }

    if (estadoInput.value === '') {
        alert('Por favor, preencha o campo "Estado".');
        return;
    }

    for (let i = 0; i < radioComoEncontrou.length; i++) {
        if (radioComoEncontrou[i].checked) {
            radioComoEncontrouMarcado = true;
            break;
        }
    }

    if (!radioComoEncontrouMarcado) {
        alert('Por favor, selecione como você nos encontrou.');
        return;
    }

    if (projetoValue === '') {
        projetoInput.classList.add('error');
        projetoError.textContent = 'Por favor, preencha este campo.';
        return;
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
        categoriaError.textContent = 'Por favor, selecione uma categoria.';
        return;
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
        empresaError.textContent = 'Por favor, selecione o porte da empresa.';
        return;
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
        itensError.textContent = 'Por favor, selecione pelo menos um item.';
        return;
    } else {
        itensError.textContent = '';
    }

    if (isValid) {
        const formData = new FormData(form);

        fetch('./api/send-email.php', {
            method: 'POST',
            body: formData
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (data.success) {
                    window.location.href = './agradecimento.html';
                } else {
                    alert(data.message || 'Erro ao enviar o formulário. Por favor, tente novamente.');
                }
            })
            .catch(error => {
                console.error('Erro:', error);
                alert('Erro ao enviar o formulário. Por favor, tente novamente.');
            });
    }
});

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
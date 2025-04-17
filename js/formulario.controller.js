const submitButton = document.getElementById('submit-button');


submitButton.addEventListener('click', function (event) {
    const nameInput = document.getElementById('nome');
    const emailInput = document.getElementById('email');
    const whatsAppInput = document.getElementById('whatsapp');
    const empresaInput = document.getElementById('empresa');
    const cidadeInput = document.getElementById('cidade');
    const estadoInput = document.getElementById('estado');
    const siteInput = document.getElementById('site');
    const instagramInput = document.getElementById('instagram');
    const encontrouRadio = document.querySelector('input[name="encontrou"]:checked');
    const porquePrecisaDoProjetoInput = document.getElementById('projeto');
    const categoriaRadio = document.querySelector('input[name="categoria"]:checked');
    const porteRadio = document.querySelector('input[name="porte"]:checked');
    const checkboxesSelecionados = document.querySelectorAll('input[name="itens[]"]:checked');
    const listaDeItens = Array.from(checkboxesSelecionados).map(checkbox => checkbox.value);
    const infosAdicionaisInput = document.getElementById('informacoes-adicionais');

    const radioComoEncontrou = document.querySelectorAll('input[name="encontrou"]');
    let radioComoEncontrouMarcado = false;
    let projetoInput = document.getElementById('projeto');
    let projetoError = document.getElementById('projeto-error');
    let projetoValue = projetoInput.value;
    let radioEmpresaFazVende = document.querySelectorAll('input[name="categoria"]');
    let radioEmpresaFazVendeMarcado = false;
    let categoriaError = document.getElementById('categoria-error');
    let radioTamanhoEmpresa = document.querySelectorAll('input[name="porte"]');
    let radioTamanhoEmpresaMarcado = false;
    let empresaError = document.getElementById('empresa-error');
    let checkItens = document.querySelectorAll('input[name="itens[]"]');
    let checkItensMarcado = false;
    let itensError = document.getElementById('itens-error');



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
        let formulario = {
            nome: nameInput.value,
            email: emailInput.value,
            whatsApp: whatsAppInput.value,
            empresa: empresaInput.value,
            cidade: cidadeInput.value,
            estado: estadoInput.value,
            site: siteInput.value,
            instagram : instagramInput.value,
            encontrouSelecionado: encontrouRadio.value,
            porquePrecisaProjeto: porquePrecisaDoProjetoInput.value,
            categoriaEmpresa: categoriaRadio.value,
            porte: porteRadio.value,
            itensParaProjeto: listaDeItens,
            infosAdicionais: infosAdicionaisInput.value,
        };

        console.log(JSON.stringify(formulario));

        fetch('/api/send-email.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Adiciona o cabeçalho para JSON
            },
            body: JSON.stringify(formulario), // Converte o formulário para JSON
            signal: AbortSignal.timeout(30000)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                if (data.success) {
                    window.location.href = './agradecimento.html';
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
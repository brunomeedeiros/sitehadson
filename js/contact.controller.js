const contactForm = document.querySelector('#contact form');
const submitButton = document.querySelector('#button-white-send-contact');

submitButton.addEventListener('click', function (event) {
    event.preventDefault();

    const formData = new FormData(contactForm);

    // Validação básica
    if (!formData.get('nome')) {
        alert('Por favor, preencha o campo "Nome".');
        return;
    }

    if (!formData.get('email')) {
        alert('Por favor, preencha o campo "E-mail".');
        return;
    }

    if (!isValidEmail(formData.get('email'))) {
        alert('Por favor, insira um endereço de e-mail válido.');
        return;
    }

    if (!formData.get('celular')) {
        alert('Por favor, preencha o campo "Celular".');
        return;
    }

    if (!formData.get('mensagem')) {
        alert('Por favor, preencha o campo "Mensagem".');
        return;
    }

    // Envia o formulário
    fetch('../php/contact-sendEmail.php', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Mensagem enviada com sucesso!');
                contactForm.reset();
            } else {
                alert('Erro ao enviar a mensagem. Por favor, tente novamente.');
            }
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Erro ao enviar a mensagem. Por favor, tente novamente.');
        });
});

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
} 
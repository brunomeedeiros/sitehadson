document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Mostra o indicador de carregamento
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Enviando...';
        submitButton.disabled = true;

        // Cria o objeto FormData com os dados do formulário
        const formData = new FormData(form);

        // Envia os dados para a API
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
            })
            .finally(() => {
                // Restaura o botão
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            });
    });
}); 
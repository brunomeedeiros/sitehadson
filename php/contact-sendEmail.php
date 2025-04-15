<?php
header('Content-Type: application/json');

// Ativa exibição de erros para debug
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Verifica se é uma requisição POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        // Defina o destinatário e o remetente
        $destino = "brunos.hgm@gmail.com";
        $from = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);

        if (!filter_var($from, FILTER_VALIDATE_EMAIL)) {
            throw new Exception('Email inválido');
        }

        // Defina o assunto
        $assunto = "Novo contato do site";

        // Defina o corpo da mensagem
        $menssagem = "Nome: " . filter_var($_POST['nome'], FILTER_SANITIZE_STRING) . "\r\n";
        $menssagem .= "Email: " . $from . "\r\n";
        $menssagem .= "Celular: " . filter_var($_POST['celular'], FILTER_SANITIZE_STRING) . "\r\n";
        $menssagem .= "Mensagem: " . filter_var($_POST['mensagem'], FILTER_SANITIZE_STRING) . "\r\n";

        // Defina os cabeçalhos da mensagem
        $headers = "From: $from \r\n";
        $headers .= "Reply-To: $from \r\n";
        $headers .= "MIME-Version: 1.0\r\n";
        $headers .= "Content-type: text/plain; charset=UTF-8\r\n";

        // Envie o email
        $enviaremail = mail($destino, $assunto, $menssagem, $headers);

        if ($enviaremail) {
            echo json_encode([
                'success' => true,
                'message' => 'Mensagem enviada com sucesso!'
            ]);
        } else {
            throw new Exception('Falha ao enviar mensagem');
        }
    } catch (Exception $e) {
        echo json_encode([
            'success' => false,
            'message' => 'ERRO AO ENVIAR MENSAGEM: ' . $e->getMessage()
        ]);
    }
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Método de requisição inválido'
    ]);
}
?>
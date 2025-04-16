<?php
header('Content-Type: application/json');
require_once __DIR__ . '/../includes/functions.php';


use PHPMailer\PHPMailer\Exception;
use HadsonSendMail\SendMail;

try {
    // Verifica se é uma requisição POST
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        throw new Exception('Método não permitido');
    }

    // Sanitiza os dados do formulário
    $formData = SendMail\sanitizeFormData($_POST);

    // Configura o PHPMailer
    $mail = SendMail\setupPHPMailer();

    // Configura o conteúdo do email
    $mail->isHTML(true);
    $mail->Subject = 'Nova solicitação de orçamento';
    $mail->Body = SendMail\generateEmailBody($formData);
    $mail->AltBody = strip_tags(SendMail\generateEmailBody($formData));

    // Envia o email
    if ($mail->send()) {
        echo json_encode([
            'success' => true,
            'message' => 'E-MAIL ENVIADO COM SUCESSO!'
        ]);
    } else {
        throw new Exception('Falha ao enviar email');
    }
} catch (Exception $e) {
    error_log("Erro PHPMailer: " . $e->getMessage());
    echo json_encode([
        'success' => false,
        'message' => 'ERRO AO ENVIAR E-MAIL: ' . $e->getMessage(),
        'debug_info' => [
            'openssl_version' => OPENSSL_VERSION_TEXT,
            'php_version' => PHP_VERSION,
            'extensions' => get_loaded_extensions()
        ]
    ]);
}
?>
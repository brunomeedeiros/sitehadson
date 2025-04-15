<?php
header('Content-Type: application/json');

require_once 'src/PHPMailer.php';
require_once 'src/SMTP.php';
require_once 'src/Exception.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

try {
    $mail = new PHPMailer(true);

    // Configurações do servidor SMTP
    $mail->SMTPDebug = SMTP::DEBUG_SERVER;
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'contato.thehadson@gmail.com';
    $mail->Password = 'yfac rxvs zhxd jrdi';
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;
    $mail->CharSet = 'UTF-8';

    // Configurações do e-mail
    $mail->setFrom('contato.thehadson@gmail.com', 'Hadson Design');
    $mail->addAddress('brunos.hgm@gmail.com');

    // Formatação do e-mail
    $mail->isHTML(true);
    $mail->Subject = 'Nova solicitação de orçamento';

    // Corpo do e-mail com as informações do formulário
    $mensagem = "
    <h2>Nova solicitação de orçamento</h2>
    <p><strong>Nome:</strong> " . filter_var($_POST['nome'], FILTER_SANITIZE_STRING) . "</p>
    <p><strong>Email:</strong> " . filter_var($_POST['email'], FILTER_SANITIZE_EMAIL) . "</p>
    <p><strong>WhatsApp:</strong> " . filter_var($_POST['whatsapp'], FILTER_SANITIZE_STRING) . "</p>
    <p><strong>Empresa:</strong> " . filter_var($_POST['empresa'], FILTER_SANITIZE_STRING) . "</p>
    <p><strong>Cidade:</strong> " . filter_var($_POST['cidade'], FILTER_SANITIZE_STRING) . "</p>
    <p><strong>Estado:</strong> " . filter_var($_POST['estado'], FILTER_SANITIZE_STRING) . "</p>
    <p><strong>Site:</strong> " . filter_var($_POST['site'], FILTER_SANITIZE_STRING) . "</p>
    <p><strong>Instagram:</strong> " . filter_var($_POST['instagram'], FILTER_SANITIZE_STRING) . "</p>
    <p><strong>Como me encontrou:</strong> " . filter_var($_POST['encontrou'], FILTER_SANITIZE_STRING) . "</p>
    <p><strong>Por que precisa desse projeto? O que espera?:</strong><br>" . nl2br(filter_var($_POST['projeto'], FILTER_SANITIZE_STRING)) . "</p>
    <p><strong>O que sua empresa faz/vende:</strong> " . filter_var($_POST['categoria'], FILTER_SANITIZE_STRING) . "</p>
    <p><strong>Tamanho da empresa:</strong> " . filter_var($_POST['empresa'], FILTER_SANITIZE_STRING) . "</p>

    <p><strong>Informações adicionais:</strong><br>" . nl2br(filter_var($_POST['informacoes-adicionais'], FILTER_SANITIZE_STRING)) . "</p>";

    $mail->Body = $mensagem;
    $mail->AltBody = strip_tags($mensagem);

    if ($mail->send()) {
        echo json_encode([
            'success' => true,
            'message' => 'E-MAIL ENVIADO COM SUCESSO!'
        ]);
    } else {
        throw new Exception('Falha ao enviar email');
    }
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => 'ERRO AO ENVIAR E-MAIL: ' . $e->getMessage()
    ]);
}

?>
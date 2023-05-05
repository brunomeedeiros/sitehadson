<?php

if(isset($_POST['enviar'])) {

    // Defina o destinatário e o remetente
    $to = "seuemail@seudominio.com";
    $from = $_POST['email'];

    // Defina o assunto
    $subject = "Novo formulário enviado do site";

    // Defina o corpo da mensagem
    $message = "Nome: " . $_POST['nome'] . "\r\n";
    $message .= "Email: " . $_POST['email'] . "\r\n";
    $message .= "WhatsApp: " . $_POST['whatsapp'] . "\r\n";
    $message .= "Empresa: " . $_POST['empresa'] . "\r\n";
    $message .= "Cidade: " . $_POST['cidade'] . "\r\n";
    $message .= "Estado: " . $_POST['estado'] . "\r\n";
    $message .= "Site: " . $_POST['site'] . "\r\n";
    $message .= "Instagram: " . $_POST['instagram'] . "\r\n";
    $message .= "Como me encontrou?: " . $_POST['encontrou'] . "\r\n";
    $message .= "Por que precisa desse projeto? O que espera?: " . $_POST['projeto'] . "\r\n";
    $message .= "O que sua empresa faz/vende?: " . $_POST['categoria'] . "\r\n";
    $message .= "Tamanho da empresa: " . $_POST['tamanho'] . "\r\n";
    $message .= "Itens necessários: " . implode(", ", $_POST['itens']) . "\r\n";

    // Defina os cabeçalhos da mensagem
    $headers = "From: $from \r\n";
    $headers .= "Reply-To: $from \r\n";
    $headers .= "CC: outroemail@seudominio.com \r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-type: text/plain; charset=UTF-8\r\n";

    // Envie o email
    mail($to, $subject, $message, $headers);

    // Exiba uma mensagem de sucesso
    echo "<p>Obrigado por entrar em contato!</p>";

}
?>

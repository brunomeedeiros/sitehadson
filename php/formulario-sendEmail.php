<?php

if(isset($_POST['submit'])) {

    // Defina o destinatário e o remetente
//    $to = "hadsondesigner@gmail.com";
    $destino = "brunos.hgm@gmail.com";
    $from = $_POST['email'];

    // Defina o assunto
    $assunto = "Novo formulário do site";

    // Defina o corpo da mensagem
    $menssagem = "Nome: " . $_POST['nome'] . "\r\n";
    $menssagem .= "Email: " . $_POST['email'] . "\r\n";
    $menssagem .= "WhatsApp: " . $_POST['whatsapp'] . "\r\n";
    $menssagem .= "Empresa: " . $_POST['empresa'] . "\r\n";
    $menssagem .= "Cidade: " . $_POST['cidade'] . "\r\n";
    $menssagem .= "Estado: " . $_POST['estado'] . "\r\n";
    $menssagem .= "Site: " . $_POST['site'] . "\r\n";
    $menssagem .= "Instagram: " . $_POST['instagram'] . "\r\n";
    $menssagem .= "Como me encontrou?: " . $_POST['encontrou'] . "\r\n";
    $menssagem .= "Por que precisa desse projeto? O que espera?: " . $_POST['projeto'] . "\r\n";
    $menssagem .= "O que sua empresa faz/vende?: " . $_POST['categoria'] . "\r\n";
    $menssagem .= "Tamanho da empresa: " . $_POST['tamanho'] . "\r\n";
    $menssagem .= "Itens necessários: " . implode(", ", $_POST['itens']) . "\r\n";

    // Defina os cabeçalhos da mensagem
    $headers = "From: $from \r\n";
    $headers .= "Reply-To: $from \r\n";
    $headers .= "CC: outroemail@seudominio.com \r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-type: text/plain; charset=UTF-8\r\n";

    // Envie o email
    $enviaremail = mail($destino, $assunto, $menssagem, $headers);

    // Exiba uma mensagem de sucesso
    echo "<p>Obrigado por entrar em contato!</p>";


    if($enviaremail){
        $mgm = "E-MAIL ENVIADO COM SUCESSO! <br> O link será enviado para o e-mail fornecido no formulário";
        echo " <meta http-equiv='refresh' content='2;URL=agradecimento.html'>";
    } else {
        $mgm = "ERRO AO ENVIAR E-MAIL!";
        echo "";
    }

}
?>

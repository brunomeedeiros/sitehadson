<?php
/**
 * Funções auxiliares para o site
 */

/**
 * Sanitiza e valida os dados do formulário
 * @param array $data Dados do formulário
 * @return array Dados sanitizados
 */
function sanitizeFormData($data)
{
    $sanitized = [];
    foreach ($data as $key => $value) {
        if (is_string($value)) {
            $sanitized[$key] = filter_var($value, FILTER_SANITIZE_STRING);
        } elseif ($key === 'email') {
            $sanitized[$key] = filter_var($value, FILTER_SANITIZE_EMAIL);
        } else {
            $sanitized[$key] = $value;
        }
    }
    return $sanitized;
}

/**
 * Gera o corpo do email com os dados do formulário
 * @param array $data Dados sanitizados do formulário
 * @return string Corpo do email em HTML
 */
function generateEmailBody($data)
{
    return "
    <h2>📋 Nova solicitação de orçamento</h2>
    <p><strong>👤 Nome:</strong> {$data['nome']}</p>
    <p><strong>📧 Email:</strong> {$data['email']}</p>
    <p><strong>📱 WhatsApp:</strong> {$data['whatsapp']}</p>
    <p><strong>🏢 Empresa:</strong> {$data['empresa']}</p>
    <p><strong>📍 Cidade:</strong> {$data['cidade']}</p>
    <p><strong>🌎 Estado:</strong> {$data['estado']}</p>
    <p><strong>🌐 Site:</strong> {$data['site']}</p>
    <p><strong>📸 Instagram:</strong> {$data['instagram']}</p>
    <p><strong>🔍 Como me encontrou:</strong> {$data['encontrou']}</p>
    <p><strong>💡 Por que precisa desse projeto? O que espera?:</strong><br>" . nl2br($data['projeto']) . "</p>
    <p><strong>🏭 O que sua empresa faz/vende:</strong> {$data['categoria']}</p>
    <p><strong>📊 Tamanho da empresa:</strong> {$data['empresa']}</p>
    <p><strong>📝 Informações adicionais:</strong><br>" . nl2br($data['informacoes-adicionais']) . "</p>";
}

/**
 * Configura o PHPMailer com as configurações padrão
 * @return PHPMailer Instância configurada do PHPMailer
 */
function setupPHPMailer()
{
    $mail = new PHPMailer(true);

    // Configurações do servidor SMTP
    $mail->SMTPDebug = SMTP::DEBUG_SERVER;
    $mail->Debugoutput = function ($str, $level) {
        error_log("PHPMailer Debug: $str");
    };
    $mail->isSMTP();
    $mail->Host = SMTP_HOST;
    $mail->SMTPAuth = true;
    $mail->Username = SMTP_USERNAME;
    $mail->Password = SMTP_PASSWORD;
    $mail->SMTPSecure = SMTP_SECURE;
    $mail->Port = SMTP_PORT;
    $mail->CharSet = SMTP_CHARSET;

    // Configurações adicionais de segurança
    $mail->SMTPOptions = array(
        'ssl' => array(
            'verify_peer' => false,
            'verify_peer_name' => false,
            'allow_self_signed' => true
        )
    );

    // Configurações do e-mail
    $mail->setFrom(SMTP_FROM_EMAIL, SMTP_FROM_NAME);
    $mail->addAddress(SMTP_TO_EMAIL);

    return $mail;
}
?>
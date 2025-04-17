<?php
    namespace HadsonSendMail\SendMail;

    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\SMTP;

    require_once __DIR__ . '/../src/PHPMailer.php';
    require_once __DIR__ . '/../src/SMTP.php';



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
    // Lê os dados JSON da requisição
    $data = json_decode(file_get_contents('php://input'), true);

    if (!$data) {
        die('Erro: Nenhum dado foi recebido!');
    }

    var_dump($data); // Para depurar e ver o conteúdo dos dados

    // Verifique se o valor não é nulo antes de passar para nl2br()
    $projeto = isset($data['porquePrecisaProjeto']) ? nl2br($data['porquePrecisaProjeto']) : '';
    $informacoesAdicionais = isset($data['infosAdicionais']) ? nl2br($data['infosAdicionais']) : '';
    // Exibe os itens para o projeto
    $itensParaProjeto = isset($data['itensParaProjeto']) && is_array($data['itensParaProjeto']) ? implode('<br>', $data['itensParaProjeto']) : 'Nenhum item selecionado';

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
    <p><strong>🔍 Como me encontrou:</strong> {$data['encontrouSelecionado']}</p>
    <p><strong>💡 Por que precisa desse projeto? O que espera?:</strong><br>{$projeto}</p>
    <p><strong>🏭 O que sua empresa faz/vende:</strong> {$data['categoriaEmpresa']}</p>
    <p><strong>📊 Tamanho da empresa:</strong> {$data['porte']}</p>
    <p><strong>📝 Informações adicionais:</strong><br>{$informacoesAdicionais}</p>
    <p><strong>🛠️ Itens para o projeto:</strong><br>{$itensParaProjeto}</p>";

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
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'contato.thehadson@gmail.com';
    $mail->Password = 'yfac rxvs zhxd jrdi';
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;
    $mail->CharSet = 'UTF-8';

    // Configurações adicionais de segurança
    $mail->SMTPOptions = array(
        'ssl' => array(
            'verify_peer' => false,
            'verify_peer_name' => false,
            'allow_self_signed' => true
        )
    );

    // Configurações do e-mail
    $mail->setFrom('contato.thehadson@gmail.com', 'Hadson Design');
    $mail->addAddress('brunos.hgm@gmail.com');

    return $mail;
}
?>
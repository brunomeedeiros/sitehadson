# Site Hadson Design

Site profissional para Hadson Design, desenvolvido com HTML, CSS, JavaScript e PHP.

## Estrutura do Projeto

```
sitehadson/
├── api/                    # Endpoints da API
│   └── send-email.php     # Processamento de envio de email
├── config/                # Arquivos de configuração
│   └── credentials.php    # Credenciais e configurações sensíveis
├── css/                   # Arquivos de estilo
├── images/               # Imagens do site
├── includes/             # Funções e utilitários PHP
│   └── functions.php     # Funções auxiliares
├── js/                   # Scripts JavaScript
├── src/                  # Bibliotecas de terceiros
│   └── PHPMailer/       # Biblioteca PHPMailer
└── index.html           # Página principal
```

## Requisitos

- PHP 7.4 ou superior
- Servidor web (Apache/Nginx)
- Extensão OpenSSL do PHP habilitada
- Conta Gmail com autenticação de duas etapas para envio de emails

## Configuração

1. Clone o repositório
2. Configure seu servidor web para apontar para a pasta do projeto
3. Copie o arquivo `config/credentials.php.example` para `config/credentials.php`
4. Edite o arquivo `config/credentials.php` com suas credenciais
5. Certifique-se que as permissões dos arquivos estão corretas

## Segurança

- O arquivo `credentials.php` contém informações sensíveis e não deve ser compartilhado
- Todas as credenciais são armazenadas em variáveis de ambiente
- O arquivo `.gitignore` está configurado para ignorar arquivos sensíveis

## Desenvolvimento

Para desenvolvimento local:
1. Instale um servidor local (XAMPP, WAMP, etc.)
2. Configure o virtual host para o projeto
3. Certifique-se que o PHP está configurado corretamente
4. Teste o envio de emails localmente

## Manutenção

- Mantenha as bibliotecas atualizadas
- Monitore os logs de erro do PHP
- Faça backup regular dos arquivos de configuração 
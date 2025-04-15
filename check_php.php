<?php
echo "Verificando configurações do PHP:\n\n";
echo "OpenSSL instalado: " . (extension_loaded('openssl') ? 'Sim' : 'Não') . "\n";
echo "Versão do OpenSSL: " . OPENSSL_VERSION_TEXT . "\n\n";
echo "Extensões carregadas:\n";
print_r(get_loaded_extensions());
?>
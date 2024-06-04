# Firebase Cloud Messaging (FCM) Notification Sender

Este projeto permite o envio de notificações push utilizando Firebase Cloud Messaging (FCM) e Node.js. O projeto inclui uma interface web para o envio de notificações, bem como um servidor Node.js que gerencia os tokens de dispositivo e envia as notificações.

## Pré-requisitos

- Node.js (versão 14 ou superior)
- MySQL
- Conta no Firebase e projeto configurado

## Configuração

### 1. Clone o Repositório

```
git clone https://github.com/seu-usuario/fcm-notification-sender.git
cd fcm-notification-sender
```

### 2. Instale as Dependências
```
npm install
```

### 3. Configuração do Firebase
Crie um arquivo serviceAccountKey.json na raiz do projeto e adicione suas credenciais de serviço do Firebase. Você pode obter este arquivo no console do Firebase, em Configurações do Projeto > Contas de Serviço.

### 4. Configuração do Banco de Dados MySQL
- Crie um banco de dados MySQL e uma tabela para armazenar os tokens dos dispositivos conforme o arquivo "mysql.sql"
- Atualize as configurações do banco de dados no arquivo index.js:

### 5. Inicie o Servidor
```
node index.js
```
O servidor estará disponível em http://localhost:3000.

## Uso
Interface Web
Acesse http://localhost:3000 no seu navegador.
<br>
Registre o token do dispositivo. O token será salvo automaticamente no banco de dados MySQL.
<br>
Utilize o formulário para enviar notificações push. Selecione o token de dispositivo desejado na lista de tokens disponíveis.
## Arquitetura do Projeto
- index.js: Servidor Node.js configurado com Express e MySQL.
- index.html: Página web com a interface para envio de notificações.
- index.js (público): Script JavaScript que gerencia a interação com o Firebase e o envio de notificações.
- firebase-messaging-sw.js: Service worker do Firebase para recebimento de notificações.
## Dependências
- express: Framework web para Node.js. ```npm install express```
- mysql: Cliente MySQL para Node.js. ```npm install mysql```
- firebase-admin: SDK do Firebase Admin para Node.js. ```npm install firebase-admin```
- firebase: SDK do Firebase para JavaScript.
- body-parser: Middleware para parsing de corpos de requisições.

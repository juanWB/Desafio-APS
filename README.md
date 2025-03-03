# Desafio-APS

O **Desafio APS** é um sistema CRUD para gerenciamento de clientes. Na tela principal, os clientes cadastrados são listados, e uma mensagem é exibida caso não haja registros. O sistema permite cadastrar, atualizar, excluir e visualizar clientes.

Para otimizar o preenchimento de dados, o sistema integra duas APIs:

- **API da ReceitaWS**: Consulta CNPJs online e preenche automaticamente os campos ao informar um CNPJ válido.
- **API de CEP**: Busca endereços a partir de um CEP válido e preenche os campos correspondentes.

Com essas funcionalidades, o Desafio APS torna o gerenciamento de clientes mais ágil e eficiente.

# 🛠️ Tecnologias Utilizadas

- **Frontend**:
  - React
  - Styled Components
  - Axios (para requisições HTTP)

- **Backend**:
  - Node.js
  - Express
  - TypeScript
  - Axios (para integração com APIs externas)
  - Nodemon (para execução constante do programa)
  - Zod (para validação de dados)
  - Cors
  - mysql2 (para conexão com MySql)
  
- **Banco de Dados**:
  - Mysql (Banco de dados relacional)
  - Wampserver (para servidor local)
  
- **APIs Externas**:
  - ReceitaWS (para consulta de CNPJ)
  - ViaCEP (para consulta de CEP)

- **Ferramentas**:
  - Git (controle de versão)
  - Postman (testes de API)

## Como Rodar o Projeto

### Backend (Node.js + Express)

1. Clone este repositório.
2. Navegue até a pasta `backend` no terminal.
3. Instale as dependências:

    ```bash
    npm install
    ```

4. Configure seu banco de dados MySQL local no Wampserver.

### Frontend (React)

1. Navegue até a pasta `frontend`.
2. Instale as dependências:

    ```bash
    npm install
    ```

3. Inicie o servidor de desenvolvimento:

    ```bash
    npm start
    ```

4. Navegue novamente até a pasta raiz e no terminal insira:

  ```bash
  npm start
   ```

Acesse a aplicação em [http://localhost:3000](http://localhost:3000).




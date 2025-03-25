# Projeto de Testes Automatizados - Cadastro de Deliver

## Introdução
Este projeto foi desenvolvido com o objetivo de realizar testes automatizados no fluxo de cadastro de entregadores no site [Burger Eats](https://buger-eats-qa.vercel.app/deliver). Durante os testes, foi utilizado um mock para interceptar requisições ao serviço de CEP [ViaCEP](https://viacep.com.br), garantindo maior controle e previsibilidade nos testes.
Durante os testes, a requisição de busca de CEP é interceptada e substituída por um mock, permitindo testar o fluxo de cadastro sem depender de respostas reais da API externa.

<img src="https://github.com/carolprotasio/qacademy/blob/main/cypress/fixtures/images/homepage.png" alt="web" width="600"/>
<img src="https://github.com/carolprotasio/qacademy/blob/main/cypress/fixtures/images/cadstro.png" alt="web" width="600"/>

## Tecnologias Utilizadas
- **[Cypress](https://www.cypress.io/):** Framework de testes end-to-end.
- **JavaScript:** Linguagem utilizada para escrever os testes.
- **[Cypress File Upload](https://www.npmjs.com/package/cypress-file-upload):** Plugin para simular upload de arquivos.
- **Node.js:** Ambiente de execução para o Cypress.
- **Mock de API:** Utilizado para interceptar e simular respostas da API do ViaCEP.

  Exemplo de código do mock:
```javascript
cy.fixture('mockcep').then(function(mockcep){
    cy.intercept('GET', 'https://viacep.com.br/ws/**', {
        statusCode: 200,
        body: mockcep
    }).as('mockCep')
})
```

## Cenários de Teste e casos de testes
### CT-001 - Cadastro de entregador com sucesso
- Preenche o formulário com dados válidos.
- Verifica se a mensagem de sucesso é exibida:  
  _"Recebemos os seus dados. Fique de olho na sua caixa de email, pois em breve retornamos o contato."_

### CT-002 - CPF inválido
- Preenche o formulário com um CPF inválido.
- Verifica se a mensagem de erro é exibida:  
  _"Oops! CPF inválido"_

### CT-003 - Email inválido
- Preenche o formulário com um email inválido.
- Verifica se a mensagem de erro é exibida:  
  _"Oops! Email com formato inválido."_

### CT-005 - Campos obrigatórios
- Submete o formulário sem preencher os campos obrigatórios.
- Verifica se as mensagens de erro são exibidas para cada campo:
  - _"É necessário informar o nome"_
  - _"É necessário informar o CPF"_
  - _"É necessário informar o email"_
  - _"É necessário informar o CEP"_
  - _"É necessário informar o número do endereço"_
  - _"Selecione o método de entrega"_
  - _"Adicione uma foto da sua CNH"_
 
<img src="https://github.com/carolprotasio/qacademy/blob/main/cypress/fixtures/images/ct_all_tests.png" alt="web" width="600"/>
 
## Como Instalar / Clonar
1. **Clone o repositório:**
   ```bash
   git clone https://github.com/carolprotasio/qacademy.git
2. **Instale as dependências:** Certifique-se de ter o Node.js instalado. Em seguida, execute:
   ```
   npm install
    ```

3. Abra o Cypress:
  ```
  npx cypress open
  ```
Execute os testes: Escolha o arquivo de teste signup.cy.js na interface do Cypress para rodar os testes.

Conclusão
Este projeto demonstra como utilizar o Cypress para criar testes automatizados robustos, com ênfase no uso de mocks para simular APIs externas. Essa abordagem garante que o fluxo de cadastro de entregadores funcione corretamente, mesmo em cenários de erro ou indisponibilidade de serviços externos.

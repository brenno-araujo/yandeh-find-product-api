##### Autor: [Brenno Araújo de Oliveira](https://www.linkedin.com/in/brennoaraujo/)
##### Criado em: 26 de maio de 2024

# Desafio Yandeh

Este é um projeto desenvolvido como parte do processo seletivo da Yandeh. 

### Como Rodar o Projeto

Para iniciar o projeto, você pode utilizar o Docker Compose. Certifique-se de ter o Docker instalado em sua máquina e, em seguida, execute o seguinte comando:

```bash
docker compose up
```

### Criar conexao com o websocket - testei com o postman
```bash
ws://0.0.0.0:3001
```

### Enviar json para o websocket para buscar por nome. O atributo count é opcional e serve para limitar a quantidade de itens retornados
```json
{
  "action": "product",
  "name": "ba",
  "count": 10
}

```

### Enviar json para o websocket para buscar por id
```json
{
  "action": "product",
  "id": 1
}

```

### Tecnologias Utilizadas
- Node.js
- TS
- Websocket
- MySQL
- Sequelize
- Docker
- Lambda - AWS

### Observações
- Ao executar o comando docker compose up, o projeto irá criar um container com o banco de dados MySQL e outro container com a aplicação Node.js. A aplicação irá criar a tabela products e irá inserir 2000 registros para testes. A aplicação irá rodar na porta 3001 e o banco de dados na porta 3306. 


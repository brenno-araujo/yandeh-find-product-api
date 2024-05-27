##### Autor: [Brenno Araújo de Oliveira](https://www.linkedin.com/in/brennoaraujo/)
##### Criado em: 26 de maio de 2024

# Desafio Yandeh

Este é um projeto desenvolvido como parte do processo seletivo da Yandeh. 

## Como Rodar o Projeto

Para iniciar o projeto, você pode utilizar o Docker Compose. Certifique-se de ter o Docker instalado em sua máquina e, em seguida, execute o seguinte comando:

```bash
docker compose up
```

# Criar conexao com o websocket - testei com o postman
```bash
ws://0.0.0.0:3001
```

# Enviar json para o websocket para buscar por nome
```json
{
  "action": "product",
  "name": "ba",
  "count": 10
}

```

# Enviar json para o websocket para buscar por id
```json
{
  "action": "product",
  "id": 1
}

```

docker system prune --all --volumes

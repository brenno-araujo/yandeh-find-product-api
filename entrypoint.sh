#!/bin/bash

# Função para aguardar o MySQL
wait_for_mysql() {
  echo "Aguardando o MySQL..."
  while ! echo 'SELECT 1' | nc mysql 3306 > /dev/null 2>&1; do
    sleep 1
  done
}

# Aguarda o MySQL ficar pronto
wait_for_mysql

# Executa as migrações do Sequelize
echo "Executando as migrações do Sequelize..."
npx sequelize db:migrate

# Executa os seeders do Sequelize
echo "Executando os seeders do Sequelize..."
npx sequelize db:seed:all

# Inicia o Serverless Offline
echo "Iniciando o Serverless Offline..."
serverless offline --host 0.0.0.0 --httpPort 3000 --websocketPort 3001

import { Sequelize } from 'sequelize-typescript';
import { Product } from '../entities/product.entity';

export class DatabaseService {
  private sequelize: Sequelize | null = null;

  constructor() {}

  async init() {
    if (this.sequelize === null) {
      try {
        this.sequelize = new Sequelize({
          database: process.env.DB_DATABASE || 'yandeh_db',
          dialect: 'mysql',
          username: process.env.DB_USERNAME || 'brenno_araujo_user',
          password: process.env.DB_PASSWORD || 'brenno_araujo_password',
          host: process.env.DB_HOST || '127.0.0.1',
          port: Number(process.env.DB_PORT) || 3306,
        });
        this.sequelize.addModels([
          Product,
        ]);
        await this.sequelize.sync();
      } catch (error: any) {
        console.error(error);
        throw new Error(error);
      }
      console.log('Conexão com o banco de dados estabelecida com sucesso.');
    } else {
      console.log('A conexão com o banco de dados já está iniciada.');
    }
  }

  async close() {
    if (this.sequelize !== null) {
      await this.sequelize.close();
      console.log('Conexão com o banco de dados encerrada.');
      this.sequelize = null;
    } else {
      console.log('A conexão com o banco de dados já está encerrada.');
    }
  }

  async getTransaction() {
    if (this.sequelize !== null) {
      return await this.sequelize.transaction();
    } else {
      throw new Error('A conexão com o banco de dados não foi iniciada.');
    }
  }
}

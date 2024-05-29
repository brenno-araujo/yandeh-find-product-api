
import { Op } from 'sequelize';
import { Product } from '../../entities/product.entity';

export class ProductRepository {
  private readonly product: typeof Product;
  
  constructor() {
    this.product = Product;
  }

  async findById(id: string): Promise<{ count: number; rows: Product[] }> {
    try {
      const product = await this.product.findByPk(id, { raw: true });
      return product ? { count: 1, rows: [product] } : { count: 0, rows: [] };
    } catch (error) {
      throw new Error('Erro ao buscar o produto');
    }
  }

  async findAllLikeName(name: string, count: number): Promise<{ count: number; rows: Product[] }> {
    try {
      const countLimit = count || 10;
      return await this.product.findAndCountAll({
        where: {
          name: {
            [Op.like]: `%${name}%`,
          },
        },
        limit: countLimit,
        raw: true,
      });
    } catch (error) {
      throw new Error('Erro ao buscar os produtos');
    }
  }

}

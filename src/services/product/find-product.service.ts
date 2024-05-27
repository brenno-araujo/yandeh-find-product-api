import { DatabaseService } from '../../database/database';
import { ProductRepository } from '../../repositories/product/product.repository';
import ApiProductExternalService from '../../external-services/api-product.external-service';
import * as AWS from 'aws-sdk';

interface Product {
  id: number;
  name: string;
  price: number;
  brand: string;
  imageUrl: string;
  stock?: number;
  available?: boolean;
  lastBuy?: string;
}

class FindProductService {
  private productRepository: ProductRepository;
  private apiProductService: ApiProductExternalService;
  private apigatewaymanagementapi: AWS.ApiGatewayManagementApi;
  private readonly databaseService: DatabaseService;

  constructor() {
    this.productRepository = new ProductRepository();
    this.apiProductService = new ApiProductExternalService();
    this.databaseService = new DatabaseService();

    const endpoint = process.env.IS_DOCKER === 'true' ? 'http://localhost:3001' : 'http://0.0.0.0:3001';

    // Configuração do SDK da AWS com credenciais fictícias
    AWS.config.update({
      credentials: new AWS.Credentials('fakeAccessKeyId', 'fakeSecretAccessKey'),
      region: 'sa-east-1', // Região fictícia
    });

    this.apigatewaymanagementapi = new AWS.ApiGatewayManagementApi({
      endpoint: endpoint,
    });
  }

  async execute(id: string, name: string, count: number, connectionId: string): Promise<void> {
    await this.databaseService.init();
    let products: { count: number; rows: Product[]}
    if (id) {
      products = await this.productRepository.findById(id);
    } else {
      products = await this.productRepository.findAllLikeName(name, count);
    }

    // Envie os produtos filtrados imediatamente
    await this.sendProductDataToClient(connectionId, products.rows);
    
    for (const product of products.rows) {
      const productId = product.id;
      // Inicie as consultas às APIs externas
      const stockPromise = this.apiProductService.checkStock(productId);
      const lastBuyPromise = this.apiProductService.checkLastBuy(productId);

      // Espere a conclusão das promessas
      try {
        const [stockData, lastBuyData] = await Promise.all([stockPromise, lastBuyPromise]);

        product.stock = stockData.stock;
        product.available = stockData.available;
        product.lastBuy = lastBuyData.lastBuy;
        // Envie as informações diretamente para o cliente
        await this.sendProductDataToClient(connectionId, product);
      } catch (error) {
        console.error('Error fetching product data:', error);
      } finally {
        await this.databaseService.close();
      }
    }
    // return productsFiltered;
  }

  private async sendProductDataToClient(connectionId: string, product: Product | Product[]): Promise<void> {
    console.log('Sending product data to client:', product);
    console.log('Connection ID:', connectionId);
    try {
      await this.apigatewaymanagementapi.postToConnection({ ConnectionId: connectionId, Data: JSON.stringify(product) }).promise();
      console.log(`Product data sent to client ${connectionId}:`, product);
    } catch (error) {
      console.error('Error sending data to client:', error);
    }
  }
}

export default FindProductService;

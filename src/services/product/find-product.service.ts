import ProductRepository from '../../repositories/product/product.repository';
import ApiProductExternalService from '../../external-services/api-product.external-service';
import * as AWS from 'aws-sdk';

interface Product {
  id: number;
  name: string;
  price: string;
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

  constructor() {
    this.productRepository = new ProductRepository();
    this.apiProductService = new ApiProductExternalService();

    const endpoint = 'http://0.0.0.0:3001';
    this.apigatewaymanagementapi = new AWS.ApiGatewayManagementApi({
      endpoint: endpoint,
    });
  }

  async execute(id: string, name: string, connectionId: string): Promise<void> {
    const products = await this.productRepository.generateFakeProducts() as Product[];
    let productsFiltered = [] as Product[];
      
    if (id) {
      productsFiltered = products.filter(product => product.id === Number(id));
    } else {
      productsFiltered = await this.productRepository.searchProducts(name);
    }

    // Envie os produtos filtrados imediatamente
    await this.sendProductDataToClient(connectionId, productsFiltered);
    
    for (const product of productsFiltered) {
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
        console.log('😒😒😒😒😒😒😒😒😒😒😒😒😒')
        // Envie as informações diretamente para o cliente
        await this.sendProductDataToClient(connectionId, product);
      } catch (error) {
        console.error('Error fetching product data:', error);
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

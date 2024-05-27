import FindProductService  from "../../services/product/find-product.service";

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

export class FindProductController {
  private readonly service: FindProductService;
  constructor() {
    this.service = new FindProductService();
  }

  async execute(id: string, name: string, connectionId: string): Promise<void> {
    try {
      await this.service.execute(id, name, connectionId);
    } catch (error: any) {
      console.error('@FindProductController - error: ', error);
      throw {
        statusCode: 400,
        message: error.message,
      }
    }
  }
}

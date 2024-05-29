import FindProductService  from "../../services/product/find-product.service";
export class FindProductController {
  private readonly service: FindProductService;
  constructor() {
    this.service = new FindProductService();
  }

  async execute(id: string, name: string, count: number, connectionId: string): Promise<void> {
    try {
      console.log('@FindProductController');
      await this.service.execute(id, name, count, connectionId);
    } catch (error: any) {
      console.error('@FindProductController - error: ', error);
      throw {
        statusCode: 400,
        message: error.message,
      }
    }
  }
}

class ApiProductExternalService {
    private token: string;
  
    constructor() {
      this.token = '340fcd8f-071c-4866-9a62-31a7c904eb26';
    }
  
    async checkStock(productId: number): Promise<{ stock: number; available: boolean }> {
      // Dados simulados de estoque
      const mockStockData = {
        stock: Math.floor(Math.random() * 100),
        available: Math.random() < 0.5,
      };
  
      // Simula um atraso de rede
      await this.delay(500);
  
      return mockStockData;
    }
  
    async checkLastBuy(productId: number): Promise<{ lastBuy: string }> {
      // Dados simulados de última compra
      const mockLastBuyData = {
        lastBuy: new Date(Date.now() - Math.floor(Math.random() * 1000000000)).toISOString(),
      };
  
      // Simula um atraso de rede
      await this.delay(500);
  
      return mockLastBuyData;
    }
  
    // Função para simular atraso
    private delay(ms: number): Promise<void> {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
  }
  
  export default ApiProductExternalService;
  
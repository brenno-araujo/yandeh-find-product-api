import axios from 'axios';

class ApiProductExternalService {
  private token: string;
  private baseUrl: string;

  constructor() {
    this.token = '340fcd8f-071c-4866-9a62-31a7c904eb26';
    this.baseUrl = 'https://gateway-smartforce-dev.devyandeh.com.br';
  }

  async checkStock(productId: number): Promise<{ stock: number; available: boolean }> {
    const url = `${this.baseUrl}/process/candidates/availability/${productId}`;
    try {
      const response = await axios.get(url, {
        headers: {
          token: this.token
        }
      });
      // Supondo que a resposta da API tenha a estrutura desejada
      const { quantity, available } = response.data;
      return { stock: quantity, available };
    } catch (error) {
      console.error('Error fetching stock data:', error);
      throw new Error('Error fetching stock data');
    }
  }

  async checkLastBuy(productId: number, clientId: number): Promise<{ lastBuy: string }> {
    const url = `${this.baseUrl}/process/candidates/lastbuy/${clientId}/${productId}`;
    try {
      const response = await axios.get(url, {
        headers: {
          token: this.token
        }
      });
      // Supondo que a resposta da API tenha a estrutura desejada
      const { lastBuyDate } = response.data;
      return { lastBuy: lastBuyDate };
    } catch (error) {
      console.error('Error fetching last buy data:', error);
      throw new Error('Error fetching last buy data');
    }
  }
}

export default ApiProductExternalService;

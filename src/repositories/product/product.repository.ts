import { faker } from '@faker-js/faker';

interface Product {
  id: number;
  name: string;
  price: string;
  brand: string;
  imageUrl: string;
}

class ProductRepository {
  constructor() {}

  async generateFakeProducts(): Promise<Product[]> {
    // Função para gerar produtos fictícios
    const products: Product[] = [];
    for (let i = 0; i < 2000; i++) {
      products.push({
        id: i + 1,
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        brand: faker.company.name(),
        imageUrl: faker.image.imageUrl(),
      });
    }
    console.log('Generated fake products:', products.length);
    return products;
  }

  async searchProducts(query: string): Promise<Product[]> {
    const products = await this.generateFakeProducts();
    // Filtra produtos que contêm a string de consulta no nome
    return products.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
  }
}

export default ProductRepository;

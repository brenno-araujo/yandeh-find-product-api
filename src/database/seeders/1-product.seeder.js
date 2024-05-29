'use strict';

const { faker } = require('@faker-js/faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const generateFakeProducts = () => {
      const products = [];
      for (let i = 0; i < 2000; i++) {
        products.push({
          name: faker.commerce.productName(),
          price: faker.commerce.price(),
          brand: faker.company.name(),
          image_url: faker.image.imageUrl(),
          created_at: new Date(),
          updated_at: new Date(),
          deleted_at: null,
        });
      }
      return products;
    };

    const fakeProducts = generateFakeProducts();
    await queryInterface.bulkInsert('products', fakeProducts, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('products', null, {});
  }
};

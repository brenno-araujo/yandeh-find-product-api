import { FindProductController } from '../../controllers/product/find-product.controller';
import * as AWS from 'aws-sdk';
import * as dotenv from 'dotenv';

dotenv.config();

// Configuração do SDK da AWS com credenciais fictícias e endpoint local
AWS.config.update({
  credentials: new AWS.Credentials('fakeAccessKeyId', 'fakeSecretAccessKey'),
  region: 'sa-east-1', // Região fictícia
});

const apigatewaymanagementapi = new AWS.ApiGatewayManagementApi({
  endpoint: 'http://localhost:3001', // Endpoint local do serverless-offline
});

const sendMessageToClient = async (connectionId: string, data: any) => {
  await apigatewaymanagementapi.postToConnection({ ConnectionId: connectionId, Data: JSON.stringify(data) }).promise();
};

export const handler = async (event: AWSLambda.APIGatewayEvent) => {
  console.info('WebSocket default event', event);

  const connectionId = event.requestContext.connectionId || '';
  try {
    const findProductController = new FindProductController();

    if (!event || !event.body) {
      console.error('Evento malformado:', event);
      return;
    }

    console.info('WebSocket default route - event.body: ', event.body);

    const { id = '', name = '' } = JSON.parse(event.body);

    console.info('Default route - idOrName: ', id || name);

    if (!id && !name) {
      throw new Error('You must provide an id or name to search for a product.');
    }

    await findProductController.execute(id, name, connectionId);
    await sendMessageToClient(connectionId, { message: 'Data sent.' });
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Data sent.',
      }),
    };
  } catch (error: any) {
    console.error('WebSocket default route error: ', error);
    await sendMessageToClient(connectionId, { message: error.message });
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: error.message,
      }),
    };
  }
};

// src/functions/websocket/disconnect.ts
export const handler = async (event: AWSLambda.APIGatewayEvent) => {
    console.log('WebSocket disconnect event', event);
    return {
      statusCode: 200,
      body: 'Disconnected.'
    };
  };
  
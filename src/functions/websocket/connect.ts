// src/functions/websocket/connect.ts
export const handler = async (event: AWSLambda.APIGatewayEvent) => {
    console.log('WebSocket connect event', event);
    return {
      statusCode: 200,
      body: 'Connected.'
    };
  };
  
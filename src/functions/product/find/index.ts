import { formatJSONResponse } from '../../../helpers/format-json-response';
import * as dotenv from 'dotenv';

export const handler = async (event: AWSLambda.APIGatewayEvent) => {
  console.info('@index - init');
  dotenv.config();
  try {
    return formatJSONResponse(200, { message: 'Hello from find product' });
  } catch (error: any) {
    console.error('@index - error: ', error);
    return formatJSONResponse(error.statusCode || 500, { message: error.message });
  }
}

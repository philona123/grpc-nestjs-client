import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const options: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'app',
    protoPath: join(__dirname, '../src/app.proto'),
  },
};

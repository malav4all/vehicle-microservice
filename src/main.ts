// main.ts
import { Eureka } from 'eureka-js-client';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const PORT = process.env.PORT || 7000;

  await app.listen(PORT);
  console.log(`Vehicle microservice is running on http://localhost:${PORT}`);

  // const client = new Eureka({
  //   instance: {
  //     app: 'vehicles-microservice',
  //     instanceId: `vehicles-microservice-${PORT}`,
  //     hostName: 'localhost',
  //     ipAddr: '127.0.0.1',
  //     port: { $: PORT, '@enabled': true },
  //     vipAddress: 'node-service',
  //     dataCenterInfo: {
  //       '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
  //       name: 'MyOwn',
  //     },
  //   },
  //   eureka: {
  //     host: 'localhost',
  //     port: 8761,
  //     servicePath: '/eureka/apps/',
  //     maxRetries: 5,
  //     requestRetryDelay: 2000,
  //     useDns: false,
  //   },
  // });

  // client.start((error) => {
  //   if (error) {
  //     console.error('Eureka registration failed:', error);
  //   } else {
  //     console.log('Eureka registration successful');
  //   }
  // });
}
bootstrap();
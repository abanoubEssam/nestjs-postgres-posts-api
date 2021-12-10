import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export class Swagger {
  static setup(app: NestExpressApplication) {
    const options = new DocumentBuilder()
      .setTitle('User Posts API')
      .setDescription('Decemper 2021')
      .setContact(
        'Abanoub Essam',
        'https://www.linkedin.com/in/abanoub-essam-1b4a31b7/',
        'abanoub.e.mhanna@gmail.com',
      )
      .addBearerAuth()
      .setVersion('1.0')
      .addServer('/api/v1')
      .build();

    const document = SwaggerModule.createDocument(app, options, {
      ignoreGlobalPrefix: true,
    });

    SwaggerModule.setup('/docs', app, document, {
      swaggerOptions: {
        displayRequestDuration: true,
      },
    });
  }
}

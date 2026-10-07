// Importa reflect-metadata.
// NestJS lo utiliza internamente para trabajar con decoradores
// como @Module(), @Controller(), @Get(), etc.
import 'reflect-metadata';

// Importa NestFactory.
// NestFactory se encarga de crear y arrancar la aplicación NestJS.
import { NestFactory } from '@nestjs/core';

// Importa las herramientas de Swagger.
// DocumentBuilder configura la documentación.
// SwaggerModule genera y publica Swagger.
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

// Importa el módulo principal de la aplicación.
import { AppModule } from './app.module';

// Función principal que inicia el backend.
// Es async porque algunas operaciones de arranque deben esperarse.
async function bootstrap() {

  // Crea la aplicación NestJS usando AppModule
  // como módulo principal.
  const app = await NestFactory.create(AppModule);

  // Configura la información que va a mostrar Swagger.
  const swaggerConfig = new DocumentBuilder()

    // Título de la documentación.
    .setTitle('Class 11 - HTTP Methods Demo')

    // Descripción de esta API.
    .setDescription('Simple Swagger demo for request/response and HTTP methods')

    // Versión de la API/documentación.
    .setVersion('1.0.0')

    // Finaliza la configuración y crea el objeto.
    .build();

  // Swagger analiza la aplicación NestJS y genera
  // un documento con los endpoints disponibles.
  const document = SwaggerModule.createDocument(app, swaggerConfig);

  // Publica Swagger en la ruta /api.
  // Por eso se puede abrir en:
  // http://localhost:5001/api
  SwaggerModule.setup('api', app, document);

  // Levanta el servidor y lo deja escuchando
  // solicitudes HTTP en el puerto 5001.
  await app.listen(5001);
}

// Ejecuta la función que inicia toda la aplicación.
bootstrap();
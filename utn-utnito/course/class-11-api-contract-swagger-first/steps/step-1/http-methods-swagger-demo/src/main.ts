import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

// Función principal que inicia el backend.
// Es async porque algunas operaciones de arranque deben esperarse.
async function bootstrap() {

  // Crea la aplicación NestJS usando AppModule como módulo principal.
  const app = await NestFactory.create(AppModule);

  // Configura la información que va a mostrar Swagger.
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Class 11 - HTTP Methods Demo')     // Título de la documentación.
    .setDescription('Simple Swagger demo for request/response and HTTP methods')     // Descripción de esta API.
    .setVersion('1.0.0')    // Versión de la API/documentación.
    .build();    // Finaliza la configuración y crea el objeto.
  const document = SwaggerModule.createDocument(app, swaggerConfig);   // Swagger analiza la aplicación NestJS y genera un documento con los endpoints disponibles.
  SwaggerModule.setup('api', app, document);  // Publica Swagger en la ruta /api.

  // Levanta el servidor y lo deja escuchando solicitudes HTTP en el puerto 5001.
  await app.listen(5001);

}

bootstrap(); // Ejecuta la función que inicia toda la aplicación.
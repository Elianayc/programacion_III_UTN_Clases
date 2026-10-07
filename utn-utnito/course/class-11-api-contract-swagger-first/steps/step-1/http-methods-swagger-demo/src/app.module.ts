// Importa el decorador Module de NestJS.
// Sirve para declarar que esta clase es un módulo de la aplicación.
import { Module } from '@nestjs/common';

// Importa el Controller donde están definidos
// los endpoints relacionados con demo-messages.
import { DemoMessagesController } from './demo-messages/demo-messages.controller';

// Declara este archivo como un módulo de NestJS.
@Module({
  // Registra los Controllers que pertenecen a este módulo.
  // NestJS va a revisar DemoMessagesController
  // y registrar los endpoints que encuentre allí.
  controllers: [DemoMessagesController],
})

// Clase que representa el módulo principal de la aplicación.
export class AppModule {}
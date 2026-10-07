// Importamos Component desde Angular.
// Permite crear componentes que tienen una vista y estilos propios.
import { Component } from '@angular/core';


// Configuración del componente Angular.
@Component({

  // Nombre del selector que identifica este componente.
  // Se usa como una etiqueta HTML: <app-root></app-root>
  selector: 'app-root',


  /*
    Cambio respecto al proyecto inicial:
    - Se reemplaza class-screen por hello-screen.
    - Se agrega una sección interna hello-card para agrupar el contenido.
    - Se agregan nuevas clases para separar los estilos del texto.
  */
  template: `
    <main class="hello-screen">
      <section class="hello-card">
        <p class="label">Programming III</p>
        <h1>Hello UTNito</h1>
        <p class="subtitle">
          Your Angular environment is working from VS Code Play/F5.
        </p>
      </section>
    </main>
  `,


  // Archivo CSS que contiene los estilos visuales del componente.
  styleUrls: ['./app.component.css'],


  // Indica que este componente no utiliza la modalidad standalone.
  standalone: false
})


// Clase del componente.
// Actualmente solo muestra contenido, no tiene lógica adicional.
export class AppComponent {}
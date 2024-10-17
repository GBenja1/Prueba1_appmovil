import { usuariosapi } from 'src/app/models/usuariosapi.models';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent{

  usuario="";
  clave="";
  nombre="";
  rol: string="alumno";
  click=false;


  errorMessage: string = ''; // Para mostrar mensajes de error (si el usuario ya existe)
  successMessage: string = '';

  private authService = inject(AuthService);
  private router = inject(Router);
  private alertController = inject(AlertController);

  registroFallido: boolean = false;
  isLoading: boolean = false;

  async validarUsuarioExistente(usuario: string): Promise<boolean> {
    try {
      this.isLoading = true;
      const usuariosExistentes = await this.authService.obtenerUsuarios();
      this.isLoading = false;
      return usuariosExistentes.some(u => u.user === usuario);
    } catch (error) {
      this.errorMessage = 'Error al validar el usuario';
      await this.mostrarAlerta('Error', 'Error al validar el usuario. Inténtalo de nuevo.');
      return true; // En caso de error, asumimos que el usuario existe para evitar fallos
    }
  }

  async registrar() {
    // Limpiar mensajes anteriores
    this.errorMessage = '';
    this.successMessage = '';
    this.registroFallido = false;

    // Verificar si el usuario ya existe
    const usuarioExiste = await this.validarUsuarioExistente(this.usuario);

    if (usuarioExiste) {
      this.errorMessage = 'El nombre de usuario ya está en uso. Por favor, elige otro.';
      this.registroFallido = true;
      await this.mostrarAlerta('Error', this.errorMessage);  // Muestra alerta de error
      return;
    }
    const nuevoUsuario = {
      name: this.nombre,
      user: this.usuario,
      pass: this.clave,
      rol: this.rol
    };

    try {
      await this.authService.registrarNuevoUsuario(nuevoUsuario);
      this.successMessage = 'Usuario registrado exitosamente!';
      await this.mostrarAlerta('Éxito', this.successMessage);  // Muestra alerta de éxito
      this.router.navigate(['/home']);  // Redirige al login después del registro exitoso
    } catch (error) {
      this.errorMessage = 'Hubo un error al registrar el usuario. Inténtalo de nuevo.';
      this.registroFallido = true;
      await this.mostrarAlerta('Error', this.errorMessage);  // Muestra alerta de error
    }
  }

    /* async registrar() {
      // Limpiar mensajes anteriores
      this.errorMessage = '';
      this.successMessage = '';
      this.registroFallido = false;

      // Crear un objeto nuevo usuario
      const nuevoUsuario = {
          user: this.usuario,
          pass: this.clave,
          name: this.nombre,
          rol: this.rol
      };

      // Imprimir el usuario para verificar
      console.log('Registrando nuevo usuario:', nuevoUsuario);  // Esto te ayudará a verificar los datos

      // Verificar si el usuario ya existe
      const usuarioExiste = await this.validarUsuarioExistente(this.usuario);

      if (usuarioExiste) {
          this.errorMessage = 'El nombre de usuario ya está en uso. Por favor, elige otro.';
          this.registroFallido = true;
          await this.mostrarAlerta('Error', this.errorMessage);
          return;
      }

      try {
          // Registrar el nuevo usuario
          await this.authService.registrarNuevoUsuario(nuevoUsuario);
          this.successMessage = 'Usuario registrado exitosamente!';
          await this.mostrarAlerta('Éxito', this.successMessage);
          // Descomentar si deseas redirigir después del registro

      } catch (error) {
          this.errorMessage = 'Hubo un error al registrar el usuario. Inténtalo de nuevo.';
          this.registroFallido = true;
          await this.mostrarAlerta('Error', this.errorMessage);
          console.error('Error al registrar usuario:', error); // Para ver el error en consola
      }
      if(nuevoUsuario.rol === 'docente'){
        this.router.navigate(['/inicio']); // Redirige al inicio del docente
      } else {
        this.router.navigate(['/inicioalum']); // Redirige al inicio del alumno

      }
    } */


  async mostrarAlerta(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });

    await alert.present();  // Muestra la alerta
  }

}

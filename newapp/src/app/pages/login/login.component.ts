import { BehaviorSubject } from 'rxjs';
import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  implements OnInit {

  usuario: string = ''; // Campo de entrada para el usuario
  clave: string = ''; // Campos de entrada para el usuario y clave

  private authService = inject(AuthService);  // Obtener el servicio de autenticación
  private router = inject(Router);  // Obtener el servicio de navegación
  private alertController = inject(AlertController);

  private loginFailedSubject = new BehaviorSubject<boolean>(false);
  loginFailed$ = this.loginFailedSubject.asObservable();

  loginFailed: boolean = false;

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }

  ngOnInit() {
    this.authService.loginFailed$.subscribe(loginFailed => {
      this.loginFailed = loginFailed;
      if (this.loginFailed) {
        // Mostrar la alerta solo si es un nuevo intento de inicio de sesión
        this.showAlert('Login fallido', 'Usuario o clave incorrectos.');
      }
    });
    this.loginFailed = false;
  }

  constructor() { }

  isLoading: boolean = false;



  async login(usuario: string, clave: string) {

    this.isLoading = true; // Activar el estado de carga
    await this.authService.buscarBD4(usuario, clave); // Intentar hacer login
    this.isLoading = false; // Desactivar el estado de carga una vez que la autenticación termine

    // Suscribirse al observable para verificar el estado de autenticación
    this.authService.isAuthenticated$.subscribe(isAuthenticated => {
      if (isAuthenticated) {
        this.authService.usuarioCompleto$.subscribe(usuarioCompleto => {
          this.usuario = ''; // Limpiar el campo de usuario
          this.clave = ''; // Limpiar el campo de clave
          this.showAlert('Login exitoso', 'Has iniciado sesión correctamente.');

          // Redirección según el rol
          if (usuarioCompleto.rol === "docente") {
            this.usuario = ''; // Limpiar el campo de usuario
            this.clave = ''; // Limpiar el campo de clave
            this.router.navigate(['/inicio']);
          } else {
            this.usuario = ''; // Limpiar el campo de usuario
            this.clave = ''; // Limpiar el campo de clave
            this.router.navigate(['/inicioalum']);
          }
        });
      } else {
        this.loginFailed = true; // Mostrar mensaje de error si el login falla
        // this.showAlert('Login fallido', 'Usuario o clave incorrectos.');
      }
    });
  }

}

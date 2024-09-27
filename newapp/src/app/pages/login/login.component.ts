import { BehaviorSubject } from 'rxjs';
import { DatosPersonalesService } from './../../servicios/datos-personales.service';
import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { Router } from '@angular/router';

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

  private loginFailedSubject = new BehaviorSubject<boolean>(false);
  loginFailed$ = this.loginFailedSubject.asObservable();
  loginFailed: boolean;



  ngOnInit() {
    this.authService.loginFailed$.subscribe(loginFailed => this.loginFailed = loginFailed);
  }

  constructor() { }

  login(usuario: string, clave: string): void {

    this.authService.buscarBD2(usuario, clave);

    this.authService.isAuthenticated$.subscribe(isAuthenticated => {

      if (isAuthenticated) {
        if(usuario === 'pedro') {
          this.usuario = '';
          this.clave = '';
          this.router.navigate(['/inicio']);
        }
        else{
          this.usuario = '';
          this.clave = '';
          this.router.navigate(['/inicioalum']);
        }
      } else {
        this.loginFailed = true; // Mostrar mensaje de error si el login falla
      }
    });
  }

}

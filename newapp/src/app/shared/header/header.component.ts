import { Component, inject, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/servicios/auth.service';
import { DatosPersonalesService } from 'src/app/servicios/datos-personales.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {


  nombre: string; // Campo para almacenar el nombre
  private sharedService = inject(DatosPersonalesService); // Obtener el servicio de datos personales

  usuario: string; // Campo para almacenar el nombre del usuario
  private authService = inject(AuthService); // Obtener el servicio de autenticación

  subscriptionDatosPersonales: Subscription; // Subscripción para el observable del nombre del usuario
  subscriptionAuthService: Subscription;


  constructor() { }

  ngOnInit() {
    this.subscriptionDatosPersonales = this.sharedService.nombre$.subscribe(nombre => {
      this.nombre = nombre
      console.log('Header:', nombre);
    }); // Obtiene el nombre del

    this.subscriptionAuthService = this.authService.usuario$.subscribe(usuario => {
      this.usuario = usuario
      console.log('Header:', usuario);
    });
  }

}

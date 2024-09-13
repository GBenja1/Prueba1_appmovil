import { DatosPersonalesService } from './../../servicios/datos-personales.service';
import { Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  implements OnInit {

  datosPersonales = inject(DatosPersonalesService)
  nombre: string = '';

  constructor() { }

  ngOnInit() {
    this.nombre = this.datosPersonales.getNombre();
  }

}

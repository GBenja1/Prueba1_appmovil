import { DatosPersonalesService } from './../../servicios/datos-personales.service';
import { Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent  implements OnInit {

  nombre: string = '';

  datosPersonales = inject(DatosPersonalesService)

  constructor() { }

  ngOnInit() {
    this.nombre = this.datosPersonales.getNombre();
  }

  saludar(){
    console.log("Hola: " + this.nombre);
  }

  guardarNombre(){
    this.datosPersonales.setNombre(this.nombre);
    console.log("Nombre guardado: " + this.nombre);
  }


}

import { Component, inject, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DatosPersonalesService } from 'src/app/servicios/datos-personales.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {


  nombre: string = '';
  datosPersonales = inject(DatosPersonalesService)
  subscriptionDatosPersonales: Subscription;


  constructor() { }

  ngOnInit() {
    this.subscriptionDatosPersonales = this.datosPersonales.nombre$.subscribe(datosPersonales =>{
      this.nombre = datosPersonales;
    });
  }

}

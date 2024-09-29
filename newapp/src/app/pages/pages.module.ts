import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';
import { IonicModule } from '@ionic/angular';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { InicioComponent } from './inicio/inicio.component';
import { RegistroComponent } from './registro/registro.component';
import { LogoutComponent } from './logout/logout.component';
import { InicioalumComponent } from './inicioalum/inicioalum.component';

import { DetallemateComponent } from './detallemate/detallemate.component';
import { DetallecienciasComponent } from './detalleciencias/detalleciencias.component';
import { DetallehistoriaComponent } from './detallehistoria/detallehistoria.component';
import { DetallelenguajeComponent } from './detallelenguaje/detallelenguaje.component';

@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    InicioComponent,
    RegistroComponent,
    LogoutComponent,
    InicioalumComponent,
    DetallemateComponent,
    DetallecienciasComponent,
    DetallehistoriaComponent,
    DetallelenguajeComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    IonicModule,
    SharedModule,
    FormsModule
  ]
})
export class PagesModule { }

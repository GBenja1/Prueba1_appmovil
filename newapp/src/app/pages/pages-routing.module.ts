import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { InicioComponent } from './inicio/inicio.component';
import { RegistroComponent } from './registro/registro.component';
import { LogoutComponent } from './logout/logout.component';
import { InicioalumComponent } from './inicioalum/inicioalum.component';
import { DetallemateComponent } from './detallemate/detallemate.component';
import { DetallecienciasComponent } from './detalleciencias/detalleciencias.component';
import { DetallehistoriaComponent } from './detallehistoria/detallehistoria.component';
import { DetallelenguajeComponent } from './detallelenguaje/detallelenguaje.component';


const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'home', component: HomeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'inicio', component: InicioComponent},
  { path: 'registro', component: RegistroComponent},
  { path: 'logout', component: LogoutComponent},
  { path: 'inicioalum', component: InicioalumComponent},
  { path: 'detallemate', component: DetallemateComponent},
  { path: 'detalleciencias', component: DetallecienciasComponent},
  { path: 'detallehistoria', component: DetallehistoriaComponent},
  { path: 'detallelenguaje', component: DetallelenguajeComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }

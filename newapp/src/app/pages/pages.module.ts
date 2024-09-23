import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';
import { IonicModule } from '@ionic/angular';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { InicioComponent } from './inicio/inicio.component';


@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    InicioComponent
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

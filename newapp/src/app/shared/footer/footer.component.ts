import { routes } from './../../app.routes';
import { Component,inject,OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent  implements OnInit {

  usuario="";
  private authService = inject(AuthService);
  private router = inject(Router);


  ngOnInit() {
    this.authService.usuario$.subscribe(usuario => this.usuario = usuario);

  }
  constructor(private alertController: AlertController) { }
  async presentLogoutAlert() {

    const alert = await this.alertController.create({
      header: 'Confirmar cierre de sesión',
      message: 'Estas seguro de cerrar sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cierre de sesión cancelado...',);
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            console.log('Cerrando sesión...');
            this.authService.logout();
            this.router.navigate(['/login']);  // Redirigir al login después de salir.navigate(['/login']);  // Redirigir al login después de salir
            // Aquí puedes poner la lógica para redirigir o cerrar sesión
          }
        }
      ]
    });
    await alert.present();
  }
  }

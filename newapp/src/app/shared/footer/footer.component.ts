import { Component,inject,OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { usuariosapi } from 'src/app/models/usuariosapi.models';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent  implements OnInit {

  usuario="";
  private authService = inject(AuthService);
  private router = inject(Router);
  usuarioCompleto: usuariosapi; // utiliza un tipo UsuarioAPI de models/UsuarioAPI.models.ts


  ngOnInit() {
      this.authService.usuario$.subscribe(usuario => this.usuario = usuario); // Obtiene el nombre del usuario logueado
      this.authService.usuarioCompleto$.subscribe(usuarioCompleto => {
      this.usuarioCompleto = usuarioCompleto; // Almacena los datos del usuario en el footer (en caso de estar logueado)
      console.log('Footer:', this.usuarioCompleto); // Muestra en consola los datos del usuario al cargar el footer (en caso de estar logueado)
    });
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
            this.router.navigate(['/login']);

          }
        }
      ]
    });
    await alert.present();
  }
  }

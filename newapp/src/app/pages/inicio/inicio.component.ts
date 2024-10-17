import { Component, inject, OnInit } from '@angular/core';
import QRious from 'qrious'; // Importa QRious
import { AuthService } from 'src/app/servicios/auth.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { usuariosapi } from 'src/app/models/usuariosapi.models';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent  implements OnInit {

  usuario="";
  private authService = inject(AuthService);
  private router = inject(Router);
  usuarioCompleto: usuariosapi;
  constructor(private alertController: AlertController) { }

  ngOnInit() {
    this.authService.usuario$.subscribe(usuario => this.usuario = usuario); // Obtiene el nombre del usuario logueado
      this.authService.usuarioCompleto$.subscribe(usuarioCompleto => {
      this.usuarioCompleto = usuarioCompleto; // Almacena los datos del usuario en el footer (en caso de estar logueado)
      console.log('Footer:', this.usuarioCompleto); // Muestra en consola los datos del usuario al cargar el footer (en caso de estar logueado)
    });
  }


  // Método para generar el código QR
  generateQRCode(value: string) {
    const qr = new QRious({
      element: document.getElementById('qrcode') as HTMLCanvasElement,
      value: value,
      size: 250,
      level: 'H'
    });

    // Mostrar el canvas (si está oculto)
    const canvas = document.getElementById('qrcode') as HTMLCanvasElement;
    if (canvas) {
      canvas.style.display = 'block'; // Asegúrate de que se muestre
      canvas.scrollIntoView({ behavior: 'smooth' }); // Hace scroll automáticamente hasta el canvas
    }
  }
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




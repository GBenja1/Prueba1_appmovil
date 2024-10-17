import { Component, inject, OnInit } from '@angular/core';
import QRious from 'qrious'; // Importa QRious
import { AuthService } from 'src/app/servicios/auth.service';

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
  constructor() { }

  ngOnInit() {}


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
}




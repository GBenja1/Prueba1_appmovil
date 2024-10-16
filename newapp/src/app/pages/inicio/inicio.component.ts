import { Component, OnInit } from '@angular/core';
import QRious from 'qrious'; // Importa QRious

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent  implements OnInit {

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

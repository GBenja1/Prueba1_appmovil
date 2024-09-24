import { AuthService } from 'src/app/servicios/auth.service';
import { Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent  implements OnInit {

  private authService = inject(AuthService);

  constructor() { }

  ngOnInit() {
    this.authService.logout();
  }

}

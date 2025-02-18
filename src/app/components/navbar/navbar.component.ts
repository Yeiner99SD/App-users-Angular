import { Component, inject, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [RouterModule],
    templateUrl: './navbar.component.html'
})
export class NavbarComponent {



  private authS = inject(AuthService)

  get login(){
    return this.authS.user
  }

  get admin(){
    return this.authS.isAdmin()
  }

  handlerLogout(){
    this.authS.logout()
  }
}

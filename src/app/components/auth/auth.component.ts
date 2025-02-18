import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { login } from '../../store/auth/auth.actions';

@Component({
    selector: 'app-auth',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './auth.component.html',
    styleUrl: './auth.component.css'
})
export class AuthComponent {

  user: User;
  private authS = inject(AuthService)
  private router = inject(Router)
  private store = inject(Store<{auth: any}>)

  constructor(){
    this.user = new User()
  }

  onSubmit(){
    if(!this.user.username || !this.user.password){
      Swal.fire(
        'Error de Autenticación',
        'Username y password requeridos',
        'error'
      )
    }else{
        this.store.dispatch(login({username: this.user.username, password: this.user.password}))
    }
  }

  
}

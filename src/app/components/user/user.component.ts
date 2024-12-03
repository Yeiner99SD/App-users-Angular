import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../models/user';
import Swal from 'sweetalert2';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { SharingDataService } from '../../services/sharing-data.service';

@Component({
  selector: 'user',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './user.component.html',

})
export class UserComponent {
  
  title: string = 'Hola usuarios'
  users : User[] = []
  
  

  constructor(private router: Router, private service: UserService, private sharingS: SharingDataService){
    if( this.router.getCurrentNavigation()?.extras.state){
      this.users = this.router.getCurrentNavigation()?.extras.state!['users'];
    } else{
      this.service.findAll().subscribe(users => this.users = users)
    }
  } 

  onRemoveUser(id: number){ 

    this.sharingS.idUserEventEmitter.emit(id)
  }

  onselectedUser(user: User){
    //this.sharingS.selectedUserEventEmitter.emit(user)
    this.router.navigate(['/users/edit', user.id], {state: {user}})
  }
}

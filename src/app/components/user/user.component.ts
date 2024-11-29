import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../models/user';
import Swal from 'sweetalert2';

@Component({
  selector: 'user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html',

})
export class UserComponent {
  
  @Input() users : User[] = []
  
  @Output() idUserEventEmitter = new EventEmitter()

  @Output() selectedUserEventEmitter = new EventEmitter()

  onRemoveUser(id: number){

    Swal.fire({
      title: "Seguro que deseas eliminar usuario?",
      showDenyButton: true,

      confirmButtonText: "Eliminar",
      denyButtonText: `Cancelar`
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.users = this.users.filter(user => user.id != id)
        this.idUserEventEmitter.emit(id)  
        Swal.fire("Eliminado!", "", "success");
      }
    });

  
  }

  onselectedUser(user: User){
    this.selectedUserEventEmitter.emit(user)
  }
}

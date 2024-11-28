import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../models/user';

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

    const confirmRemove = confirm('Estas seguro que desea eliminar')
    if(confirmRemove){
      this.idUserEventEmitter.emit(id)  
    }
  }

  onselectedUser(user: User){
    this.selectedUserEventEmitter.emit(user)
  }
}

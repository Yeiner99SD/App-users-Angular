import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../../models/user';

@Component({
  selector: 'form-user',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './form-user.component.html',
  styleUrl: './form-user.component.css'
})
export class FormUserComponent {
  

  @Input() user: User;
  @Output() newUserEventEmitter: EventEmitter<User> = new EventEmitter()
  @Output() openEventEmitter = new EventEmitter
  constructor(){
    this.user = new User()
  }
  
  onSubmit(userForm: NgForm){
    if(userForm.valid){
      this.newUserEventEmitter.emit(this.user)
      console.log(this.user)
    }
    userForm.reset()
    userForm.resetForm()
  }

  clearUser() {
   this.user = new User()
  }

  onOpen(){
    this.openEventEmitter.emit()
  }
}

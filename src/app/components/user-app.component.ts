import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { UserComponent } from "./user/user.component";
import { FormUserComponent } from './form-user/form-user.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'user-app',
  standalone: true,
  imports: [ UserComponent, FormUserComponent],
  templateUrl: './user-app.component.html',
})
export class UserAppComponent implements OnInit {
   
  title: string = 'Hola usuarios'

  users: User[] = []

  userSelected: User

  open: boolean = false

  constructor(private service: UserService){
    this.userSelected = new User()
  }


  ngOnInit(): void {
    this.service.findAll().subscribe(users => this.users = users)
  }

  
  addUser(user: User){
    if(user.id > 0){
      this.users = this.users.map( u => {
        if(u.id = user.id){
          return {... user}
        }
        return u;
      })
    }else{
      this.users = [... this.users, {... user}]
    }
    Swal.fire({
      title: "Guardado",
      text: "Usuario registrado con exito",
      icon: "success"
    })

    this.userSelected = new User()
    this.setOpen()
  }

  removeUser(id: number){   
    this.users = this.users.filter(user => user.id != id)
  }

  onSelectedUser(userRow: User){
    this.userSelected = {... userRow}
    this.open = true
  }

  setOpen(){
    this.open = !this.open
  }
}

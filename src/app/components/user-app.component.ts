import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { SharingDataService } from '../services/sharing-data.service';

@Component({
  selector: 'user-app',
  standalone: true,
  imports: [ RouterOutlet, NavbarComponent],
  templateUrl: './user-app.component.html',
})
export class UserAppComponent implements OnInit {
   


  users: User[] = []
  

 


  constructor(private service: UserService, private sharingS: SharingDataService, private router: Router, private route: ActivatedRoute){
    
  }


  ngOnInit(): void {
    //this.service.findAll().subscribe(users => this.users = users)
    //this.route.paramMap.subscribe(params => {
    //  const page = +(params.get('page') || '')
    //  console.log(page)
    //  this.service.findByPage(page).subscribe(pageable => this.users = pageable.//content as User[])
    //})
    this.addUser()
    this.RemoveUser()
    this.findUserById()
    this.pageUserEvent()
  }

  pageUserEvent() {
    this.sharingS.pageUsersEventEmitter.emit(this.users)
  }

  findUserById() {
    this.sharingS.findUserByIdEventEmitter.subscribe(id => {

      const user = this.users.find(user => user.id == id);

      this.sharingS.selectUserEventEmitter.emit(user);
    })
  }

  addUser() {
    this.sharingS.newUserEventEmitter.subscribe(user => {
      if (user.id > 0) {
        this.service.updateUser(user).subscribe({
          next: (userUpdate) => {
            this.users = this.users.map(u => (u.id == userUpdate.id) ? { ...userUpdate } : u);
            this.router.navigate(['/users']) ;
        },
          error: (err) => {
            console.log(err.error)
      }})
      } else {
        this.service.createUser(user).subscribe({
          next: (userNew) => {
            console.log(userNew)
            this.users = [...this.users , { ...userNew, }];
            this.router.navigate(['/users']) ;
        },
          error: (err) => {
            console.log(err.error)
          }})
      }
      
      Swal.fire({
        title: "Guardado!",
        text: "Usuario guardado con exito!",
        icon: "success"
      });
    })
  }
  

  RemoveUser(): void{
    this.sharingS.idUserEventEmitter.subscribe(id => {
      Swal.fire({
        title: "Seguro que quiere eliminar?",
        text: "Cuidado el usuario sera eliminado del sistema!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si"
      }).then((result) => {
        if (result.isConfirmed) {
        this.service.removeUser(id).subscribe(() => {
          
          this.users = this.users.filter(user => user.id != id);
          this.router.navigate(['/users/create'], { skipLocationChange: true }).then(() => {
            this.router.navigate(['/users']);
        })

          });

          Swal.fire({
            title: "Eliminado!",
            text: "Usuario eliminado con exito.",
            icon: "success"
          });
        }
      });
    });
  

  
  }

  

}


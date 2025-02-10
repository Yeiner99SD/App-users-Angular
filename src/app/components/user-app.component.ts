import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { SharingDataService } from '../services/sharing-data.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'user-app',
  standalone: true,
  imports: [ RouterOutlet, NavbarComponent],
  templateUrl: './user-app.component.html',
})
export class UserAppComponent implements OnInit {
   


  users: User[] = []
  paginator: any = {}

 


  constructor(private service: UserService, private sharingS: SharingDataService, private router: Router, private route: ActivatedRoute, private authS: AuthService){
    
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
    this.handlerLogin()
  }

  handlerLogin(){
    this.sharingS.handlerLoginEventEmitter.subscribe(({username, password}) => {
      console.log(username+ '' + password)
      this.authS.loginUser({username, password}).subscribe({
        next: res => {
          const token = res.token;
          console.log(token)
          const payload = this.authS.getPayload(token)
          
          const user = {username: payload.sub}
          const login = {
            user,
            isAuth: true,
            isAdmin: payload.isAdmin
          }
          this.authS.token = token;
          this.authS.user = login
          this.router.navigate(['/users/page/0'])
          console.log(payload)
          
        },
        error: err => {
          if(err.status == 401 ){
            console.log(err.error)
            Swal.fire('Error en la autenticacion', err.error.message , 'error')
          } else {
            throw err
          }
        }
      })
    })
  }
 
  pageUserEvent() {
    this.sharingS.pageUsersEventEmitter.subscribe(pageable => {
      this.users = pageable.users
      this.paginator = pageable.paginator
    })
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
            this.router.navigate(['/users'],{
              state: {
                users: this.users,
                paginator: this.paginator
              }
            });
            Swal.fire({
              title: "Actualizado",
              text: "Usuario actualizado con exito",
              icon: "success"
            })
        },
          error: (err) => {
            //console.log(err.error)
            if(err.status == 400){
              this.sharingS.errorsUserFormEventEmitter.emit(err.error)
            }
      }})
      } else {
        this.service.createUser(user).subscribe({
          next: userNew => {
            console.log(userNew)
            this.users = [...this.users , { ...userNew }];
            this.router.navigate(['/users'],
              { 
                state:{
                  users: this.users,
                  paginator: this.paginator
                }
              }
            ) ;
            Swal.fire({
              title: "Guardado!",
              text: "Usuario guardado con exito!",
              icon: "success"
            });
        },
          error: (err) => {
            //console.log(err.error)
            if (err.status == 400) {
              this.sharingS.errorsUserFormEventEmitter.emit(err.error);
            }
          }})
      }
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
            this.router.navigate(['/users'],{
              state: {
                users: this.users,
                paginator: this.paginator
              }
            });
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


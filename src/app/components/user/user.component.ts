import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../../models/user';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { SharingDataService } from '../../services/sharing-data.service';
import { PaginatorComponent } from '../paginator/paginator.component';
import { AuthService } from '../../services/auth.service';
import { Store } from '@ngrx/store';
import { load, remove } from '../../store/users/users.actions';

@Component({
    selector: 'user',
    imports: [RouterModule, PaginatorComponent],
    templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {
  
  title: string = 'Hola usuarios'
  users : User[] = []
  paginator: any = {};
  
  

  constructor(
    private router: Router, 
    private service: UserService, 
    private sharingS: SharingDataService, 
    private route: ActivatedRoute, 
    private authS: AuthService,
    private store: Store<{users: any}>)
    {
    
    this.store.select('users').subscribe(state => {
      this.users =state.users,
      this.paginator = state.paginator
    })

  } 

  ngOnInit(): void {
      this.route.paramMap.subscribe(params => {
      const page = +(params.get('page') || '0');
      this.store.dispatch(load({page}))
      }) 
  }

  onRemoveUser(id: number){ 
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
              this.store.dispatch(remove({id}))          
            }
          });
    
  }

  onselectedUser(user: User){
   
    this.router.navigate(['/users/edit', user.id])
  }

  get admin(){
    return this.authS.isAdmin()
  }
}

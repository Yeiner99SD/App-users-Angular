import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../../models/user';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { SharingDataService } from '../../services/sharing-data.service';
import { PaginatorComponent } from '../paginator/paginator.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'user',
  standalone: true,
  imports: [RouterModule, PaginatorComponent],
  templateUrl: './user.component.html',

})
export class UserComponent implements OnInit {
  
  title: string = 'Hola usuarios'
  users : User[] = []
  paginator: any = {};
  
  

  constructor(private router: Router, private service: UserService, private sharingS: SharingDataService, private route: ActivatedRoute, private authS: AuthService){
    if (this.router.getCurrentNavigation()?.extras.state) {
      this.users = this.router.getCurrentNavigation()?.extras.state!['users'];
      this.paginator = this.router.getCurrentNavigation()?.extras.state!['paginator'];
    }
  } 

  ngOnInit(): void {
    if (this.users == undefined || this.users == null || this.users.length == 0) {
      console.log('consulta findAll')
      // this.service.findAll().subscribe(users => this.users = users);
      this.route.paramMap.subscribe(params => {
        const page = +(params.get('page') || '0');
        console.log(page)
        this.service.findAllPageable(page).subscribe(pageable => {
          this.users = pageable.content as User[];
          this.paginator = pageable;
          this.sharingS.pageUsersEventEmitter.emit({users: this.users, paginator: this.paginator});
        });
      })
    }
    
  }

  onRemoveUser(id: number){ 

    this.sharingS.idUserEventEmitter.emit(id)
  }

  onselectedUser(user: User){
    //this.sharingS.selectedUserEventEmitter.emit(user)
    this.router.navigate(['/users/edit', user.id])
  }

  get admin(){
    return this.authS.isAdmin()
  }
}

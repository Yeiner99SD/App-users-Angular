import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../../models/user';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { SharingDataService } from '../../services/sharing-data.service';

@Component({
  selector: 'user',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './user.component.html',

})
export class UserComponent implements OnInit {
  
  title: string = 'Hola usuarios'
  users : User[] = []
  
  

  constructor(private router: Router, private service: UserService, private sharingS: SharingDataService, private route: ActivatedRoute){} 

  ngOnInit(): void {
    console.log("Consulta findAll()")
    //this.service.findAll().subscribe(users => this.users = users)
    this.route.paramMap.subscribe(params => {
      const page = +(params.get('page') || '')
      console.log(page)
      this.service.findByPage(page).subscribe(pageable => {
        this.users = pageable.content as User[]
        this.sharingS.pageUsersEventEmitter.emit(this.users)
      })
    })
  }

  onRemoveUser(id: number){ 

    this.sharingS.idUserEventEmitter.emit(id)
  }

  onselectedUser(user: User){
    //this.sharingS.selectedUserEventEmitter.emit(user)
    this.router.navigate(['/users/edit', user.id])
  }
}

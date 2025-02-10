import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../../models/user';
import { SharingDataService } from '../../services/sharing-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'form-user',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './form-user.component.html',
  styleUrl: './form-user.component.css'
})
export class FormUserComponent  implements OnInit{
  

  user: User;
  errors: any = {};

  constructor(private sharingS: SharingDataService, private route: ActivatedRoute, private userS: UserService){
    
    this.user = new User()
    
    
  }
  ngOnInit(): void {
    //recoge el id pero del cliente osea angular
    this.sharingS.errorsUserFormEventEmitter.subscribe(errors => this.errors = errors);
    this.sharingS.selectUserEventEmitter.subscribe(user => this.user = user);

    this.route.paramMap.subscribe(params => {
      const id: number =+ (params.get('id') || '0');

      if (id > 0) {
        //Esta recoge el id en estado de Angular
        this.sharingS.findUserByIdEventEmitter.emit(id);

        //esto trae la info pero directamente desde el servidor backend
        //this.userS.finById(id).subscribe( user => this.user = user)
      }
    });
  }
  
  onSubmit(userForm: NgForm){
    //if(userForm.valid){
      this.sharingS.newUserEventEmitter.emit(this.user)
      console.log(this.user)
   // }
    //userForm.reset()
    //userForm.resetForm()
  }

  clearUser(userForm: NgForm) {
   this.user = new User()
   userForm.reset();
   userForm.resetForm();
  }

  
}

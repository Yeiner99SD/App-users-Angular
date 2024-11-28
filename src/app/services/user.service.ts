import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users: User[] = [{
    id: 1,
    name: 'Yeiner',
    lastname: 'Navarro',
    email: 'yeinermoreno2005@gmial.com',
    username: 'Tipum99',
    password: '123'
  },
  {
    id: 2,
    name: 'David',
    lastname: 'Rivas',
    email: 'davidmrivasb2004@gmial.com',
    username: 'Drox',
    password: '123'
  }
  ]

  constructor() { }

  findAll(): Observable<User[]> {
    return of(this.users)
  }
}

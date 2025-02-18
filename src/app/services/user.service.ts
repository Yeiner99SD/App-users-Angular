import { inject, Injectable } from '@angular/core';
import { User } from '../models/user';
import { map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private http = inject(HttpClient)
  private url = "http://localhost:8080/api/users"


  constructor() { }

  findAll(): Observable<User[]> {
    return this.http.get(this.url).pipe(
      map((data: any) => data as User[]),
    )
    //Asi tambien se puede
    // return this.http.get<User[]>("Url")
  }

  findAllPageable(page: number): Observable<any> {
    return this.http.get<any[]>(`${this.url}/page/${page}`);
  }

  findByPage(numberOfPage: number): Observable<any> {
    return this.http.get<any>(`${this.url}/page/${numberOfPage}`)
  }

  finById(id: number): Observable<User>{
    return this.http.get<User>(`${this.url}/${id}`)
  }

  createUser(user: User): Observable<User>{
    return this.http.post<User>(this.url, user)
  }

  updateUser(user: User): Observable<User>{
    return this.http.put<User>(`${this.url}/${user.id}`, user)
  }

  removeUser(id: number): Observable<number>{
    return this.http.delete<number>(`${this.url}/${id}`)
  }
}

import { Injectable, Output, EventEmitter } from '@angular/core';
import { User } from '../classes/user';
import {HttpClient, HttpHeaderResponse, HttpErrorResponse} from '@angular/common/http'; ///

interface Jwt{ ///
  'access_token': string,
  'token_type': string,
  'expires_in': number,
  'user_name' : string,
  'email' : string

}


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) 
  {

  }

  private isUserLogged = false; //true per abilitare l'edit a tutti
  @Output() usersignedin = new EventEmitter<User>()
  @Output() usersignedup = new EventEmitter<User>()
  @Output() userlogout = new EventEmitter()

  private APIAUTHURL = 'http://localhost:8000/api/auth/'; ///



isUserLoggedIn() {

  this.isUserLogged = !!localStorage.getItem('token');
  return this.isUserLogged;
}

signIn(email: string, password: string) { //LOGIN

  this.http.post(this.APIAUTHURL + 'login', ///
  {
    email: email,
    password: password
  }).subscribe(
    (payload: Jwt) => {

      localStorage.setItem('token', payload.access_token); // email replace con payload...
      localStorage.setItem('user', JSON.stringify(payload));
      let user = new User();
      user.name = payload.user_name;
      user.email = payload.email;
      this.usersignedin.emit(user);
      return true;

  },
    (httpResp: HttpErrorResponse) =>  {
      console.log(httpResp.message);
    }
  )

  

}

signUp(username: string, email: string, password: string) {

  localStorage.setItem('token', email);
  let user = new User();
  user.name = username;
  user.email = email;
  this.usersignedup.emit(user);
  return true;
}

logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  this.userlogout.emit();
  this.isUserLogged = false;
}

getUser() : User
{
 const data = JSON.parse(localStorage.getItem('user'));
 let user = new User();
 if(data)
 {
   user.name = data['user_name'];
   user.email = data['email'];
 }
 return user;
}

getToken()
{
  return localStorage.getItem('token');
}

}

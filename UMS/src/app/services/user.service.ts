import { Injectable } from '@angular/core';
import { User } from '../classes/user';
import { UserInterface } from '../interfaces/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable()

export class UserService{

    users: User[] = [];
    private APIURL = 'http://localhost:8000/users';

    constructor(private http: HttpClient, private auth: AuthService){} //AuthService

    getAuthHeader(): HttpHeaders
    {
        let headers = new HttpHeaders( //
        {
            Authorization: 'Bearer ' + this.auth.getToken()
        });
        return headers;
    }

    getUsers()
    {
        return this.http.get(this.APIURL, //
            {
                headers: this.getAuthHeader()
            }); 
    }

    getUser(id: number) 
    {

        //return this.users[id];
        return this.http.get(this.APIURL + '/' + id);
    }

    deleteUser(user: UserInterface)
    {
       //const data = {_method : 'DELETE'};
        user['_method'] = "DELETE";
        return this.http.post(this.APIURL + '/' + user.id, user );
    }

    updateUser(user: UserInterface)
    {
        user['_method'] = "PUT";
        return this.http.post(this.APIURL + '/' + user.id, user);
    }

   createUser(user: UserInterface)
   {
        return this.http.post(this.APIURL, user);

   }
}
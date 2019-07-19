import { Component, OnInit, Output } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../classes/user';
import { EventEmitter } from '@angular/core';




@Component({
    selector: 'app-users',
    templateUrl: '/users.component.html',
    styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit{
    title = "users";
    users : any;
    @Output('updateUser') updateUser = new EventEmitter<User>();
    constructor(private service: UserService)
    {
    }
    ngOnInit()
    {
        this.service.getUsers().subscribe(
           response => this.users = response
        );
        //return this.users;
    }

    onDeleteUser(user: User)
    {
        const deleteUser = confirm("Vuoi veramente cancellare l'utente " +user.name+" "+user.lastname+'?');
        if(deleteUser)
        {
        this.service.deleteUser(user).subscribe(
            response => { 
                const idx = this.users.indexOf(user);
                this.users.splice(idx, 1);
                alert(response['message']) 
            }
         );
        }
    }

    onSelectUser(user: User)
    {
        //alert(user.age);
        const userCopy = Object.assign({}, user);
        this.updateUser.emit(userCopy);
    }
}
import { Component } from '@angular/core';
import { User } from './classes/user';
import { UserComponent } from './user/user.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'UMS';
  showForm: boolean = false;
  userSelected: User = new User();
  updateUser(user: User)
  {
    this.userSelected = user;
    this.showForm = true;
  }
  newUser()
  {
    this.userSelected = new User();
    this.showForm = true;
  }
}

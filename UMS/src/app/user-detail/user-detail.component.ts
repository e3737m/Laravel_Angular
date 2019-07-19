import { Component, OnInit, Input, ɵConsole } from '@angular/core';
import { User } from '../classes/user';
import { UserService } from '../services/user.service';
import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  private userCopy: User;
  private __user: User;
@Input() set user(user: any)
{
  this.__user = user;

  this.userCopy = Object.assign({}, user);
  console.log("SETTER");
}

get user()
{
  console.log("GETTER");
  return this.__user;
}

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
  
    this.user = new User();
    this.route.paramMap.subscribe(
      (params) => {
        this.userService.getUser(+params.get('id')).subscribe(
          response => this.user = response
        );
      }
    )
  
/*
 this.user = new User();
 this.route.paramMap.subscribe(
     (params) => {
         if (!params.get('id')) {
             return;
         }
         this.userService.getUser(+params.get('id')).subscribe(
             response => this.user = response['data']
         );
     }
);*/
  }

  saveUser()
  {
    console.log(this.user.id);
    if(this.user.id > 0)
    {
      this.userService.updateUser(this.user).subscribe(response => {
        const user = response['data'] as User;
        if(response['success'])
        {
          alert('User ' + User.name + ' modificato correttamente')
        }else{
          alert(response['message']);
        }
        this.router.navigate(['users']);
      });
    }else{
      this.userService.createUser(this.user).subscribe(response => {
        const user = response['data'] as User;
        if(response['success'])
        {
          alert('User ' + User.name + ' creato correttamente')
        }else{
          alert(response['message']);
        }
        this.router.navigate(['users']);
      });
    }

    
  }

  resetForm(form)
  {
    if(this.user.id === 0)
    {
      this.user = new User();
    }else{
      //form.reset();
      this.user = this.userCopy;
    }
  }

}

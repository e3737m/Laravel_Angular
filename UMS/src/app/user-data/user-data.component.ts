import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../classes/user';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})
export class UserDataComponent implements OnInit {

  public User: any = "";
  constructor(private route: ActivatedRoute, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(

      (p) => {
        this.userService.getUser(+p.id).subscribe(
          response => this.User = response
        )
        ;
      }
    )

  }

  backToUsers()
  {
    this.router.navigate(['users']);
  }

}

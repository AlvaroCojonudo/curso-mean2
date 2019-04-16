import { Component, OnInit } from '@angular/core';
import { User } from './models/user';
import { UserService } from './services/user.service';
import { HttpClientModule } from  '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    UserService
  ]
})
export class AppComponent implements OnInit{
  public title = 'Musify';
  public user: User;
  public identity;
  public token;
  constructor(private _userService: UserService){
    this.user = new User('','','','','','ROLE_USER','');
  }
  ngOnInit(){
  }
  public onSubmit(){
    this._userService.signup(this.user).subscribe(res => {
      console.log(res);
    }, err =>{
      var errorMessage = <any>err;
      if(errorMessage != null){
        console.log(err);
      }
    });
    console.log(this.user);
  }
}

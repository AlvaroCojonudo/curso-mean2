import { Component, OnInit } from '@angular/core';
import { User } from './models/user';
import { UserService } from './services/user.service';
import { identity } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    UserService
  ]
})
export class AppComponent implements OnInit {
  public title = 'Musify';
  public user: User;
  public identity;
  public token;
  public errorMessage = null;
  constructor(private _userService: UserService) {
    this.user = new User('', '', '', '', '', 'ROLE_USER', '');
  }
  ngOnInit() {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }
  onSubmit() {
    this._userService.signup(this.user).subscribe(
      res => {
        this.identity = res.user;
        if (!this.identity._id) {
          alert('El usuario no esta correctamente logeado.');
        } else {
          this._userService.signup(this.user, 'true').subscribe(
            res => {
              this.token = res.token;  
              if(this.token <= 0){
                alert('El token no se ha generado correctamente');
              }else{
                localStorage.setItem('identity', JSON.stringify(this.identity));
                localStorage.setItem('token', this.token);
              } 
            })
        }
      }, err => {
        var erroMessage = <any>err;
        if (erroMessage != null) {
          this.errorMessage = erroMessage.error.message;
        }
      });
  }
  logout(){
    localStorage.clear();
    localStorage.removeItem('identity');
    localStorage.removeItem('token');
    this.identity = null;
    this.token = null;
  }
}

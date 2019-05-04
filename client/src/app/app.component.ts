import { Component, OnInit } from '@angular/core';
import { User } from './models/user';
import { global } from './services/global';
import { UserService } from './services/user.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    UserService
  ]
})
export class AppComponent implements OnInit {
  public url: string;
  public title = "m\\u/sic";
  public user: User;
  public userRegister: User;
  public identity: any;
  public token: string;
  public errorMessage: any = null;
  public alertRegister: any = null;
  constructor(
    private _userService: UserService
  ) {
    this.user = new User('', '', '', '', '', 'ROLE_USER', '');
    this.userRegister = new User('', '', '', '', '', 'ROLE_USER', '');
    this.url = global.url;
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }
  ngOnInit() {

  }
  onSubmit() {
    this._userService.signup(this.user).subscribe(
      res => {
        var respuesta: any = res;
        this.identity = respuesta.user;
        if (!this.identity._id) {
          alert('El usuario no esta correctamente logeado.');
        } else {
          this._userService.signup(this.user, 'true').subscribe(
            res => {
              var respuesta2: any = res;
              this.token = respuesta2.token;
              if (this.token.length <= 0) {
                alert('El token no se ha generado correctamente');
              } else {
                var number = (this.identity.email).indexOf('@');
                this.identity.user = (this.identity.email).substring(0, number);
                localStorage.setItem('identity', JSON.stringify(this.identity));
                localStorage.setItem('token', this.token);
                this.user = new User('', '', '', '', '', 'ROLE_USER', '');
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
  onSubmitRegister() {
    console.log(this.userRegister);
    this._userService.register(this.userRegister).subscribe(res => {
      var respuesta: any = res;
      let user = respuesta.user;
      this.userRegister = user;
      if (!user._id) {
        alert('Error al registrar!');
      } else {

        this.alertRegister = 'El registro se ha realizado, identificate!';
        this.userRegister = new User('', '', '', '', '', 'ROLE_USER', '');;
      }
    },
      err => {
        var erroMessage = <any>err;
        if (erroMessage != null) {
          this.alertRegister = erroMessage.error.message;
        }
      });
  }
  logout() {
    localStorage.clear();
    localStorage.removeItem('identity');
    localStorage.removeItem('token');
    this.identity = null;
    this.token = null;
  }
}

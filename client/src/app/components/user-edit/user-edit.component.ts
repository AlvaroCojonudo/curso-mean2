import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers: [UserService]
})
export class UserEditComponent implements OnInit {
  public errorMessage: any = null;
  public respuesta: any = null;
  public titulo: string;
  public user: User;
  public identity: any;
  public token: any;
  constructor(
    private _userService: UserService
  ) {
    this.titulo = 'Editar Informacion';
    this.identity = this._userService.getIdentity();
    this.user = this.identity;
    this.token = this._userService.getToken();
  }

  ngOnInit() {
    console.log({ 'MEnsahe': 'SE ha iniciado el componete edit' });
  }
  onSubmit() {
    console.log(this.user);
    this._userService.updateUser(this.user).subscribe(
      res => {
        this.respuesta = res;
        if (!this.respuesta.user) {
          this.errorMessage = 'El usuario no se ha actualizado.';
        } else {
          //this.user = this.respuesta.user;
          localStorage.setItem('identity', JSON.stringify(this.user));
          this.errorMessage = 'El usuario se ha actualizado.';
        }
      },
      err => {
        var erroMessage = <any>err;
        if (erroMessage != null) {
          this.errorMessage = erroMessage.error.message;
        }
      }
    );
  }

}

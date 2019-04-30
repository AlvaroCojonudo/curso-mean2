import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { global } from '../../services/global';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers: [
    UserService
  ]
})
export class UserEditComponent implements OnInit {
  public identity: any;
  public token: any;
  public errorMessage: any = null;
  public respuesta: any = null;
  public titulo: string;
  public user: User;
  
  public url: string;
  constructor(
    private _userService: UserService
  ) {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.titulo = 'Editar Informacion';    
       
    this.url = global.url;
  }

  ngOnInit() {
    this.user = this.identity;    
    console.log('ngInit',this.user);
  }
  onSubmit() {
    console.log(this.user);
    this._userService.updateUser(this.user).subscribe(
      res => {
        this.respuesta = res;
        if (!this.respuesta.user) {
          this.errorMessage = 'El usuario no se ha actualizado.';
        } else {
          if(!this.filesLoad){

          }else{
            this.makeFileReq(this.url + '/upload-image-user/' + this.user._id, [], this.filesLoad).then((result : any)=>{
              this.user.image = result.image;
              localStorage.setItem('identity', JSON.stringify(this.user));
              console.log(this.user);
            });
          }
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
  public filesLoad: Array<File>;
  fileChangeEvent(file: any) {
    this.filesLoad = <Array<File>>file.target.files;
    console.log(this.filesLoad);
  }
  makeFileReq(url: string, params: Array<string>, files: Array<File>) {
    const token = this.token;
    return new Promise(function (res, rej) {
      var formData: any = new FormData();
      var xhr = new XMLHttpRequest();
      for (var i = 0; i < files.length; i++) {
        formData.append('image', files[i], files[i].name);
      }
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            res(JSON.parse(xhr.response));
          }else{
            rej(xhr.response);
          }
        }
      }
      xhr.open('POST', url, true);
      xhr.setRequestHeader('Authorization', token);
      xhr.send(formData);
    });
  }
}

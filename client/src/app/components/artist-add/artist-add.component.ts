import { Component, OnInit } from '@angular/core';
import { ActivatedRoute , Router } from '@angular/router';
import { global } from '../../services/global';
import { UserService } from '../../services/user.service';
import { ArtistService } from '../../services/artist.service';
import { Artist } from '../../models/artist';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-artist-add',
  templateUrl: './artist-add.component.html',
  styleUrls: ['./artist-add.component.css'],
  providers: [
    UserService,
    ArtistService
  ]
})
export class ArtistAddComponent implements OnInit {
  title: string;
  artist: Artist;
  identity: User;
  token;
  url: string;
  errorMessage: any = null;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _artistService: ArtistService
  ) {
    this.title = 'Añadir Artista';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = global.url;
    this.artist = new Artist('', '', '');
  }
  ngOnInit() {

  }

  onSubmit() {
    this._artistService.addArtist(this.token, this.artist).subscribe(
      res => {
        var respuesta: any = res;        
        if(!respuesta.artist){
          this.errorMessage = 'Error en el servidor!';
        }else{
          this.artist = respuesta.artist;
          //this._router.navigate(['/editar-artista'], respuesta.artist._id);
          this.errorMessage = 'El artista se ha creado correctamente!';
        }
      },
      err => {
        var erroMessage = <any>err;
        if (erroMessage != null) {
          this.errorMessage = erroMessage.error.message;
        }
      });
  }

}

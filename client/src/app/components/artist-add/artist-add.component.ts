import { Component, OnInit } from '@angular/core';
import { RouterModule, ActivatedRoute } from '@angular/router';
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
  constructor(
    private _route: ActivatedRoute,
    private _router: RouterModule,
    private _userService: UserService,
    private _artistService: ArtistService
  ) { 
    this.title = 'Añadir Artista';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = global.url;
    this.artist = new Artist('','','');
  }
  ngOnInit() {
    alert(this._artistService.addArtist(this.token, this.artist));    
  }  

  onSubmit(){
    console.log(this.artist);
  }

}

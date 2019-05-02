import { Component, OnInit } from '@angular/core';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { global } from '../../services/global';
import { UserService } from '../../services/user.service';
import { Artist } from '../../models/artist';
import { User } from 'src/app/models/user';
@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.css'],
  providers: [
    UserService
  ]
})
export class ArtistListComponent implements OnInit {
  title: string;
  artists: Artist[];
  identity: User;
  token;
  url: string;
  constructor(
    private _route: ActivatedRoute,
    private _router: RouterModule,
    private _userService: UserService
  ) { 
    this.title = 'Artistas';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = global.url;
  }

  ngOnInit() {
    console.log('module', 'artist list');
    this.artists = [
      new Artist('Daddy Yankee', 'Cantante de Regueton', 'https://img.peru21.pe/files/ec_article_multimedia_gallery/uploads/2019/02/14/5c6615e87b069.jpeg'),
      new Artist('Anuel AA', 'Cantante de Trap Latino', 'https://yt3.ggpht.com/a-/AAuE7mASOu1X9SYpXlB5NfQ6g6kAa2ttR7ZMFJtZoA=s900-mo-c-c0xffffffff-rj-k-no'),
      new Artist('Bad Bunny', 'Musica elegante y de clase', 'http://as01.epimg.net/epik/imagenes/2018/07/24/portada/1532423833_759147_1532423944_noticia_normal.jpg'),
      new Artist('Skrillex', 'Musica de licuadora', 'http://mdmelectro.com/wp-content/uploads/2019/02/34583785_1862486257136914_3049322322260393984_n.jpg'),
      new Artist('Grupo Marrano', 'Narco Corridos', 'http://images.coveralia.com/audio/g/Grupo_Marrano-Pornocorridos_Y_Mas_Episodio_1-Frontal.jpg'),
      new Artist('Queen', 'Musica Calidad', 'https://graffica.info/wp-content/uploads/2018/12/CsAff60UsAE9oGR.jpg'),
      new Artist('Michael Jackson', 'Musica Pop', 'http://img2.rtve.es/v/1794048?w=1600&preview=1367246845620.jpg'),
      new Artist('Gucci Mane', 'Musica de Negriada', 'https://yt3.ggpht.com/a-/AAuE7mCUHAOx_rbbX2xHzCQpCCiuW1p7R-zSb3CNHw=s900-mo-c-c0xffffffff-rj-k-no'),
      new Artist('Offset', 'Mas musica de negros', 'https://cbsnews1.cbsistatic.com/hub/i/2018/07/21/775f71c6-b667-4c4f-b5b6-7853478ffe70/offset.jpg'),
      new Artist('Migos', 'Musica de blancos anegriados', 'https://urbanislandz.com/wp-content/uploads/2018/08/Quavo-and-Migos.jpg'),
      new Artist('', 'Musica elegante y de clase', 'http://as01.epimg.net/epik/imagenes/2018/07/24/portada/1532423833_759147_1532423944_noticia_normal.jpg'),
      new Artist('', 'Musica de licuadora', 'http://mdmelectro.com/wp-content/uploads/2019/02/34583785_1862486257136914_3049322322260393984_n.jpg')
    ];
    console.log(this.artists);
  }

}

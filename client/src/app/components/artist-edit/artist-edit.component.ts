import { Component, OnInit } from '@angular/core';
import { ActivatedRoute , Router } from '@angular/router';
import { global } from '../../services/global';
import { UserService } from '../../services/user.service';
import { ArtistService } from '../../services/artist.service';
import { Artist } from '../../models/artist';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-artist-edit',
  templateUrl: './artist-edit.component.html',
  styleUrls: ['./artist-edit.component.css'],
  providers: [
    UserService,
    ArtistService
  ]
})
export class ArtistEditComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

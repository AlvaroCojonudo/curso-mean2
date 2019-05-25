import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { global } from './global';
import { Artist } from '../models/artist';
@Injectable({
    providedIn: 'root'
})
export class ArtistService {
    public url: string;    
    constructor(
        private _http: HttpClient
    ) {
        this.url = global.url;
    }
    public addArtist(token, artist: Artist){
        let params = JSON.stringify(artist);
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': token
            })
        }
        return this._http.post(this.url + 'artist', params, httpOptions);
    }
}
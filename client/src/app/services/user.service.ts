import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { global } from './global'
@Injectable()
export class UserService{
    public url: string;
    constructor(
        private _http: HttpClient
    ){
        this.url = global.url;
    }
    signup(){
        return 'Hola service';  
    }
}
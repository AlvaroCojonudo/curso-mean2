import { Injectable } from '@angular/core';
import { HttpResponse, HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { global } from './global'
//import { Router } from '@angular/router';
@Injectable()
export class UserService {
    public url: string;
    constructor(
        private _http: HttpClient
    ) {
        this.url = global.url;
    }
    signup(user, getHash: any = null): Observable<any> {
        if (getHash != null) {
            user.getHash = getHash;
        }
        let json = JSON.stringify(user);
        let params = json;
        const httpOptions = {
            headers : new HttpHeaders({ 
                'Content-Type': 'application/json' 
            })
        }
        return this._http.post(this.url + 'login', params, httpOptions).pipe();
    }
}
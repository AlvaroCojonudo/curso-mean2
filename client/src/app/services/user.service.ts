import { Injectable } from '@angular/core';
import { HttpResponse, HttpHeaders, HttpClient } from '@angular/common/http';
import { global } from './global';
import { map } from 'rxjs/operators';
import { identity } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class UserService {
    public url: string;
    public identity;
    public token;
    constructor(
        private _http: HttpClient
    ) {
        this.url = global.url;
    }
    signup(user, getHash = null) {
        if (getHash != null) {
            user.gethash = getHash;
        }
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }
        return this._http.post(this.url + 'login', user, httpOptions);
    }
    getIdentity() {
        let identity = JSON.parse(localStorage.getItem('identity'));
        if(identity != 'undefined' && identity != null){
            this.identity = identity;
            var number = (this.identity.email).indexOf('@');
            this.identity.user = (this.identity.email).substring(0, number);
        }else{
            this.identity = null;
        }
        return this.identity;
    }
    getToken() {
        let token = localStorage.getItem('token');
        if(token != 'undefined' && token != null){
            this.token = token;
        }else{
            this.token = null;
        }
        return this.token;
    }
    register(userRegister){
        let params = JSON.stringify(userRegister);
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }
        return this._http.post(this.url + 'register', params, httpOptions);
    }
}
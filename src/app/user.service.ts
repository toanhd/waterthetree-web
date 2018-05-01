import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import 'rxjs/Rx'
import {Observable} from 'rxjs/Observable';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable()
export class UserService {
    url = 'http://localhost:3000/';

    constructor(private http: Http) {
    }

    logIn(user) {
        const body = JSON.stringify(user);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post(this.url + 'authentication/login', body, {headers: headers})
            .map((response: Response) => {
                return {
                    response: response.json(),
                    code: response.status
                }
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }

    // isLoggedIn() {
    //     return localStorage.getItem('tokent') !== null;
    // }
    public isAuthenticated(): boolean {
        const jwtHelper: JwtHelperService = new JwtHelperService();
        const token = localStorage.getItem('token');
        // Check whether the token is expired and return
        // true or false
        return !jwtHelper.isTokenExpired(token);
    }
}


import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import 'rxjs/Rx'
import {Observable} from 'rxjs/Observable';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable()
export class UserService {
    // url = 'http://localhost:3000/';
    url = 'http://52.148.83.12:8080/';

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

    public isAuthenticated(): boolean {
        const jwtHelper: JwtHelperService = new JwtHelperService();
        const token = localStorage.getItem('token');
        // Check whether the token is expired and return
        // true or false
        return !jwtHelper.isTokenExpired(token);
    }

    register(user) {
        const body = JSON.stringify(user);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post(this.url + 'authentication/register', body, {headers: headers})
            .map((response: Response) => {
                return {
                    response: response.json(),
                    code: response.status
                }
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }

    getAllUser() {
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.get(this.url + 'authentication/get-users', {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }
}


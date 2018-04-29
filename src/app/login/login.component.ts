import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../user.service';
import {Router} from '@angular/router';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    logInForm: FormGroup;

    constructor(private userService: UserService,
                private router: Router) {
    }

    ngOnInit() {
        this.logInForm = new FormGroup({
            email: new FormControl(pnull, [
                Validators.required,
                Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
            ]),
            pwd: new FormControl(null, Validators.required)
        });
    }

    onSubmit() {
        const user = {
            email: this.logInForm.value.email,
            password: this.logInForm.value.pwd,
        };
        this.userService.logIn(user)
            .subscribe(
                data => {
                    console.log(data);
                    if (data.response.login === true) {
                        this.router.navigateByUrl('/dashboard');
                    } else {
                        this.router.navigateByUrl('/login');
                    }
                    // localStorage.setItem('token', data.token);
                    // localStorage.setItem('userID', data.userID);
                },
                err => console.log(err)
            );
        this.logInForm.reset();
    }
}

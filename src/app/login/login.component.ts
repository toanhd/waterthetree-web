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
    responseMess = '';

    constructor(private userService: UserService,
                private router: Router) {
    }

    ngOnInit() {
        this.logInForm = new FormGroup({
            email: new FormControl(null, [
                Validators.required,
                Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
            ]),
            pwd: new FormControl(null, Validators.required)
        });
    }

    onSubmit() {
        if (this.logInForm.valid) {
            const user = {
                email: this.logInForm.value.email,
                password: this.logInForm.value.pwd,
            };
            this.userService.logIn(user)
                .subscribe(
                    data => {
                        // console.log(data);
                        if (data.response.login === true) {
                            if (parseInt(data.response.userType) === 3) {
                                this.router.navigateByUrl('/admin');
                                localStorage.setItem('token', data.response.token);
                                localStorage.setItem('userID', data.response.userID);
                            } else {
                                this.responseMess = 'only Admin can access this site'
                            }

                        } else {
                            this.responseMess = 'Invalid credentials'
                        }
                    },
                    err => console.log(err)
                );
        }
        this.logInForm.reset();
    }
}

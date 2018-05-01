import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../user.service';
import {Router} from "@angular/router";

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

    signUpForm: FormGroup;
    responseMess = '';
    creatUserAllowed = true;

    constructor(private userService: UserService,
                private router: Router) {
    }

    ngOnInit() {
        this.signUpForm = new FormGroup({
            email: new FormControl(null, [
                Validators.required,
                Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
            ]),
            pwd: new FormControl(null, Validators.required),
            firstName: new FormControl(null, Validators.required),
            lastName: new FormControl(null, Validators.required),
            accountType: new FormControl(null, Validators.required),
        });
    }

    onSubmit() {
        if (this.signUpForm.valid) {
            const user = {
                email: this.signUpForm.value.email,
                password: this.signUpForm.value.pwd,
                firstName: this.signUpForm.value.firstName,
                lastName: this.signUpForm.value.lastName,
                type: this.signUpForm.value.accountType,
            };
            this.userService.register(user)
                .subscribe(
                    data => {
                        console.log(data);
                        this.responseMess = 'Success create user!';
                        this.creatUserAllowed = false;
                    },
                    err => {
                        console.log(err);
                        this.responseMess = 'Can not create user!';
                        this.signUpForm.reset()
                    }
                );

        } else {
            this.responseMess = 'Invalid Credentials'
        }
    }
}

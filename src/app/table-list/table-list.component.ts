import {Component, OnInit} from '@angular/core';
import {UserService} from '../user.service';

@Component({
    selector: 'app-table-list',
    templateUrl: './table-list.component.html',
    styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {

    Users = [];

    constructor(private userService: UserService) {
    }

    ngOnInit() {
        this.userService.getAllUser()
            .subscribe(
                data => {
                    // console.log(data);
                    this.Users = data.users
                },
                err => console.log(err)
            );

    }

}

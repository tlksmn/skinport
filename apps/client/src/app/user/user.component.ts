import {Component, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";

@Component({
  selector: 'skinport-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit{
  constructor(private readonly userService: UserService) {}
  ngOnInit() {

  }
}

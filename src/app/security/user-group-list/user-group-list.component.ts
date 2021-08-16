import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UserGroup } from "../shared/user-group";
import { UserService } from "../shared/user.service";

@Component({
  selector: "fu-user-group-list",
  templateUrl: "./user-group-list.component.html",
  styleUrls: ["./user-group-list.component.scss"],
})
export class UserGroupListComponent implements OnInit {
  displayedColumns: string[] = [
    "name",
    "description",
    "active",
    "users",
    "actions",
  ];
  dataSource: UserGroup[] = [];

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userService.getUserGroupList().subscribe((data) => {
      this.dataSource = data;
    });
  }
}

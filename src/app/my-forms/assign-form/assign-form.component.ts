import { Component, OnInit, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";
import { MatDialog } from "@angular/material/dialog";
import { MatTable } from "@angular/material/table";
import { Observable } from "rxjs";
import { map, startWith, switchMap } from "rxjs/operators";
import { ConfirmDialogComponent } from "src/app/general/confirm-dialog/confirm-dialog.component";
import { $t } from "src/app/general/shared/app.texto";
import { ConfirmDialogData } from "src/app/general/shared/model/confirm-dialog-data";
import { User } from "src/app/security/shared/user";
import { UserGroup } from "src/app/security/shared/user-group";
import { UserService } from "src/app/security/shared/user.service";

@Component({
  selector: "fu-assign-form",
  templateUrl: "./assign-form.component.html",
  styleUrls: ["./assign-form.component.scss"],
})
export class AssignFormComponent implements OnInit {
  users: User[] = [];
  filterUsers: Observable<User[]>;
  userSelected: User;
  usersToAssign: User[] = [];
  userFilterControl = new FormControl();
  @ViewChild("usersTable") usersTable: MatTable<User>;
  displayedColumns: string[] = ["user", "actions"];

  groups: UserGroup[] = [];
  filterGroups: Observable<UserGroup[]>;
  groupSelected: UserGroup;
  groupsToAssign: UserGroup[] = [];
  groupFilterControl = new FormControl();
  @ViewChild("groupsTable") groupsTable: MatTable<UserGroup>;
  displayedColumnsGroups: string[] = ["group", "actions"];

  constructor(private userService: UserService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadGroups();
    this.loadUsers();
  }

  loadGroups() {
    this.filterGroups = this.userService.getUserGroupList().pipe(
      switchMap((groups) => {
        this.groups = groups;
        return this.groupFilterControl.valueChanges.pipe(
          startWith(""),
          map((value) => (typeof value === "string" ? value : value.name)),
          map((name) => (name ? this._filterGroups(name) : this.groups))
        );
      })
    );
  }

  private _filterGroups(group: string): UserGroup[] {
    const filterValue = group.toLowerCase();
    return this.groups.filter((option) =>
      option.name.toLowerCase().includes(filterValue)
    );
  }

  loadUsers() {
    this.filterUsers = this.userService.getUserList().pipe(
      switchMap((users) => {
        this.users = users;
        return this.userFilterControl.valueChanges.pipe(
          startWith(""),
          map((value) => (typeof value === "string" ? value : value.name)),
          map((name) => (name ? this._filterUsers(name) : this.users))
        );
      })
    );
  }

  private _filterUsers(user: string): User[] {
    const filterValue = user.toLowerCase();
    return this.users.filter((option) =>
      option.name.toLowerCase().includes(filterValue)
    );
  }

  addGroup() {
    if (this.groupSelected) {
      this.groupsToAssign.push(this.groupSelected);
      this.groupSelected = null;
      this.groupFilterControl.setValue("");
      this.groupsTable.renderRows();
    }
  }

  groupSelectedEvent(event: MatAutocompleteSelectedEvent) {
    this.groupSelected = event.option.value;
  }

  displayFnGroup(group: UserGroup): string {
    return group && group.name ? group.name : "";
  }

  private removeGroup(groupToRemove: UserGroup) {
    this.groupsToAssign = this.groupsToAssign.filter(
      (group) => group.id !== groupToRemove.id
    );
    this.groupsTable.renderRows();
  }

  removeGroupDialog(groupToRemove: UserGroup) {
    const dialogData: ConfirmDialogData = {
      title: $t.forms.wizard.assignForm.group.removeTile,
      content: $t.forms.wizard.assignForm.group.removeQuestion,
      labelActionYes: $t.general.words.yes,
      labelActionNo: $t.general.words.no,
    };
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: dialogData,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.removeGroup(groupToRemove);
      }
    });
  }

  addUser() {
    if (this.userSelected) {
      this.usersToAssign.push(this.userSelected);
      this.userSelected = null;
      this.userFilterControl.setValue("");
      this.usersTable.renderRows();
    }
  }

  userSelectedEvent(event: MatAutocompleteSelectedEvent) {
    this.userSelected = event.option.value;
  }

  displayFnUser(user: User): string {
    return user && user.name ? user.name : "";
  }

  private removeUser(userToRemove: User) {
    this.usersToAssign = this.usersToAssign.filter(
      (user) => user.id !== userToRemove.id
    );
    this.usersTable.renderRows();
  }

  removeUserDialog(userToRemove: User) {
    const dialogData: ConfirmDialogData = {
      title: $t.forms.wizard.assignForm.user.removeTile,
      content: $t.forms.wizard.assignForm.user.removeQuestion,
      labelActionYes: $t.general.words.yes,
      labelActionNo: $t.general.words.no,
    };
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: dialogData,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.removeUser(userToRemove);
      }
    });
  }
}

import { Component, OnInit, ViewChild } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";
import { MatDialog } from "@angular/material/dialog";
import { MatTable } from "@angular/material/table";
import { ActivatedRoute } from "@angular/router";
import { forkJoin } from "rxjs";
import { Observable } from "rxjs/internal/Observable";
import { map, startWith, switchMap } from "rxjs/operators";
import { ConfirmDialogComponent } from "src/app/general/confirm-dialog/confirm-dialog.component";
import { $t } from "src/app/general/shared/app.texto";
import { MessagesService } from "src/app/general/shared/messages.service";
import { ConfirmDialogData } from "src/app/general/shared/model/confirm-dialog-data";
import { User } from "../shared/user";
import { UserGroup, UserInGroup } from "../shared/user-group";
import { UserService } from "../shared/user.service";

@Component({
  selector: "fu-user-group",
  templateUrl: "./user-group.component.html",
  styleUrls: ["./user-group.component.scss"],
})
export class UserGroupComponent implements OnInit {
  userGroupForm: FormGroup;
  users: User[] = [];
  filterUsers: Observable<User[]>;

  userFilterControl = new FormControl();
  usersInGroup: User[] = [];
  displayedColumns: string[] = ["user", "actions"];
  userSelected: User;
  groupToEdit: UserGroup;

  @ViewChild(MatTable) table: MatTable<User>;

  constructor(
    private formBuilder: FormBuilder,
    private messagesService: MessagesService,
    private userService: UserService,
    public dialog: MatDialog,
    private route: ActivatedRoute
  ) {
    this.userGroupForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required]],
      description: [null, [Validators.required]],
      active: [true, [Validators.required]],
    });
    this.loadGroup();
  }

  loadGroup() {
    const idGroup = this.route.snapshot.params["id"];
    if (idGroup) {
      this.userService.getUserGroupById(idGroup).subscribe((groupFinded) => {
        this.groupToEdit = groupFinded;
        this.userGroupForm.reset(this.groupToEdit);
        this.usersInGroup = this.groupToEdit.users;
        this.table.renderRows();
      });
    }
  }

  ngOnInit(): void {
    this.filterUsers = this.userService.getUserList().pipe(
      switchMap((users) => {
        this.users = users;
        return this.userFilterControl.valueChanges.pipe(
          startWith(""),
          map((value) => (typeof value === "string" ? value : value.name)),
          map((name) => (name ? this._filter(name) : this.users))
        );
      })
    );
  }

  private _filter(user: string): User[] {
    const filterValue = user.toLowerCase();
    return this.users.filter((option) =>
      option.name.toLowerCase().includes(filterValue)
    );
  }

  save(): void {
    if (this.userGroupForm.invalid) {
      this.messagesService.showMessage($t.userGroup.error.invalid);
      return;
    }

    const userGroup: UserGroup = this.userGroupForm.value;
    this.userService
      .saveGroup(userGroup)
      .pipe(
        switchMap((userGroupSaved) => {
          let $usersInGroupToSave: Observable<UserInGroup>[] = [];
          this.usersInGroup.forEach((user) => {
            const userInGroup: UserInGroup = {
              userID: user.id,
              groupID: userGroupSaved.id,
            };
            $usersInGroupToSave.push(
              this.userService.addUserToGroup(userInGroup)
            );
          });
          return forkJoin($usersInGroupToSave);
        })
      )
      .subscribe(
        () => {
          this.cleanData();
          this.messagesService.showMessage($t.userGroup.success.save);
        },
        () => this.messagesService.showMessage($t.userGroup.error.save)
      );
  }

  displayFn(user: User): string {
    return user && user.name ? user.name : "";
  }

  addUser() {
    if (this.userSelected) {
      this.usersInGroup.push(this.userSelected);
      this.userSelected = null;
      this.userFilterControl.setValue("");
      this.table.renderRows();
    }
  }

  private removeUser(userToRemove: User) {
    this.usersInGroup = this.usersInGroup.filter(
      (user) => user.id !== userToRemove.id
    );
    this.table.renderRows();
  }

  removeUserDialog(userToRemove: User) {
    const dialogData: ConfirmDialogData = {
      title: $t.userGroup.labels.userInGroup.removeTile,
      content: $t.userGroup.labels.userInGroup.removeQuestion,
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

  userSelectedEvent(event: MatAutocompleteSelectedEvent) {
    this.userSelected = event.option.value;
  }

  private cleanData() {
    this.usersInGroup = [];
    this.userGroupForm.reset();
    this.userSelected = null;
  }
}

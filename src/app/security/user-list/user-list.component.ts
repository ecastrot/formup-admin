import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatTable } from "@angular/material/table";
import { Router, ActivatedRoute } from "@angular/router";
import { ConfirmDialogComponent } from "src/app/general/confirm-dialog/confirm-dialog.component";
import { $t } from "src/app/general/shared/app.texto";
import { MessagesService } from "src/app/general/shared/messages.service";
import { ConfirmDialogData } from "src/app/general/shared/model/confirm-dialog-data";
import { User } from "../shared/user";
import { UserService } from "../shared/user.service";

@Component({
  selector: "fu-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.scss"],
})
export class UserListComponent implements OnInit {
  displayedColumns: string[] = ["email", "name", "active", "role", "actions"];
  dataSource: User[] = [];

  @ViewChild(MatTable) table: MatTable<User>;

  constructor(
    private userService: UserService,
    private messagesService: MessagesService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.userService.getUserList().subscribe((data) => {
      this.dataSource = data;
    });
  }

  editUser(userToEdit: User) {
    this.router.navigate(["create", userToEdit.id], {
      relativeTo: this.route,
    });
  }

  deleteUserDialog(userToRemove: User) {
    const dialogData: ConfirmDialogData = {
      title: $t.user.labels.deleteTile,
      content: $t.user.labels.deleteQuestion,
      labelActionYes: $t.general.words.yes,
      labelActionNo: $t.general.words.no,
    };
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: dialogData,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteUser(userToRemove);
      }
    });
  }

  private deleteUser(userToRemove: User) {
    this.userService.deleteUser(userToRemove).subscribe(
      () => {
        this.messagesService.showMessage($t.user.success.delete);
        this.dataSource = this.dataSource.filter(
          (group) => group !== userToRemove
        );
        this.table.renderRows();
      },
      () => this.messagesService.showMessage($t.userGroup.error.delete)
    );
  }
}

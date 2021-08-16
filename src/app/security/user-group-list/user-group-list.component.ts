import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatTable } from "@angular/material/table";
import { Router } from "@angular/router";
import { ConfirmDialogComponent } from "src/app/general/confirm-dialog/confirm-dialog.component";
import { $t } from "src/app/general/shared/app.texto";
import { MessagesService } from "src/app/general/shared/messages.service";
import { ConfirmDialogData } from "src/app/general/shared/model/confirm-dialog-data";
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

  @ViewChild(MatTable) table: MatTable<UserGroup>;

  constructor(
    private userService: UserService,
    private messagesService: MessagesService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.userService.getUserGroupList().subscribe((data) => {
      this.dataSource = data;
    });
  }

  removeGroupDialog(groupToRemove: UserGroup) {
    const dialogData: ConfirmDialogData = {
      title: $t.userGroup.labels.group.removeTile,
      content: $t.userGroup.labels.group.removeQuestion,
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

  private removeGroup(groupToRemove: UserGroup) {
    this.userService.deleteGroup(groupToRemove).subscribe(
      () => {
        this.messagesService.showMessage($t.userGroup.success.delete);
        this.dataSource = this.dataSource.filter(group => group !== groupToRemove);
        this.table.renderRows();
      },
      () => this.messagesService.showMessage($t.userGroup.error.delete)
    );
  }

}

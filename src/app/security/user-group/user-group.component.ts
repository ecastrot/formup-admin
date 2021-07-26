import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { $t } from "src/app/general/shared/app.texto";
import { MessagesService } from "src/app/general/shared/messages.service";
import { UserGroup } from "../shared/user-group";
import { UserService } from "../shared/user.service";

@Component({
  selector: "fu-user-group",
  templateUrl: "./user-group.component.html",
  styleUrls: ["./user-group.component.scss"],
})
export class UserGroupComponent {
  userForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private messagesService: MessagesService,
    private userService: UserService
  ) {
    this.userForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      description: [null, [Validators.required]],
    });
  }

  save(): void {
    if (this.userForm.invalid) {
      this.messagesService.showMessage($t.userGroup.error.invalid);
      return;
    }
    const userGroup: UserGroup = this.userForm.value;
    userGroup.active = true;
    this.userService.saveGroup(userGroup).subscribe(
      () => {
        this.messagesService.showMessage($t.userGroup.success.save);
      },
      (err) => {
        this.messagesService.showMessage($t.userGroup.error.save);
      }
    );
  }
}

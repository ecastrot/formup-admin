import { Component, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { $t } from "src/app/general/shared/app.texto";
import { MessagesService } from "src/app/general/shared/messages.service";
import { Role, ROLES } from "../shared/role";
import { User } from "../shared/user";
import { UserService } from "../shared/user.service";

@Component({
  selector: "fu-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"],
})
export class UsersComponent implements OnInit {
  userForm: FormGroup;
  roles: Role[] = ROLES;
  userToEdit: User;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private messagesService: MessagesService,
    private route: ActivatedRoute
  ) {
    this.loadUser();
  }

  loadUser() {
    const idUser = this.route.snapshot.params["id"];
    if (idUser) {
      this.userService.getUserById(idUser).subscribe((userFinded) => {
        this.userToEdit = userFinded;
        this.userForm.reset(this.userToEdit);
      });
    }
  }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      id: [null],
      email: [null, [Validators.required, Validators.email]],
      name: [null, [Validators.required]],
      password: [null, [Validators.required]],
      role: [null, [Validators.required]],
      active: [true, [Validators.required]],
    });
  }

  getControl(control: string): AbstractControl {
    return this.userForm.get(control);
  }

  save() {
    if (this.userForm.invalid) {
      this.messagesService.showMessage($t.userGroup.error.invalid);
      return;
    }

    const user: User = this.userForm.getRawValue();
    let $actionSave: Observable<User>;
    if (this.userToEdit) {
      $actionSave = this.userService.updateUser(user);
    } else {
      $actionSave = this.userService.saveUser(user);
    }

    $actionSave.subscribe(
      () => {
        this.messagesService.showMessage($t.user.success.save);
        this.userForm.reset();
      },
      () => this.messagesService.showMessage($t.user.error.save)
    );
  }
}

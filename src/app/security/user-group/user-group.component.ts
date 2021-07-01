import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MessagesService } from "src/app/general/shared/messages.service";

@Component({
  selector: "fu-user-group",
  templateUrl: "./user-group.component.html",
  styleUrls: ["./user-group.component.scss"],
})
export class UserGroupComponent implements OnInit {
  userForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private messagesService: MessagesService
  ) {
    this.userForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      description: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {}

  save(): void {
    this.messagesService.showMessage("mensaje de prueba");
  }
}

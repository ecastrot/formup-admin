import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'fu-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  userForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      email: [null, [Validators.required,Validators.email]],
      name: [null, [Validators.required]],
      password: [null, [Validators.required]],
      role: [null, [Validators.required]],
      userGroup: [null]
    });
  }

  getControl(control: string): AbstractControl{
    return this.userForm.get(control);
  }

}

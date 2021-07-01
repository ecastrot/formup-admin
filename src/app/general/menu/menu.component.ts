import { Component, OnInit } from "@angular/core";
import { MenuItem } from "../shared/menu-item";

@Component({
  selector: "fu-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.scss"],
})
export class MenuComponent implements OnInit {
  menuItems: MenuItem[] = [
    {
      label: "Inicio",
      routerLink: "",
      icon: "roofing",
    },
    {
      label: "Formularios",
      routerLink: "forms",
      icon: "list_alt",
    },
    {
      label: "Usuarios",
      icon: "person_outline",
      submenus: [
        {
          label: "Users",
          routerLink: "users",
          icon: "perm_contact_calendar",
        },
        {
          label: "Groups",
          routerLink: "userGroup",
          icon: "people_outline",
        },
      ],
    },
    {
      label: "Other",
      icon: "polymer",
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}

import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from '../shared/menu-item';

@Component({
  selector: 'fu-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent implements OnInit {

  @Input() menuItem: MenuItem;

  constructor() { }

  ngOnInit(): void {
  }

}

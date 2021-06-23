import { Component, OnInit } from '@angular/core';
import { APIService, Restaurant } from '../../API.service';


@Component({
  selector: 'fu-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  restaurants: Restaurant[];

  constructor(private api: APIService) { }

  ngOnInit(): void {
    this.api.ListRestaurants().then(event => {
      this.restaurants = event.items;
      console.log('restaurantes recuperados', this.restaurants);
    });

    this.api.ListTests().then(event => {
      console.log('test recuperados', event);
    });
  }

}

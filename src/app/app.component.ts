import { Component } from '@angular/core';

@Component({
  selector: 'fu-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ASW Form Builder Demo';
  jsonData:any[]=[];
  
  // Publish Template
  saveJsonData(data: any){
    //.... 
    console.log(data);
    // do something
  }
  
  //Preview Template
  previewTemplate(data: any){
    this.jsonData = data;
  }
}

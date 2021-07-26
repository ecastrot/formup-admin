import { Component } from "@angular/core";
import { SessionService } from "./security/shared/services/session.service";

@Component({
  selector: "fu-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {

  constructor(private sessionService: SessionService) { }
}

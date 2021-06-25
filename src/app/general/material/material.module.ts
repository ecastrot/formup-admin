import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatSelectModule } from "@angular/material/select";

@NgModule({
  exports: [
    MatIconModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
  ],
})
export class MaterialModule {}

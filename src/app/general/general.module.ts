import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LayoutComponent } from "./layout/layout.component";
import { MenuComponent } from "./menu/menu.component";
import { HeaderComponent } from "./header/header.component";
import { AppRoutingModule } from "../app-routing.module";
import { MenuItemComponent } from "./menu-item/menu-item.component";
import { MaterialModule } from "./material/material.module";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { DashboardComponent } from "./dashboard/dashboard.component";

@NgModule({
  declarations: [
    LayoutComponent,
    MenuComponent,
    HeaderComponent,
    MenuItemComponent,
    SidebarComponent,
    DashboardComponent,
  ],
  imports: [CommonModule, AppRoutingModule, MaterialModule],
})
export class GeneralModule {}

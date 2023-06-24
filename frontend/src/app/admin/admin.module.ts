import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { UsersViewComponent } from './views/users-view/users-view.component';
import {PrimeNgModule} from "../shared/modules/primeNg.module";
import {AdminRoutingModule} from "./admin-routing.module";
import {DeleteUserComponent} from "./views/users-view/delete-user/delete-user.component";
import {LoadingSpinnerComponent} from "./components/loading-spinner/loading-spinner.component";

@NgModule({
  declarations: [
    AdminComponent,
    UsersViewComponent,
    DeleteUserComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    CommonModule,
    PrimeNgModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }

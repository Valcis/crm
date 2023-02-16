import {NgModule} from "@angular/core";
import {LoginComponent} from "./login.component";
import {TopNavLoginComponent} from "./top-nav-login/top-nav-login.component";
import {CommonModule} from "@angular/common";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {LoginRoutingModule} from "./login-routing.module";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    LoginComponent,
    TopNavLoginComponent,

  ],
    imports: [
        CommonModule,
        LoginRoutingModule,
        FontAwesomeModule,
        NgbModule,
        FormsModule
    ],
  providers: []
})
export class LoginModule {
}

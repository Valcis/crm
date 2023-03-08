import {NgModule} from "@angular/core";
import {LoginComponent} from "./login.component";
import {TopNavLoginComponent} from "./features/top-nav-login/top-nav-login.component";
import {CommonModule} from "@angular/common";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {LoginRoutingModule} from "./login-routing.module";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";

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
        FormsModule,
        TranslateModule,
        FormsModule,
    ],
  exports: [LoginComponent],
  providers: [TranslateModule]
})
export class LoginModule {
}

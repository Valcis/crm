import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./login.component";
import {NgModule} from "@angular/core";
import {TranslateModule} from "@ngx-translate/core";

const routes: Routes = [{path: '', component: LoginComponent}];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    TranslateModule
  ],
  exports: [RouterModule],
})
export class LoginRoutingModule {
}

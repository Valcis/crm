import {SocketIoConfig} from "ngx-socket-io";
import {environment} from "../../environments/environment.local";
import {NgModule} from "@angular/core";
import {MainComponent} from "./main.component";
import {AppRouterOutletDirective} from "../shared/directives/app-router-outlet.directive";
import {CommonModule} from "@angular/common";
import {MainRoutingModule} from "./main-routing.module";

const config: SocketIoConfig = { url: environment.servers.urlNodeIntranet, options: {}};

@NgModule({
  declarations: [
    MainComponent,
    AppRouterOutletDirective,
  ],
  imports: [
    CommonModule,
    MainRoutingModule
  ],
  providers: []
})
export class MainModule {
}

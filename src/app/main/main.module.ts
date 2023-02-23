import {SocketIoConfig} from "ngx-socket-io";
import {environment} from "../../environments/environment.local";
import {NgModule} from "@angular/core";
import {MainComponent} from "./main.component";
import {AppRouterOutletDirective} from "../shared/directives/app-router-outlet.directive";
import {CommonModule} from "@angular/common";
import {MainRoutingModule} from "./main-routing.module";
import { TopNavComponent } from './views/top-nav/top-nav.component';
import { SideNavComponent } from './views/side-nav/side-nav.component';
import { ContentComponent } from './views/content/content.component';

const config: SocketIoConfig = { url: environment.servers.urlNodeIntranet, options: {}};

@NgModule({
  declarations: [
    MainComponent,
    AppRouterOutletDirective,
    TopNavComponent,
    SideNavComponent,
    ContentComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule
  ],
  providers: []
})
export class MainModule {
}

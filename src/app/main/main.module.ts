import {SocketIoConfig} from "ngx-socket-io";
import {environment} from "../../environments/environment.local";
import {NgModule} from "@angular/core";
import {MainComponent} from "./main.component";
import {AppRouterOutletDirective} from "../shared/directives/app-router-outlet.directive";
import {CommonModule} from "@angular/common";
import {MainRoutingModule} from "./main-routing.module";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {HttpBackend, HttpClient} from "@angular/common/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {TranslateLoaderService} from "../shared/services/translate/translate-loader.service";
import {RouterModule} from "@angular/router";
import {LoginComponent} from "../login/login.component";
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
    MainRoutingModule,
    TranslateModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: ((_http: HttpClient) => {return new TranslateLoaderService(_http, 'main')}),
        deps: [HttpClient]
      },
      isolate: false,
      extend: true
    }),
  ],
  providers: []
})
export class MainModule {
}



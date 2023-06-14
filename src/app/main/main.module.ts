import {SocketIoConfig} from "ngx-socket-io";
import {environment} from "../../environments/environment.local";
import {NgModule} from "@angular/core";
import {MainComponent} from "./main.component";
import {AppRouterOutletDirective} from "../shared/directives/app-router-outlet.directive";
import {CommonModule} from "@angular/common";
import {MainRoutingModule} from "./main-routing.module";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {HttpClient} from "@angular/common/http";
import {TranslateLoaderService} from "../shared/services/translate/translate-loader.service";
import {TopNavComponent} from './views/top-nav/top-nav.component';
import {SideNavComponent} from './views/side-nav/side-nav.component';
import {ContentComponent} from './views/content/content.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {FormsModule} from "@angular/forms";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {AppModule} from "../app.module";
import {MenuListComponent} from "../shared/components/menu-list/menu-list.component";
import { ComponenteUnoComponent } from './views/content/componente-uno/componente-uno.component';
import { ComponenteDosComponent } from './views/content/componente-dos/componente-dos.component';



@NgModule({
  declarations: [
    MainComponent,
    AppRouterOutletDirective,
    TopNavComponent,
    SideNavComponent,
    ContentComponent,
    MenuListComponent,
    ComponenteUnoComponent,
    ComponenteDosComponent,
    ],
    imports: [
        CommonModule,
        MainRoutingModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: ((_http: HttpClient) => {
                    return new TranslateLoaderService(_http, 'main')
                }),
                deps: [HttpClient]
            },
            isolate: false,
            extend: true
        }),
        FontAwesomeModule,
        FormsModule,
        NgbModule,
        CommonModule,
        // AppModule,
    ],
  providers: []
})
export class MainModule {
}



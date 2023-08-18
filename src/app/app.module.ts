import { NgModule } from '@angular/core';
import {BrowserModule, Title} from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateLoaderService} from "./shared/services/translate/translate-loader.service";
import { CrmLoaderComponent } from './shared/components/crm-loader/crm-loader.component';
import {RouterModule, Routes} from "@angular/router";
import {AppRouterOutletDirective} from "./shared/directives/app-router-outlet.directive";
import {LoginModule} from "./login/login.module";
import {MainModule} from "./main/main.module";


@NgModule({
  declarations: [
    AppComponent,
    CrmLoaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: ((_http: HttpClient) => {
          return new TranslateLoaderService(_http, 'login')
        }),
        deps: [HttpClient]
      },
      isolate: false,
      extend: true
    }),
    LoginModule,
    MainModule,
  ],
  exports: [
    CrmLoaderComponent,
  ],
  providers: [TranslateModule, Title],
  bootstrap: [AppComponent]
})
export class AppModule { }

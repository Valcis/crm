import { NgModule } from '@angular/core';
import {BrowserModule, Title} from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateLoaderService} from "./shared/services/translate/translate-loader.service";
import { CrmLoaderComponent } from './shared/components/crm-loader/crm-loader.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HashLocationStrategy, LocationStrategy} from "@angular/common";
import {BreadcrumbModule} from "xng-breadcrumb";


@NgModule({
  declarations: [
    AppComponent,
    CrmLoaderComponent,
  ],
  imports: [
    BreadcrumbModule,
    BrowserModule,
    BrowserAnimationsModule,
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
  ],
  exports: [
    CrmLoaderComponent,

  ],
  providers: [
    TranslateModule,
    Title,
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

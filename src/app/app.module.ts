import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateLoaderService} from "./shared/services/translate/translate-loader.service";
import { CrmLoaderComponent } from './shared/components/crm-loader/crm-loader.component';


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
  ],
  exports: [
    CrmLoaderComponent,
  ],
  providers: [TranslateModule],
  bootstrap: [AppComponent]
})
export class AppModule { }

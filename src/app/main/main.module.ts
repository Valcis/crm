import {NgModule} from "@angular/core";
import {MainComponent} from "./main.component";
import {AppRouterOutletDirective} from "../shared/directives/app-router-outlet.directive";
import {CommonModule} from "@angular/common";
import {MainRoutingModule} from "./main-routing.module";
import {TranslateLoader, TranslateModule, TranslateService} from "@ngx-translate/core";
import {HttpClient} from "@angular/common/http";
import {TranslateLoaderService} from "../shared/services/translate/translate-loader.service";
import {TopNavComponent} from './features/top-nav/top-nav.component';
import {SideNavComponent} from './features/side-nav/side-nav.component';
import {ContentComponent} from './features/content/content.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgbModule, NgbPaginationModule} from "@ng-bootstrap/ng-bootstrap";
import {SharedModule} from "../shared/shared.module";
import { GraficosComponent } from './features/content/graficos/graficos.component';
import { InicioDesarrolladorComponent } from './features/content/inicio-desarrollador/inicio-desarrollador.component';
import { ProveedoresProductoComponent } from './features/content/proveedores-producto/proveedores-producto.component';
import { CalendarioComponent } from './features/content/calendario/calendario.component';
import { ActividadesComponent } from './features/content/actividades/actividades.component';
import { NotificacionesComponent } from './features/content/notificaciones/notificaciones.component';
import {LinksComponent} from "./features/content/documentacion/links/links.component";
import {ChannelManagerComponent} from "./features/content/documentacion/channel_manager/channel_manager.component";
import {FilesComponent} from "./features/content/documentacion/files/files.component";
import {NgxDropzoneModule} from "ngx-dropzone";
import {DragDropComponent} from "../shared/components/drag-drop/drag-drop.component"
import { NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { NouisliderModule } from 'ng2-nouislider';
import {ProveedorAgenciaComponent} from "./features/content/mantenimiento/proveedor-agencia/proveedor-agencia.component";
import {HistorialComponent} from "../shared/components/historial/historial.component";
import {NgSelectModule} from '@ng-select/ng-select';
import { Pipe, PipeTransform } from '@angular/core';
import {stringPair} from "../shared/models/historial/type.historial"
import {JsonViewerComponent} from "../shared/components/json-viewer/json-viewer.component";
import {TitleComponent} from "../shared/components/title/title.component";
import {BreadcrumbModule} from "xng-breadcrumb";
import {DatepickerComponent} from "../shared/components/date-pick/datepicker.component";
import {DatosEconomicosComponent} from "../shared/components/datos-economicos/datos-economicos.component";
import {TimeZoneComponent} from "../shared/components/time-zone/time-zone.component";
import {NgxEditorModule} from "ngx-editor";
import {TextEditorComponent} from "../shared/components/text-editor/text-editor.component";

@Pipe({name: 'selectOptionsTranslate', pure:false})
export class SelectOptionsTranslatePipe implements PipeTransform {
  constructor(public translateService: TranslateService){}

  transform(items: Array<stringPair>) : Array<stringPair> {
    for(let item of items) {
      item.v = this.translateService.instant(item.v);
    }
    return items;
  }
}

@NgModule({
  declarations: [
    TitleComponent,
    TimeZoneComponent,
    DragDropComponent,
    FilesComponent,
    DatosEconomicosComponent,
    DatepickerComponent,
    SelectOptionsTranslatePipe,
    HistorialComponent,
    ProveedorAgenciaComponent,
    MainComponent,
    AppRouterOutletDirective,
    TopNavComponent,
    SideNavComponent,
    ContentComponent,
    GraficosComponent,
    InicioDesarrolladorComponent,
    ProveedoresProductoComponent,
    CalendarioComponent,
    ActividadesComponent,
    NotificacionesComponent,
    LinksComponent,
    ChannelManagerComponent,
    JsonViewerComponent,
    TextEditorComponent,
    ChannelManagerComponent
  ],
  imports: [
    BreadcrumbModule,
    NgbTimepickerModule,
    NouisliderModule,
    NgSelectModule,
    NgbPaginationModule,
    NgxDropzoneModule,
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
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    SharedModule,
    CommonModule,
    ReactiveFormsModule,
    NgxEditorModule,
  ],
  exports: [DragDropComponent],
  providers: []
})
export class MainModule {
}




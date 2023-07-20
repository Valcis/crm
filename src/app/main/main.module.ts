import {NgModule} from "@angular/core";
import {MainComponent} from "./main.component";
import {AppRouterOutletDirective} from "../shared/directives/app-router-outlet.directive";
import {CommonModule} from "@angular/common";
import {MainRoutingModule} from "./main-routing.module";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {HttpClient} from "@angular/common/http";
import {TranslateLoaderService} from "../shared/services/translate/translate-loader.service";
import {TopNavComponent} from './features/top-nav/top-nav.component';
import {SideNavComponent} from './features/side-nav/side-nav.component';
import {ContentComponent} from './features/content/content.component';
import {FormsModule,ReactiveFormsModule} from "@angular/forms";
import {NgbModule, NgbTooltipModule} from "@ng-bootstrap/ng-bootstrap";
import {SharedModule} from "../shared/shared.module";
import { GraficosComponent } from './features/content/graficos/graficos.component';
import { InicioDesarrolladorComponent } from './features/content/inicio-desarrollador/inicio-desarrollador.component';
import { ProveedoresProductoComponent } from './features/content/proveedores-producto/proveedores-producto.component';
import { CalendarioComponent } from './features/content/calendario/calendario.component';
import { ActividadesComponent } from './features/content/actividades/actividades.component';
import { NotificacionesComponent } from './features/content/notificaciones/notificaciones.component';
import {FilesComponent} from "./features/content/documentacion/files/files.component";
import {NgxDropzoneModule} from "ngx-dropzone";
import {DragDropComponent} from "../shared/components/DragDrop/DragDrop.component";


@NgModule({
  declarations: [
    DragDropComponent,
    FilesComponent,
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
    ],
  imports: [
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
  ],
  exports: [DragDropComponent],
  providers: []
})
export class MainModule {
}



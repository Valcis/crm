import {RouterModule, Routes} from "@angular/router";
import {MainComponent} from "./main.component";
import {NgModule} from "@angular/core";
import {TranslateModule} from "@ngx-translate/core";
import {GraficosComponent} from "./features/content/graficos/graficos.component";
import {InicioDesarrolladorComponent} from "./features/content/inicio-desarrollador/inicio-desarrollador.component";
import {ProveedoresProductoComponent} from "./features/content/proveedores-producto/proveedores-producto.component";
import {CalendarioComponent} from "./features/content/calendario/calendario.component";
import {ActividadesComponent} from "./features/content/actividades/actividades.component";
import {NotificacionesComponent} from "./features/content/notificaciones/notificaciones.component";
import {LinksComponent} from "./features/content/documentacion/links/links.component";
import {ChannelManagerComponent} from "./features/content/documentacion/channel_manager/channel_manager.component";
import {FilesComponent} from "./features/content/documentacion/files/files.component";


const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    data: {
      shouldReuse: true,
      key: 'crm/app/index/main'
    },
    children: [
      {path: '#/crm_graficos', component: GraficosComponent, data:{breadcrumb:{alias:"graficos"}}},
      {path: '#/crm_inicio_desarrollador', component: InicioDesarrolladorComponent, data:{breadcrumb:{alias:"inicioDesarrollador"}}},
      {path: '#/index/crm_lista_proveedores_producto', component: ProveedoresProductoComponent, data:{breadcrumb:{alias:"proveedoresProducto"}}},
      {path: '#/crm_calendario', component: CalendarioComponent, data:{breadcrumb:{alias:"calendario"}}},
      {path: '#/index/crm_lista_actividades', component: ActividadesComponent, data:{breadcrumb:{alias:"actividades"}}},
      {path: '#/index/crm_lista_notificaciones', component: NotificacionesComponent, data:{breadcrumb:{alias:"notificaciones"}}},
      {path: '#/index/crm_lista_links', component: LinksComponent, data:{breadcrumb:{alias:"links"}}},
      {path: '#/index/crm_channelmanager', component: ChannelManagerComponent, data:{breadcrumb:{alias:"channelManager"}}},
      {path: '#/index/crm_lista_ficheros', component: FilesComponent, data:{breadcrumb:{alias:"ficheros"}}}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), TranslateModule],
  exports: [RouterModule]
})
export class MainRoutingModule {

}

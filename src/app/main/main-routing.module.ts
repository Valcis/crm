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
import {ProveedorAgenciaComponent} from "./features/content/mantenimiento/proveedor-agencia/proveedor-agencia.component";

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    data: {
      shouldReuse: true,
      key: 'crm/app/index/main'
    },
    children: [
      {path: '#/crm_graficos', component: GraficosComponent},
      {path: '#/crm_inicio_desarrollador', component: InicioDesarrolladorComponent},
      {path: '#/index/crm_lista_proveedores_producto', component: ProveedoresProductoComponent}, //TODO: cambiar a lista
      {path: '#/crm_calendario', component: CalendarioComponent},
      {path: '#/index/crm_lista_actividades', component: ActividadesComponent},
      {path: '#/index/crm_lista_notificaciones', component: NotificacionesComponent},
      {path: '#/index/crm_lista_links', component: LinksComponent},
      {path: '#/index/crm_mantenimiento_prove_trabaja_opage', component: ProveedorAgenciaComponent},

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), TranslateModule],
  exports: [RouterModule]
})
export class MainRoutingModule {
}

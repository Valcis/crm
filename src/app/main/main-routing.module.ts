import {RouterModule, Routes} from "@angular/router";
import {MainComponent} from "./main.component";
import {NgModule} from "@angular/core";
import {TranslateModule} from "@ngx-translate/core";
import {ComponenteDosComponent} from "./views/content/componente-dos/componente-dos.component";

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    data: {
      shouldReuse: true,
      key: 'main'
    },
    children: [
      {path: '#/crm_inicio_desarrollador', component: ComponenteDosComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), TranslateModule],
  exports: [RouterModule]
})
export class MainRoutingModule {
}

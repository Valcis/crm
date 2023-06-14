import {RouterModule, Routes} from "@angular/router";
import {MainComponent} from "./main.component";
import {NgModule} from "@angular/core";
import {TranslateModule} from "@ngx-translate/core";
import {ComponenteUnoComponent} from "./views/content/componente-uno/componente-uno.component";
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
      {
        path: 'component-uno',
        component: ComponenteUnoComponent,
      },
      {
        path: 'component-dos',
        component: ComponenteDosComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), TranslateModule],
  exports: [RouterModule]
})
export class MainRoutingModule {
}

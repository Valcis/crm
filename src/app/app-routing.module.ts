import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CookieService} from "ngx-cookie-service";

const routes: Routes = [
  { path: 'index.html/login', canActivate: [], loadChildren: () => import('./login/login.module').then(m => m.LoginModule)},
  { path: 'index.html/main', /*canActivate: [SessionStartedGuard],*/ loadChildren: () => import('./main/main.module').then(m => m.MainModule)},
  { path: '', pathMatch: 'full', redirectTo: 'index.html/login' },
  { path: '**', redirectTo: 'index.html/login' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  providers:[CookieService],
  exports: [RouterModule],

})
export class AppRoutingModule { }

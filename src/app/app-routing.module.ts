import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CookieService} from "ngx-cookie-service";
import {AppComponent} from "./app.component";
import {LoginComponent} from "./login/login.component";
import {MainComponent} from "./main/main.component";

const routes: Routes = [
  { path: 'login', canActivate: [], loadChildren: () => import('./login/login.module').then(m => m.LoginModule)},
  { path: 'main', /*canActivate: [SessionStartedGuard],*/ loadChildren: () => import('./main/main.module').then(m => m.MainModule)},
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: '**', redirectTo: 'login' }
];

// const routes: Routes = [
//   // {
//   //   path: '',
//   //   component: AppComponent,
//   //   children: [
//         { path: 'login', canActivate: [], loadChildren: () => import('./login/login.module').then(m => m.LoginModule)},
//         { path: 'main', /*canActivate: [SessionStartedGuard],*/ loadChildren: () => import('./main/main.module').then(m => m.MainModule)},
//         // { path: 'login', canActivate: [], component: LoginComponent},
//         // { path: 'main', /*canActivate: [SessionStartedGuard],*/ component: MainComponent},
//         { path: '', pathMatch: 'full', redirectTo: 'login' },
//         { path: '**', redirectTo: 'login' }
//   //   ]
//   // }
// ];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  providers:[CookieService],
  exports: [RouterModule],

})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'login', canActivate: [], loadChildren: () => import('./login/login.module').then(m => m.LoginModule)},
  { path: 'main', /*canActivate: [SessionStartedGuard],*/ loadChildren: () => import('./main/main.module').then(m => m.MainModule)},
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }

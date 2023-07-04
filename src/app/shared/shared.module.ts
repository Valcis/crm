import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideClosedDirective } from './directives/side-closed.directive';


@NgModule({
  declarations: [
    SideClosedDirective
  ],
  imports: [
    CommonModule,
  ],
    exports: [
        SideClosedDirective
    ]
})
export class SharedModule {
}

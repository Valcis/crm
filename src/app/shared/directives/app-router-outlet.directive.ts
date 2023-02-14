import {ComponentRef, Directive} from "@angular/core";
import {ActivatedRoute, RouterOutlet} from "@angular/router";

@Directive({
  selector: 'app-router-outlet'
})
export class AppRouterOutletDirective extends RouterOutlet {
  override detach(): ComponentRef<any> {
    const instance: any = this.component;
    if (instance && typeof instance.onDetach === 'function') {
      instance.onDetach();
    }
    return super.detach();
  }

  override attach(ref: ComponentRef<any>, activatedRoute: ActivatedRoute): void {
    super.attach(ref, activatedRoute);
    if (ref.instance && typeof ref.instance.onAttach === 'function') {
      ref.instance.onAttach(ref, activatedRoute);
    }
  }
}

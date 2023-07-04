import {Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[appSideClosed]'
})
export class SideClosedDirective {

  @Input() sideClosed='10%';
  @Input() sideOpen='25%';

  constructor(private el: ElementRef) {
  }

  @HostListener('click') close() {
    this.openClose(this.sideClosed)
  }

  @HostListener('click') open() {
    console.log('test')
    if (this.el.nativeElement.style.width === this.sideClosed) {
      this.openClose(this.sideOpen)
    } else {
      this.openClose(this.sideClosed)
    }
  }

  private openClose(size:string) {

    this.el.nativeElement.style.width = size;
  }

  // this.el.nativeElement.style.width = "10%"

}

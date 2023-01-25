// Directiva para añadir un icono de flecha que indique el orden activo en una tabla ordenable

import { Directive, Input, ElementRef } from '@angular/core';

@Directive({
  selector: '[appSortIcon]'
})
export class SortIconDirective {

  @Input() sortField: string | undefined;
  @Input() currentField: string | undefined;
  @Input() currentOrder: string | undefined;

  constructor(private el: ElementRef) { }

  ngOnChanges() {
    if (this.sortField !== this.currentField) {
      this.el.nativeElement.innerHTML = '';
    } else {
      if (this.currentOrder === 'asc') this.el.nativeElement.innerHTML = ` <i class="bi bi-arrow-up-circle-fill"></i>`;
      if (this.currentOrder === 'desc') this.el.nativeElement.innerHTML = ` <i class="bi bi-arrow-down-circle-fill"></i>`;
    }
  }

}

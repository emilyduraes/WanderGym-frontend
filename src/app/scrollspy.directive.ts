import { Directive, Input, EventEmitter, Inject, Output, ElementRef, HostListener } from '@angular/core';
import { DOCUMENT } from '@angular/common';
@Directive({
  selector: '[appScrollspy]'
})
export class ScrollspyDirective {
  @Input() public spiedTags: string[] = [];;
  @Output() public sectionChange = new EventEmitter<string>();
  private currentSection: string | undefined;
  // tslint:disable-next-line: variable-name
  constructor(private _el: ElementRef, @Inject(DOCUMENT) private document: Document,) { }
  @HostListener('window:scroll', ['$event'])
  /**
   * Window scroll method
   */

  onScroll(event: Event): void {
    let mostVisibleSection: string | null = null;
    const viewportHeight = window.innerHeight;

    for (const tagName of this.spiedTags) {
      const elements = this.document.querySelectorAll(tagName);
      for (const element of Array.from(elements)) {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = elementTop + element.clientHeight;
        const elementHeight = element.clientHeight;

        // Check if most of the section is visible
        if (elementTop >= -elementHeight / 2 && elementBottom <= viewportHeight + elementHeight / 2) {
          mostVisibleSection = element.getAttribute('id');
        }
      }
    }

    if (mostVisibleSection !== this.currentSection) {
      this.currentSection = mostVisibleSection as string | undefined;
      this.sectionChange.emit(this.currentSection);
    }
  }
}






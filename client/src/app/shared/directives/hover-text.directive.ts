import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appHoverText]',
})
export class HoverTextDirective {
  @Input()
  appHoverText: {
    defaultText: string;
    hoveredText: string;
  } = {
    defaultText: '',
    hoveredText: '',
  };

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter')
  onMouseEnter() {
    this.changeText(this.appHoverText.hoveredText);
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.changeText(this.appHoverText.defaultText);
  }

  private changeText(newText: string) {
    this.renderer.setProperty(this.el.nativeElement, 'textContent', newText);
  }
}

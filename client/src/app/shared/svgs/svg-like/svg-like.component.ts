import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-svg-like',
  templateUrl: './svg-like.component.svg',
})
export class SvgLikeComponent {
  @Input() fillColor: string = 'rgb(255, 0, 0)';
}

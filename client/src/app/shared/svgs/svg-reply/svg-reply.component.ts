import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-svg-reply',
  templateUrl: './svg-reply.component.svg',
})
export class SvgReplyComponent {
  @Input() fillColor: string = 'rgb(255, 0, 0)';
}

import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-svg-retweet',
  templateUrl: './svg-retweet.component.svg',
})
export class SvgRetweetComponent {
  @Input() fillColor: string = 'rgb(255, 0, 0)';
}

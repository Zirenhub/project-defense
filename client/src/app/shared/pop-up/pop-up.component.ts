import { Component, Input, OnInit } from '@angular/core';
import { ValidationErrors } from 'src/app/types/Api';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
})
export class PopUpComponent implements OnInit {
  @Input() type: 'error' | 'default' = 'default';
  @Input() content: string | null = null;
  @Input() validationErrors: ValidationErrors | null = null;

  errorClass =
    'py-4 px-2 text-white bg-red-500 rounded-md shadow-lg text-center';
  defaultClass =
    'py-4 px-2 text-black bg-white rounded-md shadow-lg text-center';

  ngOnInit(): void {
    setTimeout(() => {
      this.content = null;
      this.validationErrors = null;
    }, 5000);
  }
}

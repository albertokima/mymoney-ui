import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-message',
  template: `
    <div class="ui-message ui-messages-error" *ngIf="temErro()">
      {{text}}
    </div>
  `,
  styles: [`
    .ui-messages-error{
      margin: 0;
      margin-top: 2px;
      border-radius: 3px;
      padding: .25em .5em;
      background-color: #ffcbc8;
      border-color: #ffcbc8;
      color: #ab1a0f;
    }
  `]
})
export class MessageComponent {

  @Input() control: FormControl;
  @Input() error: string;
  @Input() text: string;
  @Input() touched: boolean;

  temErro() {
    if (this.touched) {
      return this.control.hasError(this.error) && this.control.touched;
    } else {
      return this.control.hasError(this.error) && this.control.dirty;
    }
  }

}
